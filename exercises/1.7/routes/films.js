var express = require("express");
const { serialize, parse } = require('../utils/json');
var router = express.Router();
const jsonDbPath = __dirname + '/../data/movies.json';


let MOVIES = [
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
  const id = req?.params?.id ? parseInt(req.params.id) : undefined;

  console.log(`id : ${id}`);
    if(id === undefined) // invalid param
      return res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);
  let indexOfMoviesFound = movies.findIndex((movie) => movie.id == id);

    // not found
  if (indexOfMoviesFound < 0) return res.sendStatus(404);

  res.json(movies[indexOfMoviesFound]);
});

router.get("/", (req, res) => {
  let orderByMinumDuration = req?.query?.["minimum-duration"]
    ? req.query["minimum-duration"]
    : undefined;

  const movies = parse(jsonDbPath, MOVIES);

  if(!orderByMinumDuration) return res.json(movies);
  if(typeof orderByMinumDuration === Number && orderByMinumDuration <= 0 )
    return res.sendStatus(400);

  const orderedMovies = [...movies].filter((obj) => {
    return obj.duration >= orderByMinumDuration;
  });
  


  res.json(orderedMovies);
});

router.post("/", (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration =
    typeof req?.body?.duration !== Number && req.body.duration > 0
      ? req.body.duration
      : undefined;
  const budget =
    typeof req?.body?.budget && req.body.budget > 0
      ? req.body.budget
      : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);
  const lastMovieId = movies?.length !== 0 ? movies.length - 1 : undefined;
  const nextId = lastMovieId !== undefined ? movies[lastMovieId]?.id + 1 : 1;

  const newMovie = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };

  movies.push(newMovie);

  serialize(jsonDbPath, movies);
    
  res.json(newMovie);
});



router.delete("/:id", (req, res) => {
  const id = req?.params?.id ? req.params.id : undefined;

  if(id === undefined) return res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);

  const indexOfDelete = movies.findIndex((movie) => movie.id == id);

  if(indexOfDelete < 0 ) return res.sendStatus(404);

  const elementDelete = movies.splice(indexOfDelete, 1);

  serialize(jsonDbPath, movies);

  res.json(elementDelete[0]);

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


  const indexFound = movies.findIndex((movie) => movie.id == req.params.id);

  if(indexFound < 0 ) return res.sendStatus(404);

  const updatedMovies = {...movies[indexFound], ...req.body};

  movies[indexFound] = updatedMovies;

  serialize(jsonDbPath, movies);

  res.json(movies[indexFound]);
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
    
  const indexFound = movies.findIndex((movie) => movie.id == req.params.id);

  //not current element exit whit this index let's create one
  if(indexFound < 0 ){
    if(!title || !duration || !budget || !link){
      return res.sendStatus(404);
    }
      
    const lastMovieId = movies?.length !== 0 ? movies.length - 1 : undefined;
    const nextId = lastMovieId !== undefined ? movies[lastMovieId]?.id + 1 : 1;


    const newMovie = {
      id:  parseInt(req.params.id),
      title: title,
      duration: parseInt(duration),
      budget: parseInt(budget),
      link: link,
    };
    movies[nextId] = newMovie;

    serialize(jsonDbPath, movies);

    return res.json(newMovie);
    
    
  } 
  
  const updatedMovies = {...MOVIES[indexFound], ...req.body};

  MOVIES[indexFound] = updatedMovies;

  res.json(MOVIES[indexFound]);

})


module.exports = router;
