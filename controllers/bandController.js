const bandService = require("../services/bandService.js");

async function allBandsHandler(req, res) {
    try {
        const response = await bandService.getBands();
        res.json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function bandByIdHandler(req, res) {
    try {
        const response = await bandService.getBandById(req.params.id);
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function bandsByShowHandler(req, res) {
    try {
        const response = await bandService.getBandsByShowId(req.params.id);
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    // allBandsHandler,
    // bandByIdHandler,
    bandsByShowHandler
}