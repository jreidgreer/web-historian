var archive = require('../helpers/archive-helpers.js');
var path = require('path');
var fs = require('fs');

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.   ¥  §


archive.readListOfUrls(function(err, urls) {
  if (err) {
    console.error(err);
    return;
  } 

  archive.downloadUrls(['http://www.google.com', 'http://www.amazon.com', 'http://www.w3schools.com/jsref/jsref_replace.asp'], function(error, data, url) {
    var fileName = archive.sanitizeUrl(url);
    fs.writeFile(path.join(__dirname + '/../archives/sites/' + fileName + '.html'), data, function(err) {
      if (err) {
        console.log('broken inside of downloadUrls', err);
      }
    });
  });
});