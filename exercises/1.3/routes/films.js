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

router.get('/:id', (req, res) =>{
    const id = req?.params?.id ? req.params.id: undefined;

    console.log(`id : ${id}`);
    let indexOfMoviesFound;
    if(id)
        indexOfMoviesFound = MOVIES.findIndex((movie) => movie.id == id);
    
    if (indexOfMoviesFound < 0) return res.sendStatus(404);

    res.json(MOVIES[indexOfMoviesFound]);
})


router.get("/", (req, res) => {
    const orderByMinumDuration = req?.query?.["minimum-duration"] 
    ? req.query["minimum-duration"] 
    : undefined;

    let orderedMovies;

    if(typeof orderByMinumDuration === Number 
        && orderByMinumDuration > 0) 

        orderByMinumDuration = parseInt(orderByMinumDuration);

        orderedMovies = [...MOVIES].filter( (obj) => {
            return obj.duration >= orderByMinumDuration;
        }
    );

    console.log(orderedMovies);
    res.json(orderedMovies.length != 0 ? orderedMovies : MOVIES);
});

router.post("/", (req, res) =>{
    const title = req?.body?.title?.length !==0 ? req.body.title : undefined;
    const duration = typeof req?.body?.duration !== Number 
                    &&  req.body.duration > 0 ? req.body.duration : undefined;
    const budget = typeof req?.body?.budget 
                    &&  req.body.budget > 0  ? req.body.budget : undefined;
    const link = req?.body?.link?.length !==0 ? req.body.link : undefined;

    if(!title || ! duration || !budget || !link)
        res.sendStatus(404);

    const lastMovieId = MOVIES?.length !== 0 ? MOVIES.length - 1 : undefined;
    const nextId = lastMovieId !== undefined ? MOVIES[lastMovieId]?.id + 1 : 1;

    const newMovie = {
        id: nextId,
        title: title,
        duration:  duration,
        budget: budget,
        link: link
    };
    
    MOVIES.push(newMovie);

    res.json(newMovie);
})






module.exports = router;