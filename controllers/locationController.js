const locations = require("../data/locations.json");

async function allLocationsHandler(req, res) {
    try {
        res.json(locations.locations);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function locationByIdHandler(req, res) {
    try {
        res.json(locations.locations[req.params.id]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    allLocationsHandler,
    locationByIdHandler
}