'use strict';

var elasticsearch = require('elasticsearch');
var zookeeper = require('node-zookeeper-client');

var zookeeperClient = zookeeper.createClient('ec2-54-187-246-173.us-west-2.compute.amazonaws.com:2181');
zookeeperClient.connect();

var exportedClient = new Promise((resolve, reject) => {
  zookeeperClient.once('connected', () => {
    zookeeperClient.getChildren('/databases/elasticsearch', function (error, children, stats) {
      if (error) {
        console.log(error.stack);
        reject(error);
      }
      resolve(new elasticsearch.Client({
        host: children[0],
        log: 'trace'
      }));
    });
  });
});

exportedClient.get = function(args) {
  return exportedClient.then((client) => {
    return client.get(args);
  });
}

exportedClient.search = function(args) {
  return exportedClient.then((client) => {
    return client.search(args);
  });
}

exports.client = exportedClient;
