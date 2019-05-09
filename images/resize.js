const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(600, 600);
const ctx = canvas.getContext('2d');
const ImageDataURI = require('image-data-uri');
const fs = require('fs');

module.exports.start = function(directory, callback){
	fs.readdir(directory, (err, files) => {
		if (err) throw err;
		console.log('\nResizing all photos...');

		for (const file of files) {
			loadImage(directory + file).then((image) => {
				ctx.style = '#000';
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				// create and blur(dont work on this canvas version :\ ) image
				let bgWidth = canvas.width * 1.5;
				let bgHeight = bgWidth - image.width + image.height;
				let height = canvas.height;
				let width =  height / image.height * image.width;
				// ctx.filterquality = "blur(60px)";
				// ctx.drawImage(image, (canvas.width - bgWidth) / 2, (canvas.height - bgHeight) / 2, bgWidth, bgHeight);
				// ctx.filterquality = "blur(0px)";
				ctx.drawImage(image, (canvas.width - width) / 2, 0, width, height);

				// save image
				let imagePath = directory + file;
				ImageDataURI.outputFile(canvas.toDataURL(), imagePath);
			});
		}

		callback();
	});
}