const shows = require("../data/shows.json");

async function allShowsHandler(req, res) {
    try {
        // const response = await fetch("../data/shows.json");
        // const result = await response.json();
        
        res.json(shows.shows);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function showByIdHandler(req, res) {
    try {
        
        res.json(shows.shows[req.params.id]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

function showsByLocationHandler(req, res) {
    try {
        const result = shows.shows.filter(show => +show.locationId === +req.params.locationId);

        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

function latestShowHandler(req, res) {
    try {
        const showsWithValidDate = shows.shows.filter(show => show.date);
        const latest = showsWithValidDate.reduce((prev, curr) => (prev.date > curr.date) ? prev : curr);
        res.json(latest);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    allShowsHandler,
    showByIdHandler,
    latestShowHandler,
    showsByLocationHandler
}