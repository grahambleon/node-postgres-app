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
    db.any('SELECT * FROM items', [true])
    .then(data => res.send(data))
    .catch(error => console.error(error));
  })
  .post((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(req.body);
  });

module.exports = router;
