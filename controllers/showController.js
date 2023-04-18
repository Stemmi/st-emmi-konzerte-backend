const db = require("../databases/db.js")
const showsDB = require("../databases/showsDB.js")
const locationsDB = require("../databases/locationsDB.js")

const outputConverters = require("../services/outputConverters.js")

async function allShowsHandler(req, res) {
    try {
        db.startTransaction();
        const count = await showsDB.countShows();
        const shows = await showsDB.getShows(); // later change this to pagination / limit
        const locations = await locationsDB.getLocations(); // later change this to only the needed locations
        // or... provide locations at all?
        db.commit();

        const results = outputConverters.createShowsList(shows, locations);
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

async function showsByLocationHandler(req, res) {
    try {
        const id = req.params.locationId;
        db.startTransaction();
        const count = await showsDB.countShowsByLocation(id);
        const shows = await showsDB.getShowsByLocation(id);
        const location = await locationsDB.getLocationById(id);
        db.commit();

        const results = outputConverters.createShowsList(shows, [location]);
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

async function showByIdHandler(req, res) {
    try {   
        db.startTransaction();
        const show = await showsDB.getShowById(req.params.id);
        const location = await locationsDB.getLocationById(show.location_id);
        db.commit();

        const response = outputConverters.createShowObject(show, location);

        res.json(response);
    } catch (error) {
        db.rollback();
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function latestShowHandler(req, res) {
    try {   
        db.startTransaction();
        const show = await showsDB.getLatestShow();
        const location = await locationsDB.getLocationById(show.location_id);
        db.commit();

        const response = outputConverters.createShowObject(show, location);

        res.json(response);
    } catch (error) {
        db.rollback();
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    allShowsHandler,
    showsByLocationHandler,
    showByIdHandler,
    latestShowHandler
}