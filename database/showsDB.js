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

async function getShows(limit, offset) {
    const dbQuery =
        `SELECT shows.id, shows.title, shows.date, shows.poster_filename, shows.poster_alt, shows.text,
        locations.name AS location_name, locations.city AS location_city,
        users.name AS user_name, users.image AS user_image
        FROM shows
        JOIN locations
        ON shows.location_id = locations.id
        JOIN users
        ON shows.user_id = users.id
        ORDER BY date DESC
        LIMIT ?
        OFFSET ?;`;
    const results = await db.query(dbQuery, [ limit, offset ]);
    return results;
}

async function getShowsByLocation(locationId) {
    const dbQuery = 
        `SELECT shows.id, shows.title, shows.date, shows.text,
        locations.name AS location_name, locations.city AS location_city,
        users.name AS user_name, users.image AS user_image
        FROM shows
        JOIN locations
        ON shows.location_id = locations.id
        JOIN users
        ON shows.user_id = users.id
        WHERE shows.location_id = ?;`;
    const results = await db.query(dbQuery, locationId);
    return results;
}

async function getShowById(id) {
    const dbQuery = 
        `SELECT shows.id, shows.title, shows.date, shows.text,
        shows.poster_filename, shows.poster_alt,
        locations.name AS location_name, locations.city AS location_city,
        locations.url AS location_url, locations.latitude AS location_lat, locations.longitude AS location_long, 
        users.name AS user_name, users.image AS user_image,
        shows.location_id, shows.user_id
        FROM shows
        JOIN locations
        ON shows.location_id = locations.id
        JOIN users
        ON shows.user_id = users.id
        WHERE shows.id = ?;`;
    const results = await db.query(dbQuery, id);
    return results[0];
}

async function getLatestShow() {
    const dbQuery = "SELECT * FROM shows ORDER BY date DESC LIMIT 1";
    const results = await db.query(dbQuery);
    return results[0];
}

async function insertShow(params) {
    const dbQuery = "INSERT INTO shows (title, location_id, date, text, poster_filename, poster_alt, user_id) VALUES (?, ?, ?, ?, ?, ?, ?);";
    const results = await db.query(dbQuery, params);
    return results;
}

async function updateShow(params) {
    const dbQuery = "UPDATE shows SET title = ?, location_id = ?, date = ?, text = ?, poster_filename = ?, poster_alt = ?, user_id = ? WHERE id = ?;";
    const results = await db.query(dbQuery, params);
    return results;
}

async function deleteShow(id) {
    console.log('delete show', [id])
    const dbQuery = "DELETE FROM shows WHERE id = ?;";
    const results = await db.query(dbQuery, [id]);
    return results;
}

module.exports = {
    countShows,
    countShowsByLocation,
    getShows,
    getShowsByLocation,
    getShowById,
    getLatestShow,
    insertShow,
    updateShow,
    deleteShow
}