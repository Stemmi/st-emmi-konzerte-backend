const bands = require("../data/bands.json");

async function allBandsHandler(req, res) {
    try {
        res.json(bands.bands);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function bandByIdHandler(req, res) {
    try {
        
        res.json(bands.bands[req.params.id]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    allBandsHandler,
    bandByIdHandler
}