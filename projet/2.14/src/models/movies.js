
const movies = [];

addOneMovie('Test', 100, 100000, "https://google.com");

function readAllMovies() {
    return [...movies];
}
 
function addOneMovie(title, duration, budget, link) {
    movies.push({
        title,
        duration,
        budget,
        link,
    });
}


export {readAllMovies, addOneMovie};