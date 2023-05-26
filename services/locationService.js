const locationsDB = require("../database/locationsDB.js");
const showsDB = require("../database/showsDB.js");
const sanitizer = require("../services/sanitizer.js");

async function getLocations() {
    const count = await locationsDB.countLocations();
    const locations = await locationsDB.getLocations();

    const results = locations.map(function(location) {
        return {
            id: location.id,
            name: location.name,
            city: location.city,
            lat: location.latitude,
            long: location.longitude
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
        lat: location.latitude,
        long: location.longitude
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
        lat: location.latitude,
        long: location.longitude
    }
    return response;
}

async function postLocation(data) {
    const safeData = sanitizer.healLocation(data);
    const params = convertToParams(safeData);
    const response = await locationsDB.insertLocation(params);
    const insertedLocation = getLocationById(response.insertId);
    return insertedLocation;
}

function convertToParams(location) {
    return [
        location.name || null,
        location.city || null,
        location.url || null,
        location.lat || null,
        location.long || null
    ];
}

module.exports = {
    getLocations,
    // getLocationById,
    getLatestLocation,
    postLocation
}