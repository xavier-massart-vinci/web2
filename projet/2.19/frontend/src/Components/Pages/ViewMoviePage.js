import { readAllMovies, removeOneMovie, updateOneMovie } from '../../models/movies';

const  ViewMoviePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '<div id="movieWrapper"></div>';

  const movieWrapper = document.querySelector('#movieWrapper');

  
  const moviesAsHtmlTable = getHtmlMovieTableAsString(await readAllMovies());

  movieWrapper.innerHTML = moviesAsHtmlTable;

  const btnRemove =  document.querySelectorAll('.remove');

  btnRemove.forEach(btn => {
    btn.addEventListener('click' , async (e) =>{
      e.preventDefault();
      if( await removeOneMovie(btn.getAttribute('data-id')) !== undefined)
        ViewMoviePage(); 
    })
  });

  const btnSave =  document.querySelectorAll('.save');
  btnSave.forEach(btn => {
    btn.addEventListener('click' , async (e) =>{
      e.preventDefault();


      const tr = e.target.parentElement.parentElement;
      const movie = {
        title: tr.children[0].textContent,
        link: tr.children[1].textContent,
        duration: tr.children[2].textContent,
        budget: tr.children[3].textContent

      }
      if(await updateOneMovie(btn.getAttribute('data-id'), movie) !== undefined){
        ViewMoviePage(); 
      };

      
    })
  });
  
};

function getHtmlMovieTableAsString(movies) {
  if (movies?.length === undefined || movies.length === 0) {
    return '<p class="p-5">No movies yet : (</p>';
  }

  let htmlMovieTable = `<div class="table-responsive p-5">
  <table class="table">
<thead>
  <tr>
    <th scope="col">Title</th>
    <th scope="col">Lien</th>
    <th scope="col">Duration (min)</th>
    <th scope="col">Budget (million)</th>    
  </tr>
</thead>
<tbody>`;

  movies.forEach((element) => {
    htmlMovieTable += `
    <tr>
      <td class="fw-bold text-info" contenteditable="true">${element.title}</td>
      <td class="fw-bold text-info" contenteditable="true">${element.link}</td>
      <td class="fw-bold text-info" contenteditable="true">${element.duration}</td>
      <td class="fw-bold text-info" contenteditable="true">${element.budget}</td>
      <td><button class="btn button bg-primary remove" data-id="${element.id}">Retirer</button></td>
      <td><button class="btn button bg-primary save" data-id="${element.id}">Enregister</button></td>
    </tr>
    `;
  });

  htmlMovieTable += '</tbody></table>';


  return htmlMovieTable;
}

export default ViewMoviePage;
