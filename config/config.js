const promise = require('bluebird');
const options = { 
    promiseLib: promise,
    query: (e) => {
        console.log(e.query);
    }
 };
const pgp = require('pg-promise')(options);

const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

module.exports = db;