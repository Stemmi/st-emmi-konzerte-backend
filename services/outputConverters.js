function createShowsList(shows) {
    const showsList = shows.map(function (show) {         
        return {
            id: show.id,
            title: show.title,
            location: {
                name: show.location_name,
                city: show.location_city
            },
            date: show.date,
            text: show.text,
            poster: {
                filename: show.poster_filename,
                alt: show.poster_alt
            },
            user: {
                name: show.user_name,
                image: show.user_image
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