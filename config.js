/**
 * Dependencies.
 */

var join = require('path').join;
var homepath = require('homepath');

var config = null;

try {
  config = require(join(homepath, '.captureme.json'));
} catch (e) {
  config = require('./browsers');
}

/**
 * Primary export.
 */

module.exports = config;
