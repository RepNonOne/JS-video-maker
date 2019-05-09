var videoshow = require('videoshow');

var options = {
  fps: 25,
  loop: 10,
  captionDelay: 0,
  transition: true,
  useSubRipSubtitles: false, // Use ASS/SSA subtitles instead 
  subtitleStyle: {
    Fontname: 'Verdana',
    Fontsize: '26',
    PrimaryColour: '11861244',
    SecondaryColour: '11861244',
    TertiaryColour: '11861244',
    BackColour: '-2147483640',
    Bold: '2',
    Italic: '0',
    BorderStyle: '2',
    Outline: '2',
    Shadow: '3',
    Alignment: '1', // left, middle, right
    MarginL: '40',
    MarginR: '60',
    MarginV: '40'
  }
}

module.exports.make = function(images){
  console.log('\nRendering video...')
  videoshow(images, options)
  .save('./video/rendered/video.mp4')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err) {
    console.error('Error:', err)
  })
  .on('end', function (output) {
    console.log('Video created in:', output)
  });
}