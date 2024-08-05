const express = require('express');
const router = express.Router();

const pool = require('../db/pool')
const { body, validationResult } = require("express-validator");

const validate = [
  body("name").trim()
    .isLength({ max: 7 })
    .escape()
    .withMessage("nope"),
  body("message").trim()
    .isLength({ max: 7 })
    .escape()
    .withMessage("nope"),
]

router.post('/new', validate, async function(req, res, next) {

  const errors = validationResult(req, res)
  if (!errors.isEmpty()){
    return res.send("fail")
  }
  const username = req.body.name
  const message = req.body.message

  const text = "INSERT INTO messages (username, message) VALUES ($1, $2)  "
  const values = [ username, message ]

  await pool.query(text, values)
  res.redirect('/')
})

router.get('/', async function(req, res, next) {

  const { rows } = await pool.query("SELECT * FROM messages;")

  res.render('index', { 
    messages: rows,
   });
});

module.exports = router;
