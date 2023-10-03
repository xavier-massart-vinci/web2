const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

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


  function readOneMovie(id) {
    const currentId = parseInt(id, 10);
    const movies = parse(jsonDbPath, MOVIES);
    const indexOfMoviesFound = movies.findIndex((movie) => movie.id === currentId);
  
    return movies[indexOfMoviesFound];
  }
    
  function readAllMovies(minimumFilmDuration) {
    const movies = parse(jsonDbPath, MOVIES);

    if (!minimumFilmDuration) return movies;

    const filmsReachingMinimumDuration = movies.filter(
        (movie) => movie.duration >= minimumFilmDuration
    );

    return filmsReachingMinimumDuration;
  }

  function createOneMovie(titre, duration, budget, link){

    const movies = parse(jsonDbPath, MOVIES);
    const lastMovieId = movies?.length !== 0 ? movies.length - 1 : undefined;
    const nextId = lastMovieId !== undefined && movies[lastMovieId]?.id ? movies[lastMovieId].id + 1 : 1;
  
    const newMovie = {
      id: nextId,
      title: titre,
      duration,
      budget,
      link,
    };
  
    movies.push(newMovie);
  
    serialize(jsonDbPath, movies);

    return newMovie;
  }

  function removeOneMovie(movieId) {
    const movies = parse(jsonDbPath, MOVIES);

    const indexOfDelete = movies.findIndex((movie) =>movie.id ===  Number(movieId));

    if(indexOfDelete < 0 ) return undefined;

    const elementDelete = movies.splice(indexOfDelete, 1);

    serialize(jsonDbPath, movies);

    return elementDelete[0];
    
  }

  function updateOneMovie(id, body) {
    const movies = parse(jsonDbPath, MOVIES);
    
    const indexFound = movies.findIndex((movie) => movie.id === Number(id));

    if(indexFound < 0 ) return undefined;
    const updatedMovies = {...movies[indexFound], ...body};

    movies[indexFound] = updatedMovies;
  
    serialize(jsonDbPath, movies);

    return updatedMovies;
  }


module.exports = {
    readOneMovie,
    readAllMovies,
    createOneMovie,
    removeOneMovie,
    updateOneMovie
};