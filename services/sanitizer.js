const validator = require('validator');

function healShow(data) {
    const id = validator.toInt(data.id+'');
    const date = validator.toDate(data.date+'');
    const location_id = validator.toInt(data.location_id+'');
    const user_id = validator.toInt(data.user_id+'');
    const bands = data.bands ? data.bands.map((band) => validator.toInt(band+'')) : [];
    return {
        id: id,
        title: text255(data.title+'') || null,
        location_id: location_id,
        date: date,
        text: text255(data.text+'') || null,
        poster_filename: text255(data.poster_filename+'') || null,
        poster_alt: text255(data.poster_alt+'') || null,
        bands: bands,
        user_id: user_id
    }
}

function healLocation(data) {
    const lat = validator.toFloat(data.lat+'');
    const long = validator.toFloat(data.long+'');
    return {
        name: text255(data.name+'') || null,
        city: text255(data.city+'') || null,
        url: url255(data.url+'') || null,
        lat: lat,
        long: long
    }
}

function healBand(data) {
    return {
        name: text255(data.name+'') || null,
        url: url255(data.url+'') || null
    }
}

function text255(text) {
    if (!text) return null;
    const trimmed = validator.trim(text+'');
    // const cleaned = trimmed.replace(/([\/|\\]|"|&|´|`|{|}|<|>|')/g, "");
    const cleaned = trimmed;
    // const escaped = validator.escape(cleaned);
    const escaped = cleaned;

    const limited = escaped.slice(0, 255);
    return limited;
}

function url255(text) {
    if (!text) return null;
    const trimmed = validator.trim(text);
    const limited = trimmed.slice(0, 255);
    if (!validator.isURL(limited)) return null;
    return limited;
}

module.exports = {
    healShow,
    healLocation,
    healBand
}