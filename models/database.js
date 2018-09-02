const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://localhost:5432/todo');

db.none(
  'CREATE TABLE items (id SERIAL PRIMARY KEY, text varchar(40) NOT NULL, complete BOOLEAN);', [true])
  .then(() => {
    console.log('Success! :D');
    pgp.end();
  })
  .catch(error => {
    console.error(error);
  });
