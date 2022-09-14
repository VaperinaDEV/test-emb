import { withPluginApi } from "discourse/lib/plugin-api";

function videoCreate() { 
  const data = '{"title":"string"}';

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open('POST', 'https://video.bunnycdn.com/library/59740/videos');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/*+json');
  xhr.setRequestHeader('AccessKey', settings.BUNNY_API_KEY);

  xhr.send(data);

}

function videoUpload() {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open('PUT', 'https://video.bunnycdn.com/library/59740/videos/videoId');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('AccessKey', settings.BUNNY_API_KEY);

  xhr.send(data);
}

export default {
  name: "video-compressor",

  initialize() {
    withPluginApi("0.8.31", api => {
      api.addComposerUploadHandler(["mp4", "mov"], (files, editor) => {
        files.forEach((file) => {
          console.log("Handling upload for", file.name);
          videoCreate();
          videoUpload();
        });
      });
    });
  }
};
