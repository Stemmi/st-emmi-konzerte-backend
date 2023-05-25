const bandsDB = require("../database/bandsDB.js");

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

module.exports = {
    getBands,
    getBandById,
    getBandsByShowId
}