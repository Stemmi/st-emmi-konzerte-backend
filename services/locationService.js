const locationsDB = require("../database/locationsDB.js");
const showsDB = require("../database/showsDB.js");


async function getLocations() {
    const count = await locationsDB.countLocations();
    const locations = await locationsDB.getLocations();

    const results = locations.map(function(location) {
        return {
            id: location.id,
            name: location.name,
            city: location.city,
            lat: location.lat,
            long: location.long
        }
    });
    const response = {
        count,
        results
    }
    return response;
}

async function getLocationById(id) {
    const location = await locationsDB.getLocationById(id);

    const response = {
        id: location.id,
        name: location.name,
        city: location.city,
        url: location.url,
        lat: location.lat,
        long: location.long
    }
    return response;
}

async function getLatestLocation() {
    const latestShow = await showsDB.getLatestShow();
    const location = await locationsDB.getLocationById(latestShow.location_id);

    const response = {
        id: location.id,
        name: location.name,
        city: location.city,
        url: location.url,
        lat: location.lat,
        long: location.long
    }
    return response;
}

module.exports = {
    getLocations,
    // getLocationById,
    getLatestLocation
}