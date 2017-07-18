const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);

const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

module.exports = db;