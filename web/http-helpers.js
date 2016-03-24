var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var makeHeaders = function(contentType) {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10, // Seconds.
    'Content-Type': contentType
  };
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
var serveAssets = function(res, asset, callback) { // Might need res argument
  fs.readFile(asset, 'utf8', function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(err, result);
    }
  });
};

var sendResponse = function(settings) {
  // Assign settings to variables
  res = settings.res;
  code = settings.code || 200;
  headers = settings.headers || headers('text/html');
  content = settings.content || '';

  // Format and send response
  res.writeHead(code, headers);
  res.end(content);
};

var sendStaticResponse = function(res, asset) {
  serveAssets(res, __dirname + asset, function(err, result) {
    if (err) {
      console.log('File failed to load', err);
      console.log(__dirname + asset);
      sendResponse(res, 500, 'Oops! We can\'t load that file.');
    } else {
      sendResponse({
        res: res,
        code: 200,
        headers: makeHeaders('text/' + path.extname(asset).substring(1)),
        content: result
      });
    }
  });
};

module.exports = {
  headers: makeHeaders,
  serveAssets: serveAssets,
  sendResponse: sendResponse,
  sendStaticResponse: sendStaticResponse
};


// As you progress, keep thinking about what helper functions you can put here!
