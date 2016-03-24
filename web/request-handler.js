var path = require('path');
var archive = require('../helpers/archive-helpers');
var requestHelpers = require('./http-helpers.js');
// require more modules/folders here!

var sendResponse = function(res, code, message) {
  res.writeHead(code, requestHelpers.headers);
  res.end(message);
};

var sendStaticResponse = function(res, asset) {
  requestHelpers.serveAssets(res, __dirname + asset, function(err, result) {
    if (err) {
      console.log('File failed to load', err);
      console.log(__dirname + asset);
      sendResponse(res, 500, 'Oops! We can\'t load that file.');
    } else {
      res.writeHead(code, requestHelpers.headers);
      // res.headers['Content-Type']
      res.end(message);
    }
  });
};

exports.handleRequest = function (req, res) {
  console.log('Receiving ' + req.method + ' from ' + req.url + ' request with a content type of ');

  if (req.method === 'GET') {
    if (req.url === '/') {
      sendStaticResponse(res, '/public/index.html');
    }
    if (req.url === '/styles.css') {
      sendStaticResponse(res, '/public/styles.css');
    }
  } else if (req.method === 'POST') {
    //
  }


  //res.end(archive.paths.list);
};
