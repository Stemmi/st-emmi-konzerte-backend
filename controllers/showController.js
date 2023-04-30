const showsDB = require("../databases/showsDB.js")
const locationsDB = require("../databases/locationsDB.js")
const usersDB = require("../databases/usersDB.js")

const outputConverters = require("../services/outputConverters.js")

async function allShowsHandler(req, res) {
    try {
        const count = await showsDB.countShows();
        const shows = await showsDB.getShows(); // later change this to pagination / limit
        const locationIds = [...new Set(shows.map(show => show.location_id))];
        const locations = await locationsDB.getLocationsByIds(locationIds);
        const userIds = [...new Set(shows.map(show => show.user_id))];
        const users = await usersDB.getUsersByIds(userIds);

        const results = outputConverters.createShowsList(shows, locations, users);
        const response = {
            count: count,
            results: results
        }
        
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function showsByLocationHandler(req, res) {
    try {
        const id = req.params.id;

        const count = await showsDB.countShowsByLocation(id);
        const shows = await showsDB.getShowsByLocation(id);
        const location = await locationsDB.getLocationById(id);
        const userIds = [...new Set(shows.map(show => show.user_id))];
        const users = await usersDB.getUsersByIds(userIds);

        const results = outputConverters.createShowsList(shows, [location], users);
        const response = {
            count: count,
            results: results
        }
        
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function showByIdHandler(req, res) {
    try {   
        const show = await showsDB.getShowById(req.params.id);
        const location = await locationsDB.getLocationById(show.location_id);
        const user = await usersDB.getUserById(show.user_id);

        const response = outputConverters.createShowObject(show, location, user);

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