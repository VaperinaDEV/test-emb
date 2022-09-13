import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "video-compressor",

function coconut() {
  const Coconut = require('../lib/coconutjs');

  const coconut = new Coconut.Client(settings.coconut_api_key);

  coconut.Job.create(
    {
      'input': {
        'url': file
      },
      'outputs': {
        'mp4:1080p': {
          'path': '/1080p.mp4'
        },
        'httpstream': {
          'hls': {
            'path': 'hls/'
          }
        }
      }
    }, function(job, err) {
      console.log(job);
    }
  )
  coconut.region = "eu-west-1";
},

initialize() {
    withPluginApi("0.8.31", api => {
      api.addComposerUploadHandler(["mp4", "mov"], (files, editor) => {
        files.forEach((file) => {
          console.log("Handling upload for", file.name);
          coconut();
        });
      })
    });
  }
};
