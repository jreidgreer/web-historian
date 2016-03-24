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
      var formInput = qs.parse(queryData);
      // console.log(formInput);
      //chain of promises
      archive.readListOfUrls();
        // .then(function(listTextFile) {

        // }).then()
    });
  }


  //res.end(archive.paths.list);
};
