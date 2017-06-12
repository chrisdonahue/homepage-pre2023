(function () {
  var config = {
    debug: true,
    email: {
      permuted: 'rmniaocughcsto@opdhlahrm.eei',
      permutation: [2, 20, 13, 3, 21, 12, 25, 16, 19, 1, 0, 4, 5, 26, 18, 6, 7, 11, 8, 23, 14, 15, 10, 27, 24, 17, 9, 22]
    },
    stringAudio: {
      maxDelaySamps: 960
    },
    stringVideo: {
      maxDeviation: 32,
      thickness: 3,
      phaseInc: 0.5, 
      controlPointSpacing: 50
    }
    gain: 1.0,
  }

  var initEmailScramble = function () {
    emailScrambleLeaky = new scrambledString(document.getElementById('email'), 'emailScrambleLeaky', config.emailPermuted, config.emailPermutation);
  };

  var initString = function() {
    // audio
    if not ('AudioContext' in window)
      return;
    var audioCtx = new window.AudioContext();
    var stringAudio = new nustring.KarplusStrong(audioCtx, config.stringAudio);

    // video
    var stringCanvas = document.getElementById('string-canvas');
    var stringVideo = new nustring.CanvasPluckString(stringAudio, stringCanvas, config.stringVideo);

    // hear
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = config.gain;
    string.scriptProcessor.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // show
    document.getElementById('nostring-sep').style.display = 'none';
    document.getElementById('string-sep').style.display = 'block';
  };

  var initAll = function () {
    initEmailScramble();
    initString();
  };

  var onResize = function ()  {
    var stringPlaceholder = document.getElementById('sep-placeholder');
    var stringBb = stringPlaceholder.getBoundingClientRect();
    var stringY = (stringBb.bottom + stringBb.top) / 2.0;

    var stringDiv = document.getElementById('string-sep');
    var stringCanvas = document.getElementById('string-canvas');
    stringDiv.style.top = stringDivY;
    console.log(stringDivY);
  };

  if (document.addEventListener) document.addEventListener("DOMContentLoaded", initAll, false);
  else if (document.attachEvent) document.attachEvent("onreadystatechange", initAll);
  else window.onload = initAll;

  window.addEventListener('resize', onResize);
})();
