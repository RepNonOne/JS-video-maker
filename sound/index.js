const scribble = require('scribbletune');
const uniqid = require('uniqid');

// generate a pattern
const getRandomPattern = function (count) {
  let str = '';
  for (let i=0; i < (count || 8); i++) {
    str += Math.round(Math.random()) ? 'x-' : '-x';
  }
  
  return str;
}

// Create a clip that contains a musical idea
let clip = scribble.clip({
	notes: 'F#m C#m DM Bm EM AM DM C#m AM',
	pattern: getRandomPattern(2).repeat(10)
});

scribble.midi(clip, './generated/' + uniqid() + '.mid');