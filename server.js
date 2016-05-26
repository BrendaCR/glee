'use strict';

var Hapi = require('hapi');
var os = require('os');
var plugin = require('./plugin');

var port = process.env.PORT || 3000;

exports.server = function(name) {
  var server = new Hapi.Server();
  server.register({
    register: plugin,
    options: {
      host: os.hostname(),
      port: port,
      name: name
    }
  }, (err) => {
    if (err) {
      console.error('Failed to load plugin:', err);
    }
  });

  server.connection({port: port});
  return server;
};
