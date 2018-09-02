const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://localhost:5432/todo');
const path = require('path');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/items', (req, res) => {
  db.any('SELECT * FROM items', [true])
  .then(data => res.send(data))
  .catch(error => console.error(error));
})

router.post('api/v1/items', (req, res) => {
  // const data = {
  //   text: req.body.text,
  //   complete: false
  // }
  // db.none(`INSERT INTO items VALUES(DEFAULT, ${data.text}, ${data.complete}`), [true])
  //   .then(() => {
  //     console.log('SUCCESS :D');
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  console.log(req.body);
  res.end();
})

module.exports = router;
