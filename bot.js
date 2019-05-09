// dependencies
const text = require('./text');
const images = require('./images');
const video = require('./video');

text.question()
.then(resp => {
	images.search(resp.title)
	.then(images => {
		let scenes = [];
		for(i in images){
			scenes.push({
				path: images[i],
				caption: resp.summary[i]
			});
		}
		video.make(scenes);
	})
	.catch(err => {
		console.log('image:', err);
	});
})
.catch(err => {
	console.log('text:', err);
});