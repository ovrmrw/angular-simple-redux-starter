var fs = require('fs-extra');
var path = require('path');

var root = path.resolve();

var filename;
var err;

filename = 'angular-cli/models/webpack-build-typescript.js';
err = fs.copySync(root + '/lib-overwrite/' + filename, root + '/node_modules/' + filename);
if (err) {
  console.error(err);
} else {
  console.log(filename + ' overwrite is successed.');
}
