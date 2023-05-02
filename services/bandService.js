const bandsDB = require("../database/bandsDB.js");

async function getBands() {
    try {
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
    } catch (error) {
        throw error;
    }
}

async function getBandById(id) {
    try {
        const band = await bandsDB.getBandById(id);

        const response = {
            id: band.id,
            name: band.name,
            url: band.url
        }

        return response;
    } catch (error) {
        throw error;
    }
}

async function getBandsByShowId(showId) {
    try {
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
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getBands,
    getBandById,
    getBandsByShowId
}