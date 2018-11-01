exports.getAll = async (req, res) => {
    const currencies = new Array();

    return res.status(201).json( {
        status : "ok",
        error : null,
        data : currencies
    });
}