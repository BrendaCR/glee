'use strict';

const _ = require('lodash');
const config = require('config');
const fs = require('fs');
const hapi = require('hapi');

var buildRoutes = function(dirname) {
  return _.map(fs.readdirSync('./resources'), function(resource) {
    return {
      register: require(dirname + '/resources/' + resource),
      routes: { prefix: '/' + resource }
    }
  });
};

var server = function(dirname, name) {
  var server = new hapi.Server();
  server.connection({
    port: proces.env.PORT || config.get('port')
  });
  server.register(buildRoutes(dirname));
  return server;
};

module.exports = server;
