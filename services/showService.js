const showsDB = require("../database/showsDB.js")
const locationsDB = require("../database/locationsDB.js")
const usersDB = require("../database/usersDB.js")

const outputConverters = require("./outputConverters.js")
const sanitizer = require("../services/sanitizer.js");

async function getShows(limit = 10, page = 1) {
    try {
        const limitInt = +limit;
        const offset = (page - 1) * limitInt;
        const count = await showsDB.countShows();
        const shows = await showsDB.getShows(limitInt, offset);
        if (!shows.length) return { count: count, results: [] };
        
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
        if (count === 0) {
            return {
                count: 0,
                results: []
            }
        }

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

async function postShow(data) {
    try {
        const safeData = sanitizer.healShow(data);
        const params = convertToParams(safeData);
        const response = await showsDB.insertShow(params);
        const insertedShow = getShowById(response.insertId);
        return insertedShow;
    } catch (error) {
        throw error;
    }
}

function convertToParams(show) {
    return [
        show.title || null,
        show.location_id || null,
        show.date || null,
        show.text || null,
        show.poster_filename || null,
        show.poster_alt || null,
        show.user_id || null
    ];
}

module.exports = {
    getShows,
    getShowsByLocation,
    getShowById,
    postShow
}