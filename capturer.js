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

Capturer.prototype.capture = function(opts, fn) {
  var driver = this.driver();

  var driverOptions = {
    browserName: this.browser.name,
    platform: this.browser.platform,
    version: this.browser.version
  };

  function takeScreenshot() {
    debug('take screenshot');
    driver.takeScreenshot(fn);
  }

  function resize(width, height, fn) {
    debug('resize %sx%s', width, height);
    driver.setWindowSize(+width, +height, fn);
  }

  debug('init %s', this.browser.alias);
  driver.init(driverOptions, function(err) {
    if (err) return fn(err);

    debug('GET %s', opts.url);

    driver.get(opts.url, function(err) {
      if (err) return fn(err);
      if (!opts.width && !opts.height) return takeScreenshot();

      resize(opts.width, opts.height, function(err) {
        if (err) return fn(err);
        takeScreenshot();
      });
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
