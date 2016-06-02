'use strict';

const _ = require('lodash');
const config = require('config');
const fs = require('fs');
const hapi = require('hapi');
const hapiZookeeper = require('./zookeeper');

var buildRoutes = function(dirname) {
  return _.map(fs.readdirSync('./resources'), (resource) => {
    return {
      register: require(dirname + '/resources/' + resource),
      routes: { prefix: '/' + resource }
    }
  });
};

var server = function(dirname) {
  var server = new hapi.Server();
  server.connection({
    port: process.env.PORT || config.get('port')
  });
  server.register({
    register: hapiZookeeper,
    options: {
      host: config.get('client.hostname'),
      port: config.get('client.port'),
      name: config.get('appName')
    }
  });
  server.register(buildRoutes(dirname));
  return server;
};

module.exports = server;
