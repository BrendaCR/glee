'use strict';

var zookeeper = require('node-zookeeper-client');
var config = require('config');

var client = zookeeper.createClient(config.get('zookeeper'));
client.connect();

exports.register = function (server, options, next) {
  client.once('connected', function () {
    var path = '/services/' + options.name + '/' + options.host + ':' + options.port;
    client.remove(path, function() {
      client.create(path, zookeeper.CreateMode.EPHEMERAL, function(err) {
        if (err) {
          console.error("failed to register with zookeeper", err);
        } else {
          console.log("successfully registered with zookeeper");
        }
      });
    });
    next();
  });
};

exports.register.attributes = {
  name: 'myPlugin',
  version: '1.0.0'
};
