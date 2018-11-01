var express = require('express');
var router = express.Router();
var knex = require('../../knexinit');
var processPromiseAndAnswer = require('../../middlewares/processPromise');

/* GET currencies listing. */
router.get('/', function(req, res, next) {
  processPromiseAndAnswer(
    knex.select().table('Currencies'), res, 200);
});

module.exports = router;
