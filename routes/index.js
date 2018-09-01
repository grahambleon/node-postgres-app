const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://localhost:5432/todo');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/items', function(req, res, next) {
  const results = db.any('SELECT * FROM items', [true])
    .then(function(data) {
      res.send(data)
    })
    .catch(function(error) {
        console.error(error);
    });
})

module.exports = router;
