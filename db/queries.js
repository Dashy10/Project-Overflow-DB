var pgp = require('pg-promise')();
var connString = process.env.DATABASE_URL;
var db = pgp(connString);
