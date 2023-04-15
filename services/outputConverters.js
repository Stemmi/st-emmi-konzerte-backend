function createShowsList(shows, locations) {
    const showsList = shows.map(function (show) {         
        const location = locations.find(loc => loc.id === show.location_id);
        return {
            id: show.id,
            title: show.title,
            location: {
                name: location.name,
                city: location.city
            },
            date: show.date,
            text: show.text,
            poster: {
                filename: show.poster_filename,
                alt: show.poster_alt
            },
            userId: show.user_id
        }
    });
    return showsList;
}

function createShowObject(show, location) {
    const showObject = {
        id: show.id,
        title: show.title,
        location: {
            name: location.name,
            city: location.city,
            long: location.long,
            lat: location.lat
        },
        date: show.date,
        text: show.text,
        poster: {
            filename: show.poster_filename,
            alt: show.poster_alt
        },
        userId: show.user_id
    };
    return showObject;
}

module.exports = {
    createShowsList,
    createShowObject
}