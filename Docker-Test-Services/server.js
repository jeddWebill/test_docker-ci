const Hapi = require('hapi');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;

var uri = "mongodb://mongo/test";
const server = new Hapi.Server();
server.connection({ port: 8080 });
server.route(
    {method: 'GET',
    path: '/db',
    handler:function(req,reply) {
    client.connect(uri, function (err, db) {
        if (err) reply( res.json(err));
        var collection = db.collection('dummy');
        collection.find({}).toArray(function(err, docs) {
            if (err) reply(err);
            reply("Connected to db fine");
        });
    })}});
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hi 3');
    }
});

server.start((err) => {

    if (err)
    throw err;

console.log('Server running at:', server.info.uri);
});
/**
 * Created by User on 2017-08-16.
 */
