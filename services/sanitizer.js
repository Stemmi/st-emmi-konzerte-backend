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

function validateShow(show) {
    const validation = {
        id: validateNumber(show.id),
        title: validatString(show.title),
        location_id: validateNumber(show.location_id),
        date: validateNumberArray(show.date.split('-')),
        text: validatString(show.text),
        poster_filename: validatString(show.poster_filename),
        poster_alt: validatString(show.poster_alt),
        bands: validateNumberArray(show.bands),
        user_id: validateNumber(show.user_id)
    }
    const passed = Object.values(validation).reduce((a, b) => a && b);
    
    return {
        passed,
        validation
    }
}

function validateNumber(num) {
    return !num || !isNaN(num);
}

function validateNumberArray(numArray) {
    return numArray.reduce((a, b) => validateNumber(a) && validateNumber(b));
}

function validatString(text) {
    if (text.length > 255) return false;
    else if (text.includes('<') || text.includes('>')) return false;
    else if (text.toLowerCase().includes('http')) return false;
    else return true;
}

module.exports = {
    healShow,
    healLocation,
    healBand,
    validateShow
}