const express = require("express");

const router = express.Router();
const {
  readOneMovie,
  readAllMovies,
  createOneMovie,
  removeOneMovie,
  updateOneMovie

} = require('../models/films');




router.get("/:id", (req, res) => {
  const id = req?.params?.id ? parseInt(req.params.id, 10) : undefined;
    if(id === undefined)
      return res.sendStatus(400);

    const foundMovie = readOneMovie(req?.params?.id)
    
    if(!foundMovie)
      return res.sendStatus(404);

  return res.json(foundMovie);
});

router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query
    ? parseInt(req.query['minimum-duration'], 10)
    : undefined;


  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.sendStatus(400);


  return res.json(readAllMovies(minimumFilmDuration));
});

router.post("/", (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration > 0
      ? req.body.duration
      : undefined;

  const budget = req?.body?.budget > 0
      ? req.body.budget
      : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) 
    return res.sendStatus(400);

  const movie = createOneMovie(title, duration, budget, link);
    
  return res.json(movie);
});



router.delete("/:id", (req, res) => {
  const id = req?.params?.id ? parseInt(req.params.id, 10) : undefined;

  if(id === undefined) return res.sendStatus(400);

  const movie = removeOneMovie(id);

  if(!movie) return res.sendStatus(404);

  return res.json(movie);

});


router.patch('/:id', (req, res) => {

  const title = req?.body?.title ? req.body.title : undefined;
  const duration = req?.body?.duration  ? req.body.duration : undefined;
  const budget = req?.body?.budget ? req.body.budget : undefined;
  const link = req?.body?.link ? req.body.link : undefined;


  if( !title && !duration && !budget && !link 
      || title?.length === 0 || duration <= 0 
      || budget <= 0 || link?.length === 0){ // ici ci title est undefined alors === a 0 donc on retire
        return res.sendStatus(400);
      }
    
  const movie = updateOneMovie(req.params.id, req.body)
  if(!movie) return res.sendStatus(404);

  return res.json(movie);
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

  const movies = updateOneMovie(req.params.id, req.body);
    

  if(!movies){
    if(!title || !duration || !budget || !link){
      return res.sendStatus(404);
    }

    return res.json(createOneMovie(title, duration, budget, link));
    
  } 

  return res.json(movies);

})


module.exports = router;
