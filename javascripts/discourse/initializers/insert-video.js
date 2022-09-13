import { withPluginApi } from "discourse/lib/plugin-api";

export const uploadVideo = async () => {
  
  const c_options = {
    method: 'POST',
    url: 'https://video.bunnycdn.com/library/59740/videos',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/*+json',
      AccessKey: settings.BUNNY_API_KEY
    },
    data: '{"title":"test"}'
  };
  
  await axios.request(c_options).then(function (c_response) {
    //upload start
    const u_options = {
      url: `https://video.bunnycdn.com/library/59740/videos/${c_response.data.guid}`,
      headers: {
        Accept: 'application/json',
        AccessKey: settings.BUNNY_API_KEY
      },
    };
    axios.put(u_options).then(function (u_response) {
      console.log(u_response.data);
    }).catch(function (error) {
      console.error(error);
    });
    //upload end

    console.log(c_response.data);
  }).catch(function (error) {
    console.error(error);
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
