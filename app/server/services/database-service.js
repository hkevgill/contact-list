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
    pool.connect(function(err, client, done) {

        client.query('CREATE TABLE Contacts(ID SERIAL PRIMARY KEY, Contact_Name VARCHAR(300), Contact_Email VARCHAR(80), Contact_Phone VARCHAR(20), Contact_Mailing_Address VARCHAR(300));', function(err, results) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

        });

    });
}

// get a list of all contacts
module.exports.getContactList = function(req, res) {
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query('SELECT * FROM "contacts"', function(err, result) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

            res.json(result);
        });
    });
}

// get a specific contact
module.exports.getContact = function(req, res) {

    var data = {};

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query('SELECT * FROM "contacts" e WHERE "id" = $1::int', [req.params.contactId], function(err, result) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

            res.json(result);

        });
    });
}

// save new contact information
module.exports.updateContact = function(req, res) {

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        req.body.When = moment(req.body.When).utc().unix();;

        client.query('UPDATE "contacts" SET "contact_name" = $1::text, "contact_email" = $2::text, "contact_phone" = $3::text, "contact_mailing_address" = $4::text WHERE "id" = $5::int RETURNING *', [req.body.contact_name, req.body.contact_email, req.body.contact_phone, req.body.contact_mailing_address, req.body.id], function(err, result) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

            res.json(result);
        });
    });
}

// delete contact
module.exports.deleteContact = function(req, res) {

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query('DELETE FROM "contacts" WHERE "id" = $1::int', [req.params.contactId], function(err, result) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

            res.json(result);
        });
    });
}

// add contact
module.exports.addContact = function(req, res) {

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        var query = client.query('INSERT INTO "contacts"("contact_name", "contact_email", "contact_phone", "contact_mailing_address") VALUES($1::text, $2::text, $3::text, $4::text) RETURNING *', [req.body.Contact_Name, req.body.Contact_Email, req.body.Contact_Phone, req.body.Contact_Mailing_Address], function(err, result) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

            res.json(result);
        });
    });
}
