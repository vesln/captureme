/**
 * Dependencies.
 */

var u = require('url');
var lt = require('localtunnel');
var parse = u.parse;
var join = u.format;

/**
 * Most commonly used local hosts.
 */

var local = [
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
];

/**
 * Parse `url` and detect if it is pointing to localhost. If so
 * create a `localtunnel` and return the new url. If not
 * return the original url
 *
 * @param {String} url
 * @param {Function} fn
 * @api public
 */

module.exports = function(url, fn) {
  var parsed = parse(url);

  if (local.indexOf(parsed.hostname) === -1) {
    return fn(null, url);
  }

  lt(parsed.port, function(err, tunnel) {
    if (err) return fn(err);

    var proxy = parse(tunnel.url);
    var newUrl = join({
      host: proxy.host,
      hostname: proxy.hostname,
      port: proxy.port,
      protocol: proxy.protocol,
      auth: parsed.auth,
      slashes: parsed.slashes,
      hash: parsed.hash,
      search: parsed.search,
      query: parsed.query,
      pathname: parsed.pathname,
      path: parsed.path,
    });

    fn(null, newUrl);
  });
};
