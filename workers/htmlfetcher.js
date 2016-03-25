/*  CRONjob  */

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
  
  //need to pass in urls properly
  archive.downloadUrls(urls, function(error, data, url) {
    var fileName = archive.sanitizeUrl(url);
    fs.writeFile(path.join(__dirname + '/../archives/sites/' + fileName + '.html'), data, function(err) {
      if (err) {
        console.log('broken inside of downloadUrls', err);
      }
    });
  });
});