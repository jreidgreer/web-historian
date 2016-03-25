var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Promise = require('bluebird');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
var initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

var readListOfUrls = function(callback) {
  fs.readFile(paths.list, 'utf8', function(err, data) {
    var output = data.trim().split('\n');
    callback(err, output);
  });
};

var isUrlInList = function(targetUrl, list) {
  return _.contains(list, targetUrl);
};

var addUrlToList = function(url) {
  fs.appendFile(paths.list, url + '\n', 'utf8', function(err) {
    if (err) {
      console.error('Add to list failed ', err);
    }
  });
};

var isUrlArchived = function(url, callback) {
  //search through sites folder
  //pass url through sanitize
  //compare and return boolean based on presence of file
  var isArchived;
  var fileName = sanitizeUrl(url) + '.html';
  console.log('FileName: ', fileName);
  fs.stat(path.join(__dirname, '../archives/sites/', fileName), function(err, statObj) {
    if (err) {
      console.error('error, isUrlArchived in fs.stat', err);
      isArchived = false;
    } else {
      //never tested for true
      console.log('isArchived is true');
      isArchived = true;
    }
    //async, callback called too early, isArchived still undefined
    callback(isArchived);
  });
};

var downloadUrls = function(urls, callback) {
  //urls -> []
  //could change to downloadUrl <-singular, could _.each outside to make 2 promises, one for each data
  _.each(urls, function(url) {
    request(url, function(error, response, body) {
      callback(error, body, url);
    });
  });
};

//regular expression to remove before http(s):// and all the . and all the /
var sanitizeUrl = function(url) {
  return url.replace(/(http|https)(:\/\/)/, '')
      .replace(/\./g, '')
      .replace(/\//g, '');
};

module.exports = {
  paths: paths,
  initialize: initialize,
  readListOfUrls: readListOfUrls,
  isUrlInList: isUrlInList,
  addUrlToList: addUrlToList,
  isUrlArchived: isUrlArchived,
  downloadUrls: downloadUrls,
  sanitizeUrl: sanitizeUrl
};