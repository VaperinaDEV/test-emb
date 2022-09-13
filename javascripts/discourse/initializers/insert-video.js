import { withPluginApi } from "discourse/lib/plugin-api";

function uploadVideo() {

  const optionsToCreateVideo = {
    method: "POST",
    url: `http://video.bunnycdn.com/library/59740/videos`,
    headers: {
      Accept: "application/*+json",
      "Content-Type": "application/json",
      AccessKey: settings.BUNNY_API_KEY,
    },
    data: JSON.stringify({ title: "valami" }),
  };
  
  const response = await fetch(optionsToCreateVideo);

  .then((response) => {
    const video_id = response.data.guid;
    
    const optionsToUploadVideo = {
      method: "PUT",
      url: `http://video.bunnycdn.com/library/59740/videos/${video_id}`,
      headers: {
        Accept: "application/json",
        AccessKey: settings.BUNNY_API_KEY,
      },
      data: JSON.stringify({ title: "valami" }),
    };
    fetch(optionsToUploadVideo)
    .then(response => response.json())
  });
}

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
