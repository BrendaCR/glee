'use strict';

var Hapi = require('hapi');
var plugin = require('./plugin');

exports.server = function(name) {
  var server = new Hapi.Server();
  server.register({
    register: plugin,
    options: {
      host: 'localhost',
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
