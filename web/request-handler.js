var path = require('path');
var archive = require('../helpers/archive-helpers');
var requestHelpers = require('./http-helpers.js');
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
    //
  }


  //res.end(archive.paths.list);
};
