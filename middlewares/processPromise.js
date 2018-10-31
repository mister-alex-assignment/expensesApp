module.exports = (function(promise, res) {
    promise
        .then(function(collection) {
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