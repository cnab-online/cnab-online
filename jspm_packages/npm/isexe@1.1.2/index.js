/* */ 
(function(process) {
  var fs = require('fs');
  var core;
  if (process.platform === 'win32' || global.TESTING_WINDOWS) {
    core = require('./windows');
  } else if (typeof fs.access === 'function') {
    core = require('./access');
  } else {
    core = require('./mode');
  }
  module.exports = isexe;
  isexe.sync = sync;
  function isexe(path, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    if (!cb) {
      if (typeof Promise !== 'function') {
        throw new TypeError('callback not provided');
      }
      return new Promise(function(resolve, reject) {
        isexe(path, options || {}, function(er, is) {
          if (er) {
            reject(er);
          } else {
            resolve(is);
          }
        });
      });
    }
    core(path, options || {}, function(er, is) {
      if (er) {
        if (er.code === 'EACCES' || options && options.ignoreErrors) {
          er = null;
          is = false;
        }
      }
      cb(er, is);
    });
  }
  function sync(path, options) {
    try {
      return core.sync(path, options || {});
    } catch (er) {
      if (options && options.ignoreErrors || er.code === 'EACCES') {
        return false;
      } else {
        throw er;
      }
    }
  }
})(require('process'));
