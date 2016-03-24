var path = require('path');
var archive = require('../helpers/archive-helpers');
var requestHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('Receiving ' + req.method + ' from ' + req.url + ' request with a content type of ');

  if (req.method === 'GET') {
    console.log('Loading index.html');
    requestHelpers.serveAssets(__dirname + 'web/public/index.html', function(err, result) {
      if (err) {
        console.log('error request', err);
        res.end();
      } else {
        res.writeHead(200, requestHelpers.headers);
        res.write(result);
        res.end();
      }
    });
  }

  //res.end(archive.paths.list);
};
