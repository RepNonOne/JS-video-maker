const fs = require('fs');
const path = require('path');
const download = require('image-downloader');
const resize = require('./resize');
const uniqid = require('uniqid');
const GoogleImages = require('google-images');
// need google api key
const client = new GoogleImages('', '');

// remove all previous files
const directory = './images/saved/';

fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
      });
    }
});

module.exports.search = function(categ){
    return new Promise(resolve => {
        // match photos by name
        client.search(categ, {size: 'medium'}).then(photos => {
            let pl = photos.length;
            let dl = 0;
            let dirs = [];

            console.log('\ndonwloading images!')

            //save all photos
            for(e of photos){
                download.image({
                    url: e.url,
                    dest: directory + uniqid() + '.jpg'
                })
                .then(({ filename, image }) => {
                    dirs.push(filename), dl++;

                    // send download status
                    console.log(`\n${dl}/${pl} downloaded`);

                    // return promise array
                    if(dl > photos.length - 1){
                        resize.start('./images/saved/', () => {
                            resolve(dirs);
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
            }
        });   
    });
}