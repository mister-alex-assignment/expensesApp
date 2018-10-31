var express = require('express');
var router = express.Router();
var knex = require('../../knexinit');

/* GET Expenses listing.
UserId & ReportId are reserved for future use:
UserId to be used to handle multi user system
ReportId to hanle expenses grouping by reports
*/
router.get('/', function(req, res, next) {
    knex.select().table('Expenses').orderBy('TimeCreated', 'desc').
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


router.post('/', function (req, res, next) {
    knex('Expenses').insert({
        'ExpenseDate': req.body.expenseDate,
        'Amount': req.body.amount,
        'Recipient': req.body.recipient,
        'Currency': req.body.currency,
        'ExpenseTypeId': req.body.expenseTypeId
        }).then(function (id) {
            res.status(201).json({
                error: false,
                data: id
            })
        }).catch(function (err) {
            res.status(500).json({
                error: true,
                data: err.message
        })
    })
});

// TODO needs to check for existence
router.put('/', function (req, res, next) {
    knex('Expenses')
    .where('id', '=', req.body.id)
    .update({
        'ExpenseDate': req.body.expenseDate,
        'Amount': req.body.amount,
        'Recipient': req.body.recipient,
        'Currency': req.body.currency,
        'ExpenseTypeId': req.body.expenseTypeId
    }).then(function (id) {
        res.status(201).json({
            error: false,
            data: id
        })
    }).catch(function (err) {
        res.status(500).json({
            error: true,
            data: err.message
        })
    })
});

router.delete('/', function (req, res, next) {
    knex('Expenses')
    .where('id', '=', req.body.id)
    .del().then(function (id) {
        res.status(201).json({
            error: false,
            data: id
        })
    }).catch(function (err) {
        res.status(500).json({
            error: true,
            data: err.message
        })
    })
});


module.exports = router;
