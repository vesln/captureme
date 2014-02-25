/**
 * Dependencies.
 */

var config = require('./browsers');
var path = require('path');

/**
 * Print `msg` to stderr and exit.
 *
 * @param {String} msg
 * @api public
 */

exports.error = function(msg) {
  console.error(msg);
  process.exit(1);
};

/**
 * Build path for given `url` and `alias`.
 *
 * @param {String} root dir
 * @param {String} alias
 * @param {String} url
 * @returns {String}
 * @api public
 */

exports.filePath = function(dir, alias, url) {
  return path.join(dir, alias + '_' + url.replace(/\W+/g, '_') + '.png');
};

/**
 * Parse browser input.
 *
 * @param {String} input
 * @returns {Array}
 * @api public
 */

exports.parseBrowsers = function(input) {
  input = (input || [])[0];

  return input.split(',').map(function(alias) {
    var entry = config[alias];
    if (!entry) throw new Error('invalid browser alias: ' + alias);
    entry.alias = alias;
    return entry;
  });
};
