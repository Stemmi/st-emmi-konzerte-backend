const db = require("./db.js");

async function countShows() {
    const dbQuery = "SELECT COUNT(id) AS total FROM shows;";
    const results = await db.query(dbQuery);
    return results[0].total;
}

async function countShowsByLocation(locationId) {
    const dbQuery = "SELECT COUNT(id) AS total FROM shows WHERE location_id = ?;";
    const results = await db.query(dbQuery, locationId);
    return results[0].total;
}

async function getShows() {
    const dbQuery = "SELECT * FROM shows;";
    const results = await db.query(dbQuery);
    return results;
}

async function getShowsByLocation(locationId) {
    const dbQuery = "SELECT * FROM shows WHERE location_id = ?;";
    const results = await db.query(dbQuery, locationId);
    return results;
}

async function getShowById(id) {
    const dbQuery = "SELECT * FROM shows WHERE id = ?;";
    const results = await db.query(dbQuery, id);
    return results[0];
}

async function getLatestShow() {
    const dbQuery = "SELECT * FROM shows ORDER BY date DESC LIMIT 1";
    const results = await db.query(dbQuery);
    return results[0];
}

module.exports = {
    countShows,
    countShowsByLocation,
    getShows,
    getShowsByLocation,
    getShowById,
    getLatestShow
}