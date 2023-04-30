const showsDB = require("../database/showsDB.js")
const locationsDB = require("../database/locationsDB.js")
const usersDB = require("../database/usersDB.js")

const outputConverters = require("./outputConverters.js")

async function getShows() {
    try {
        const count = await showsDB.countShows();
        const shows = await showsDB.getShows(); // later change this to pagination / limit
        const locationIds = [...new Set(shows.map(show => show.location_id))];
        const locations = await locationsDB.getLocationsByIds(locationIds);
        const userIds = [...new Set(shows.map(show => show.user_id))];
        const users = await usersDB.getUsersByIds(userIds);

        const results = outputConverters.createShowsList(shows, locations, users);
        const response = {
            count,
            results
        }
        return response;

    } catch (error) {
        throw error;
    }
}

async function getShowsByLocation(id) {
    try {
        const count = await showsDB.countShowsByLocation(id);
        const shows = await showsDB.getShowsByLocation(id);
        const location = await locationsDB.getLocationById(id);
        const userIds = [...new Set(shows.map(show => show.user_id))];
        const users = await usersDB.getUsersByIds(userIds);

        const results = outputConverters.createShowsList(shows, [location], users);
        const response = {
            count,
            results
        }
        return response;

    } catch (error) {
        throw error;
    }
}

async function getShowById(id) {
    try {   
        const show = await showsDB.getShowById(id);
        const location = await locationsDB.getLocationById(show.location_id);
        const user = await usersDB.getUserById(show.user_id);

        const response = outputConverters.createShowObject(show, location, user);
        return response;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getShows,
    getShowsByLocation,
    getShowById
}