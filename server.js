'use strict';

var Hapi = require('hapi');
var plugin = require('./plugin');
var os = require('./os');

exports.server = function(name) {
  var server = new Hapi.Server();
  server.register({
    register: plugin,
    options: {
      host: os.hostname(),
      port: 3000,
      name: name
    }
  }, (err) => {
    if (err) {
      console.error('Failed to load plugin:', err);
    }
  });

  server.connection({port: 3000});
  return server;
};
