import { withPluginApi } from "discourse/lib/plugin-api";

function uploadVideo(e){
  const data = new FormData();
  let file = e.target.files[0];
  let video;
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  
  async function Main() {
    video = await toBase64(file);
  }
  
  Main();


  
  const c_options = {
    method: 'POST',
    url: 'https://video.bunnycdn.com/library/49034/videos',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/*+json',
      AccessKey: ''
    },
    data: '{"title":"test"}'
  };
  
  axios.request(c_options).then(function (c_response) {
    //upload start
    const u_options = {
      method: 'PUT',
      url: `https://video.bunnycdn.com/library/49034/videos/${c_response.data.guid}`,
      headers: {
        Accept: 'application/json',
        AccessKey: ''
      },
      data: video,
    };
    axios.request(u_options).then(function (u_response) {
      //post url to php
      console.log(u_response.data);
    }).catch(function (error) {
      console.error(error);
    });
    //upload end

    console.log(c_response.data);
  }).catch(function (error) {
    console.error(error);
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
