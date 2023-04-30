const locationService = require("../services/locationService.js");

async function allLocationsHandler(req, res) {
    try {
        const response = await locationService.getLocations();
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function locationByIdHandler(req, res) {
    try {
        const response = await locationService.getLocationById(req.params.id);
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function latestLocationHandler(req, res) {
    try {
        const response = await locationService.getLatestLocation();
        res.json(response);

    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    } 
}

module.exports = {
    allLocationsHandler,
    // locationByIdHandler,
    latestLocationHandler
}