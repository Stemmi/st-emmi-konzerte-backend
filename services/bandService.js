const bandsDB = require("../database/bandsDB.js");
const sanitizer = require("../services/sanitizer.js");

async function getBands() {
    const count = await bandsDB.countBands();
    const bands = await bandsDB.getBands();

    const results = bands.map(function(band) {
        return {
            id: band.id,
            name: band.name,
            url: band.url
        }
    });
    const response = {
        count,
        results
    }
    
    return response;
}

async function getBandById(id) {
    const band = await bandsDB.getBandById(id);

    const response = {
        id: band.id,
        name: band.name,
        url: band.url
    }

    return response;
}

async function getBandsByShowId(showId) {
    const bands = await bandsDB.getBandsByShowId(showId);

    const results = bands.map(function(band) {
        return {
            id: band.id,
            name: band.name,
            url: band.url
        }
    });
    const response = {
        results
    }
    return response;
}

async function postBand(data) {
    const safeData = sanitizer.healBand(data);
    const params = convertToParams(safeData);
    const response = await bandsDB.insertBand(params);
    const insertedBand = getBandById(response.insertId);
    return insertedBand;
}

function convertToParams(band) {
    return [
        band.name || null,
        band.url || null
    ];
}

module.exports = {
    getBands,
    getBandById,
    getBandsByShowId,
    postBand
}