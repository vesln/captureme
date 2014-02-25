/**
 * Dependencies.
 */

var wd = require('wd');
var debug = require('sherlock')('captureme:capturer');

/**
 * Screenshot capturer.
 *
 * @param {String} saucelabs user
 * @param {String} saucelabs key
 * @param {Object} browser config
 * @constructor
 */

function Capturer(user, key, browser) {
  this.user = user;
  this.key = key;
  this.browser = browser;
}

/**
 * Capture a screenshot for `url`.
 *
 * @param {String} url
 * @param {Function} fn
 * @api public
 */

Capturer.prototype.capture = function(url, fn) {
  var driver = this.driver();

  var opts = {
    browserName: this.browser.name,
    platform: this.browser.platform,
    version: this.browser.version
  };

  debug('init %s', this.browser.alias);
  driver.init(opts, function(err) {
    if (err) return fn(err);

    debug('GET %s', url);
    driver.get(url, function(err) {
      if (err) return fn(err);

      debug('take screenshot');
      driver.takeScreenshot(fn);
    });
  });
};

/**
 * WebDriver remote factory.
 *
 * @returns {Object}
 * @api private
 */

Capturer.prototype.driver = function() {
  return wd.remote('ondemand.saucelabs.com', 80, this.user, this.key);
};

/**
 * Primary export.
 */

module.exports = Capturer;
