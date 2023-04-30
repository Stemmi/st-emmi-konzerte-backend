const showService = require("../services/showService.js")

async function allShowsHandler(req, res) {
    try {
        const response = await showService.getShows();
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function showsByLocationHandler(req, res) {
    try {
        const response = await showService.getShowsByLocation(req.params.id);
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function showByIdHandler(req, res) {
    try {   
        const response = await showService.getShowById(req.params.id);
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    allShowsHandler,
    showsByLocationHandler,
    showByIdHandler
}