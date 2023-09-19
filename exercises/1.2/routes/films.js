var express = require('express');
var router = express.Router();

let MOVIES = [
    {
        id: 0,
        title: "Interstellar",
        duration:  169,
        budget: 1000000,
        link: "https://www.imdb.com/title/tt0816692/"
    },
    {
        id: 1,
        title: "Inception",
        duration:  148,
        budget: 1800000,
        link: "https://www.imdb.com/title/tt1375666/"
    },
    {
        id: 2,
        title: "American Psycho",
        duration:  181,
        budget: 1500000,
        link: "https://www.imdb.com/title/tt0144084/"
    },
];



router.get("/", (req, res, next) => {
    res.send(MOVIES);
});



module.exports = router;