'use strict';

var zookeeper = require('node-zookeeper-client');
var os = require('os');

var client = zookeeper.createClient('ec2-54-187-246-173.us-west-2.compute.amazonaws.com:2181');
client.connect();

function registerService(options) {
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
  });
}

exports.register = function (server, options, next) {
  registerService(options);
  next();
};

exports.register.attributes = {
  name: 'myPlugin',
  version: '1.0.0'
};
