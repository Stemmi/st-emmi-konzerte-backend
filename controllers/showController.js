const showService = require("../services/showService.js");

async function allShowsHandler(req, res) {
    try {
        const response = await showService.getShows(req.query.limit, req.query.page);
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

async function postShowHandler(req, res) {
    try {
        const response = await showService.postShow(req.body);
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function putShowHandler(req, res) {
    try {
        const response = await showService.putShow(req.body);
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function deleteShowHandler(req, res) {
    try {
        const response = await showService.deleteShow(req.params.id);
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    allShowsHandler,
    showsByLocationHandler,
    showByIdHandler,
    postShowHandler,
    putShowHandler,
    deleteShowHandler
}