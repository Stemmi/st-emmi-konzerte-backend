const validator = require('validator');

function healShow(data) {
    try {
        const date = data.date ? validator.toDate(data.date) : null;
        const location_id = validator.toInt(data.location_id);
        const user_id = validator.toInt(data.user_id);
        return {
            title: text255(data.title) || null,
            location_id: location_id,
            date: validator.isDate(date) ? date : null,
            text: text255(data.text) || null,
            poster_filename: text255(data.poster_filename) || null,
            poster_alt: text255(data.poster_alt) || null,
            user_id: user_id
        }
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

function text255(text) {
    if (!text) return null;
    const trimmed = validator.trim(text);
    const escaped = validator.escape(trimmed);
    const limited = escaped.slice(0, 255);
    return limited;
}

module.exports = {
    healShow
}