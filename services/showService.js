const showsDB = require("../database/showsDB.js");
const showsHasBandsDB = require("../database/showsHasBandsDB.js");
const outputConverters = require("./outputConverters.js");
const sanitizer = require("../services/sanitizer.js");

async function getShows(limit = 10, page = 1) {
    const offset = (+page - 1) * (+limit);
    const count = await showsDB.countShows();
    const shows = await showsDB.getShows(+limit, offset);
    if (!shows.length) return { count: count, results: [] };
    
    const results = outputConverters.createShowsList(shows);
    const response = {
        count,
        results
    }
    return response;
}

async function getShowsByLocation(id) {
    const count = await showsDB.countShowsByLocation(id);
    if (count === 0) {
        return {
            count: 0,
            results: []
        }
    }

    const shows = await showsDB.getShowsByLocation(id);
    const results = outputConverters.createShowsList(shows);
    const response = {
        count,
        results
    }
    return response;
}

async function getShowById(id) {
    const show = await showsDB.getShowById(id);
    const response = outputConverters.createShowObject(show);
    return response;
}

async function postShow(data) {
    const safeData = sanitizer.healShow(data);
    const params = convertToParams(safeData);

    const showResponse = await showsDB.insertShow(params);
    const showId = showResponse.insertId;
    const bandIds = safeData.bands;
    for (let bandId of bandIds) {
        await showsHasBandsDB.insertShowHasBand([showId, bandId]);
    }

    const insertedShow = getShowById(showId);
    return insertedShow;
}

async function putShow(data) {
    const safeData = sanitizer.healShow(data);
    const params = convertToParams(safeData);

    const showResponse = await showsDB.updateShow(params);
    const showId = data.id;
    const bandIds = safeData.bands;
    for (let bandId of bandIds) {
        await showsHasBandsDB.insertShowHasBand([showId, bandId]);
    }

    const insertedShow = getShowById(showId);
    return insertedShow;
}


function convertToParams(show) {
    return [
        show.title || null,
        show.location_id || null,
        show.date || null,
        show.text || null,
        show.poster_filename || null,
        show.poster_alt || null,
        show.user_id || null,
        show.id || null
    ];
}

module.exports = {
    getShows,
    getShowsByLocation,
    getShowById,
    postShow,
    putShow
}