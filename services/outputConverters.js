function createShowsList(shows, locations, users) {
    const showsList = shows.map(function (show) {         
        const location = locations.find(loc => loc.id === show.location_id);
        const user = users.find(usr => usr.id === show.user_id);
        return {
            id: show.id,
            title: show.title,
            location: {
                id: location.id,
                name: location.name,
                city: location.city
            },
            date: show.date,
            text: show.text,
            poster: {
                filename: show.poster_filename,
                alt: show.poster_alt
            },
            user: {
                id: user.id,
                name: user.name,
                image: user.image
            }
        }
    });
    return showsList;
}

function createShowObject(show, location, user) {
    const showObject = {
        id: show.id,
        title: show.title,
        date: show.date,
        location: {
            id: location.id,
            name: location.name,
            city: location.city,
            url: location.url,
            long: location.long,
            lat: location.lat
        },
        text: show.text,
        poster: {
            filename: show.poster_filename,
            alt: show.poster_alt
        },
        user: {
            id: user.id,
            name: user.name,
            image: user.image
        }
    };
    return showObject;
}

module.exports = {
    createShowsList,
    createShowObject
}