const express = require('express');
const router = express.Router();

const pool = require('../db/pool')

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

router.post('/new', (req, res) => {
  console.log(req.body.message)
  messages.push({
    text: req.body.message,
    user: req.body.name,
    added: new Date()
  })
  res.redirect('/')
})


/* GET home page. */
router.get('/', async function(req, res, next) {

  const { rows } = await pool.query("SELECT * FROM messages;")
  // console.log("rows: ", rows)
  res.render('index', { 
    messages: rows,
   });
});

module.exports = router;
