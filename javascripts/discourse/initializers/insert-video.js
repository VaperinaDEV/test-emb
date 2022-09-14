import { withPluginApi } from "discourse/lib/plugin-api";
import UppyMediaOptimization from "discourse/lib/uppy-media-optimization-plugin";


function videoCompress() { 
    var uppy = window.Robodog.pick({
      waitForEncoding: true,
      params: {
        // To avoid tampering, use Signature Authentication
        auth: { key: settings.TRANSLOADIT_API_KEY },
        // To hide your `steps`, use a `template_id` instead
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
    }).then(function (bundle) {
      // Due to `waitForEncoding: true` this is fired after encoding is done.
      // Alternatively, set `waitForEncoding` to `false` and provide a `notify_url`
      // for Async Mode where your back-end receives the encoding results
      // so that your user can be on their way as soon as the upload completes.
      console.log(bundle.transloadit) // Array of Assembly Statuses
      console.log(bundle.results)     // Array of all encoding results
    }).catch(console.error)
}

export default {
  name: "video-compressor",

  initialize() {
    withPluginApi("0.8.31", api => {
      api.addComposerUploadPreProcessor(UppyMediaOptimization, ({ composerModel, composerElement, capabilities, isMobileDevice }) => {
        return {
          composerModel,
          composerElement,
          capabilities,
          isMobileDevice,
          someOption: true,
          someFn: () => {
            videoCompress();
          },
        };
      });
    });
  }
};
