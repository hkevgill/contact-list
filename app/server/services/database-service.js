var pg = require('pg');
var moment = require('moment');

// database settings
var config = {
    user: 'gaillhvddgvdkz',
    database: 'd480g9gks302k3',
    password: '0347d85e8b99408afa818b934b6862dad6d01e461cd32259a60c5bb757b3733f',
    host: 'ec2-174-129-206-173.compute-1.amazonaws.com', // Server hosting the postgres database
    port: 5432,
    ssl: true,
    max: 15, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// use a connection pool
var pool = new pg.Pool(config);

// create the database table
module.exports.create = function(req, res) {

}
