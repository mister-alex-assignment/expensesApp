module.exports = (function(promise, res, successStatus) {
    promise
        .then(function(collection) {
            res.status(successStatus).json({
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