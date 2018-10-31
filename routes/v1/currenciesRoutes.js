var express = require('express');
var router = express.Router();
var currencyController = require('../../controllers/currencyController');
var knex = require('../../knexinit');

/* GET currencies listing. */
router.get('/', function(req, res, next) {
  knex.select().table('Currencies').
    then(function(collection) {
      res.status(200).json({
        error: false,
        data: collection
      })
    })
    .catch(function (err) {
      res.status(500).json({
        error: true,
        data: err.message
      })
    })
});

module.exports = router;
