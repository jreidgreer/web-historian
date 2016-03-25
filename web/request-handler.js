var path = require('path');
var archive = require('../helpers/archive-helpers');
var requestHelpers = require('./http-helpers.js');
var qs = require('querystring');
// require more modules/folders here!



exports.handleRequest = function (req, res) {
  console.log('Receiving ' + req.method + ' from ' + req.url + ' request with a content type of ');

  if (req.method === 'GET') {
    if (req.url === '/') {
      requestHelpers.sendStaticResponse(res, '/public/index.html');
    }
    if (req.url === '/styles.css') {
      requestHelpers.sendStaticResponse(res, '/public/styles.css');
    }
  } else if (req.method === 'POST') {
    var queryData = '';
    req.on('data', function(data) {
      queryData += data;
    });
    req.on('end', function(data) {
      var url = qs.parse(queryData).url;
      // console.log(formInput);
      //we want formInput.url <- isUrlInList
      
      archive.readListOfUrls(function(err, urlList) {
        if (archive.isUrlInList(url, urlList)) {
          console.log('after isUrlInList');
          requestHelpers.sendStaticResponse(res, '/public/loading.html');
        } else {
          archive.isUrlArchived(url, function(isInArchive) {
            console.log('request handler access to isInArchive', isInArchive);
            if (isInArchive) {
              var sanitizedUrl = archive.sanitizeUrl(url) + '.html';
              console.log(__dirname, 'dirname!!');
              var urlPath = path.join('/../../archives/sites', sanitizedUrl);
              console.log('urlPath', urlPath); //////////////potential error
              requestHelpers.sendStaticResponse(res, urlPath);
            } else {
              console.log(isInArchive); ////////////potentially undefined
              archive.addUrlToList(url);
              requestHelpers.sendStaticResponse(res, '/public/loading.html');
            }
          });
        }
      });

    });
    // Take URL of post
    // Read sites.txt with readListOfUrls
      //isUrlInList
        // Yes
          // Redirect to loading.html
        // No
          // isUrlArchived
            // Yes
              // Redirect to cached copy
            // No 
              // Add to list
  }


  //res.end(archive.paths.list);
};
