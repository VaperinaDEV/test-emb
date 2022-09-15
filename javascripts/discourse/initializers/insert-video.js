import { withPluginApi } from "discourse/lib/plugin-api";

var videoMaxTime = "01:00"; //minutes:seconds   //video

//for seconds to time
function secondsToTime(in_seconds) {

  var time = '';
  in_seconds = parseFloat(in_seconds.toFixed(2));

  var hours = Math.floor(in_seconds / 3600);
  var minutes = Math.floor((in_seconds - (hours * 3600)) / 60);
  var seconds = in_seconds - (hours * 3600) - (minutes * 60);
  //seconds = Math.floor( seconds );
  seconds = seconds.toFixed(0);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var time = minutes + ':' + seconds;

  return time;

}

function checkFileDuration() {
  var reader = new FileReader();
  reader.onload = function(e) {
    var file = $('.discourse-video-upload-modal input[type=file]').files[0];
    var videoElement = document.createElement('video');
    videoElement.src = e.target.result;
    var timer = setInterval(function() {
      if (videoElement.readyState === 4) {
        getTime = secondsToTime(videoElement.duration);
        if (getTime > videoMaxTime) {
          alert('1 minutes video only')
          $('.discourse-video-upload-modal input[type=file]').val("");
        }
        clearInterval(timer);
      }
    }, 500)
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    alert('nofile');
  }
}

export default {
  name: "video-compressor",

  initialize() {
    withPluginApi("0.8.31", api => {
      var button = $('.discourse-video-upload-modal input[type=file]')
      button.on('click', function() {
        checkFileDuration();
      });
    });
  }
};
