import { withPluginApi } from "discourse/lib/plugin-api";


function videoCompress() { 
  .transloadit({
    wait: true,
    triggerUploadOnFileSelection: true,
    params: {
      auth: {
      // To avoid tampering use signatures:
      // https://transloadit.com/docs/api/#authentication
        key: settings.TRANSLOADIT_API_KEY,
      },
      // It's often better store encoding instructions in your account
      // and use a `template_id` instead of adding these steps inline
      steps: {
        ':original': {
          robot: '/upload/handle'
        },
        webm_encoded: {
          use: ':original',
          robot: '/video/encode',
          result: true,
          ffmpeg_stack: 'v4.3.1',
          preset: 'webm',
          turbo: false
        }
      }
    }
  });
}

export default {
  name: "video-compressor",

  initialize() {
    withPluginApi("0.8.31", api => {
      api.addComposerUploadHandler(["mp4", "mov"], (files, editor) => {
        files.forEach((file) => {
          console.log("Handling upload for", file.name);
          videoCompress();
        });
      })
    });
  }
};
