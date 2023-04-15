const db = require("../databases/db.js");
const locationsDB = require("../databases/locationsDB.js");

async function allLocationsHandler(req, res) {
    try {
        db.startTransaction();
        const count = await locationsDB.countLocations();
        const locations = await locationsDB.getLocations();
        db.commit();

        const results = locations.map(function(location) {
            return {
                id: location.id,
                name: location.name,
                city: location.city,
                url: location.url,
                lat: location.lat,
                long: location.long
            }
        });
        const response = {
            count: count,
            results: results
        }
        
        res.json(response);
    } catch (error) {
        db.rollback();
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function locationByIdHandler(req, res) {
    try {
        const location = await locationsDB.getLocationById(req.params.id);
        const response = {
            id: location.id,
            name: location.name,
            city: location.city,
            url: location.url,
            lat: location.lat,
            long: location.long
        }

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    allLocationsHandler,
    locationByIdHandler
}