var express = require('express');
var router = express.Router();
var knex = require('../../knexinit');
var processPromiseAndAnswer = require('../../middlewares/processPromise');

/* GET expense types listing. */
router.get('/', function(req, res, next) {
    processPromiseAndAnswer(
        knex.select().table('ExpenseTypes').orderBy('id', 'asc'), res);
  });

module.exports = router;
