const express = require("express");
const path = require('node:path');

const { serialize, parse } = require('../utils/json');

const router = express.Router();



const jsonDbPath = path.join('/../data/movies.json' );


const MOVIES = [
  {
    id: 0,
    title: "Interstellar",
    duration: 169,
    budget: 1000000,
    link: "https://www.imdb.com/title/tt0816692/",
  },
  {
    id: 1,
    title: "Inception",
    duration: 148,
    budget: 1800000,
    link: "https://www.imdb.com/title/tt1375666/",
  },
  {
    id: 2,
    title: "American Psycho",
    duration: 181,
    budget: 1500000,
    link: "https://www.imdb.com/title/tt0144084/",
  },
];

router.get("/:id", (req, res) => {
  const id = req?.params?.id ? parseInt(req.params.id, 10) : undefined;

  // console.log(`id : ${id}`);
    if(id === undefined) // invalid param
      return res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);
  const indexOfMoviesFound = movies.findIndex((movie) => movie.id === id);

    // not found
  if (indexOfMoviesFound < 0) return res.sendStatus(404);

  return res.json(movies[indexOfMoviesFound]);
});

router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query
    ? parseInt(req.query['minimum-duration'], 10)
    : undefined;
  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.sendStatus(400);

  const films = parse(jsonDbPath, MOVIES);

  if (!minimumFilmDuration) return res.json(films);

  const filmsReachingMinimumDuration = films.filter(
    (film) => film.duration >= minimumFilmDuration
  );
  return res.json(filmsReachingMinimumDuration);
});

router.post("/", (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req.body.duration > 0
      ? req.body.duration
      : undefined;

  const budget = req.body.budget > 0
      ? req.body.budget
      : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);
  const lastMovieId = movies?.length !== 0 ? movies.length - 1 : undefined;
  const nextId = lastMovieId !== undefined && movies[lastMovieId]?.id ? movies[lastMovieId].id + 1 : 1;

  const newMovie = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  movies.push(newMovie);

  serialize(jsonDbPath, movies);
    
  res.json(newMovie);
});



router.delete("/:id", (req, res) => {
  const id = req?.params?.id ? parseInt(req.params.id, 10) : undefined;

  if(id === undefined) return res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);

  const indexOfDelete = movies.findIndex((movie) =>movie.id ===  Number(id));

  if(indexOfDelete < 0 ) return res.sendStatus(404);

  const elementDelete = movies.splice(indexOfDelete, 1);

  serialize(jsonDbPath, movies);

  return res.json(elementDelete[0]);

});


router.patch('/:id', (req, res) => {

  const title = req?.body?.title ? req.body.title : undefined;
  const duration = req?.body?.duration  ? req.body.duration : undefined;
  const budget = req?.body?.budget ? req.body.budget : undefined;
  const link = req?.body?.link ? req.body.link : undefined;


  if( !title && !duration && !budget && !link 
      || title?.length === 0 || duration <= 0 
      || budget <= 0 || link?.length === 0){ // ici ci title est undefined alors === a 0 doncon retire
        return res.sendStatus(400);
      }
      
  const movies = parse(jsonDbPath, MOVIES);


  const indexFound = movies.findIndex((movie) => movie.id === Number(req.params.id));

  if(indexFound < 0 ) return res.sendStatus(404);

  const updatedMovies = {...movies[indexFound], ...req.body};

  movies[indexFound] = updatedMovies;

  serialize(jsonDbPath, movies);

  return res.json(movies[indexFound]);
});


router.put("/:id", (req, res) =>{
  const title = req?.body?.title ? req.body.title : undefined;
  const duration = req?.body?.duration  ? req.body.duration : undefined;
  const budget = req?.body?.budget ? req.body.budget : undefined;
  const link = req?.body?.link ? req.body.link : undefined;


  if( !title && !duration && !budget && !link 
      || title?.length === 0 || duration <= 0 
      || budget <= 0 || link?.length === 0){ 
        return res.sendStatus(400);
      }

  const movies = parse(jsonDbPath, MOVIES);
    
  const indexFound = movies.findIndex((movie) => movie.id === Number(req.params.id));

  if(indexFound < 0 ){
    if(!title || !duration || !budget || !link){
      return res.sendStatus(404);
    }
      
    const lastMovieId = movies?.length !== 0 ? movies.length - 1 : undefined;
    const nextId = lastMovieId !== undefined && movies[lastMovieId]?.id ? movies[lastMovieId].id + 1 : 1;


    const newMovie = {
      id:  parseInt(req.params.id, 10),
      title,
      duration: parseInt(duration, 10),
      budget: parseInt(budget, 10),
      link,
    };
    movies[nextId] = newMovie;

    serialize(jsonDbPath, movies);

    return res.json(newMovie);
    
    
  } 
  
  const updatedMovies = {...MOVIES[indexFound], ...req.body};

  MOVIES[indexFound] = updatedMovies;

  return res.json(MOVIES[indexFound]);

})


module.exports = router;
