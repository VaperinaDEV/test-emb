import { withPluginApi } from "discourse/lib/plugin-api";

function uploadVideo() {
  const optionsToCreateVideo = {
    async: true,
    crossDomain: true,
    method: "POST",
    url: `http://video.bunnycdn.com/library/59740/videos`,
    headers: {
      Accept: "application/*+json",
      "Content-Type": "application/json",
      AccessKey: settings.BUNNY_API_KEY,
    },
    data: JSON.stringify({ title: "valami" }),
  };
  
  $.ajax(optionsToCreateVideo).then((response) => {
    console.log(response);
    async function getData(guid) {
      const dataset = await $.ajax(guid);
    
      const video_id = getData(guid);
   
      const optionsToUploadVideo = {
        async: true,
        crossDomain: true,
        method: "PUT",
        url: `http://video.bunnycdn.com/library/59740/videos/${video_id}`,
        headers: {
          Accept: "application/json",
          AccessKey: settings.BUNNY_API_KEY,
        }
      };
      $.ajax(optionsToUploadVideo).done(function (response) {
        console.log(response);
      });
    }
  });
};

export default {
  name: "video-compressor",

  initialize() {
    withPluginApi("0.8.31", api => {
      api.addComposerUploadHandler(["mp4", "mov"], (files, editor) => {
        files.forEach((file) => {
          console.log("Handling upload for", file.name);
          uploadVideo();
        });
      })
    });
  }
};
