const fs = require('fs');
const path = require('path');
const unsplash = require('unsplash-api');
const download = require('image-downloader');

// remove all previous files
const directory = './saved/';

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});

// enter you key here
unsplash.init('b757b829bbca1193d719b3116d36248dcabc3741c2f662906edcb1bfa297fce5');

// match photos by name
unsplash.searchPhotos('band', null, null, null, function(error, photos, link) {
    let pl = photos.length;
    let dl = 0;

    console.log('donwloading images!\n')

    //save all photos
    for(e of photos){
        download.image({
            url: e.urls.regular,
            dest: directory + e.id + '.jpg'
        })
        .then(({ filename, image }) => {
            dl++;
            console.log(`${dl}/${pl} donwloaded`);
        })
        .catch((err) => {
            console.error(err);
        });
    }
});		