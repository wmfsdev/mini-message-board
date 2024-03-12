const express = require('express');
const router = express.Router();

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
router.get('/', function(req, res, next) {
  res.render('index', { messages });
});

module.exports = router;
