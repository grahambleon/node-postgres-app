const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://localhost:5432/todo');
const path = require('path');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.route('/api/v1/items')
  .get((req, res) => {
    db.any('SELECT * FROM items')
    .then(data => res.send(data))
    .catch(error => console.error(error));
  })
  .post((req, res) => {
    db.one(
      'INSERT INTO items(text, complete) VALUES($1, $2) RETURNING text',
      [req.body.text, false]
    )
    .then(data => {
      res.send(`Successfully added task: "${data.text}".`);
    })
    .catch(error => console.error(error));
  });

module.exports = router;
