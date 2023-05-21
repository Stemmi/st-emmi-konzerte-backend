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

function createShowObject(show) {
    const showObject = {
        id: show.id,
        title: show.title,
        date: show.date,
        location: {
            name: show.location_name,
            city: show.location_city,
            url: show.location_url,
            long: show.location_long,
            lat: show.location_lat
        },
        text: show.text,
        poster: {
            filename: show.poster_filename,
            alt: show.poster_alt
        },
        user: {
            name: show.user_name,
            image: show.user_image
        }
    };
    return showObject;
}

module.exports = {
    createShowsList,
    createShowObject
}