var express = require('express');
var router = express.Router();
var knex = require('../../knexinit');
var processPromiseAndAnswer = require('../../middlewares/processPromise');

/* GET Expenses listing.
UserId & ReportId are reserved for future use:
UserId to be used to handle multi user system
ReportId to hanle expenses grouping by reports
*/
router.get('/', function(req, res, next) {
    processPromiseAndAnswer(
        knex.select().table('Expenses').orderBy('TimeCreated', 'desc'),
        res,
        200);
    }
);

router.post('/', function (req, res, next) {
    req.sanitizeBody('amount').toFloat();
    req.sanitizeBody('expenseDate').toDate();
    req.sanitizeBody('recipient');
    req.sanitizeBody('currency');
    req.sanitizeBody('expenseTypeId').toInt();

    processPromiseAndAnswer(
    knex('Expenses').insert({
        'ExpenseDate': req.body.expenseDate,
        'Amount': req.body.amount,
        'Recipient': req.body.recipient,
        'Currency': req.body.currency,
        'ExpenseTypeId': req.body.expenseTypeId
        }), res, 201);
});

// TODO needs to check for existence
router.put('/', function (req, res, next) {
    req.sanitizeBody('id').toInt();
    req.sanitizeBody('amount').toFloat();
    req.sanitizeBody('expenseDate').toDate();
    req.sanitizeBody('recipient');
    req.sanitizeBody('currency');
    req.sanitizeBody('expenseTypeId').toInt();

    processPromiseAndAnswer(
    knex('Expenses')
    .where('id', '=', req.body.id)
    .update({
        'ExpenseDate': req.body.expenseDate,
        'Amount': req.body.amount,
        'Recipient': req.body.recipient,
        'Currency': req.body.currency,
        'ExpenseTypeId': req.body.expenseTypeId
    }), res, 202);
});

router.delete('/', function (req, res, next) {
    req.sanitizeParams('id').toInt();

    processPromiseAndAnswer(
    knex('Expenses')
    .where('id', '=', req.param.id)
    .del(), res, 202);
});

module.exports = router;
