var express = require('express');
var router = express.Router();

/* GET currencies listing. */
router.get('/', function(req, res, next) {
  res.send('a list of currencies here');
});

module.exports = router;
