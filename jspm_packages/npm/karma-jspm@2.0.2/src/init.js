/* */ 
var glob = require('glob');
var path = require('path');
var fs = require('fs');
function flatten(structure) {
  return [].concat.apply([], structure);
}
function expandGlob(file, cwd) {
  return glob.sync(file.pattern || file, {cwd: cwd});
}
var createPattern = function(path) {
  return {
    pattern: path,
    included: true,
    served: true,
    watched: false
  };
};
var createServedPattern = function(path) {
  return {
    pattern: path,
    included: false,
    served: true,
    watched: true
  };
};
function getJspmPackageJson(dir) {
  var pjson = {};
  try {
    pjson = JSON.parse(fs.readFileSync(path.resolve(dir, 'package.json')));
  } catch (e) {
    pjson = {};
  }
  if (pjson.jspm) {
    for (var p in pjson.jspm)
      pjson[p] = pjson.jspm[p];
  }
  pjson.directories = pjson.directories || {};
  if (pjson.directories.baseURL) {
    if (!pjson.directories.packages)
      pjson.directories.packages = path.join(pjson.directories.baseURL, 'jspm_packages');
    if (!pjson.configFile)
      pjson.configFile = path.join(pjson.directories.baseURL, 'config.js');
  }
  return pjson;
}
module.exports = function(files, basePath, jspm, client) {
  if (!jspm)
    jspm = {};
  if (!jspm.config)
    jspm.config = getJspmPackageJson(basePath).configFile || "config.js";
  if (!jspm.loadFiles)
    jspm.loadFiles = [];
  if (!jspm.serveFiles)
    jspm.serveFiles = [];
  if (!jspm.packages)
    jspm.packages = getJspmPackageJson(basePath).directories.packages || "jspm_packages/";
  if (!client.jspm)
    client.jspm = {};
  if (jspm.paths !== undefined && typeof jspm.paths === 'object')
    client.jspm.paths = jspm.paths;
  if (jspm.meta !== undefined && typeof jspm.meta === 'object')
    client.jspm.meta = jspm.meta;
  client.jspm.useBundles = jspm.useBundles;
  client.jspm.stripExtension = jspm.stripExtension;
  var packagesPath = path.normalize(basePath + '/' + jspm.packages + '/');
  var configPath = path.normalize(basePath + '/' + jspm.config);
  var jspmPattern = createServedPattern(packagesPath + '**/*');
  jspmPattern.watched = false;
  files.unshift(jspmPattern);
  function getLoaderPath(fileName) {
    var exists = glob.sync(packagesPath + fileName + '@*.js');
    if (exists && exists.length != 0) {
      return packagesPath + fileName + '@*.js';
    } else {
      return packagesPath + fileName + '.js';
    }
  }
  files.unshift(createPattern(configPath));
  files.unshift(createPattern(__dirname + '/adapter.js'));
  files.unshift(createPattern(getLoaderPath('system-polyfills.src')));
  files.unshift(createPattern(getLoaderPath('system.src')));
  client.jspm.expandedFiles = flatten(jspm.loadFiles.map(function(file) {
    files.push(createServedPattern(basePath + "/" + (file.pattern || file)));
    return expandGlob(file, basePath);
  }));
  jspm.serveFiles.map(function(file) {
    files.push(createServedPattern(basePath + "/" + (file.pattern || file)));
  });
};
