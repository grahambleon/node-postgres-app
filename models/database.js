const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://localhost:5432/todo');

db.any('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)', [true])
    .then(data => {
        console.log('DATA:', data); // print data;
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
    })
