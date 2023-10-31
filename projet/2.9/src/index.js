import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import oppenheimer from './img/oppenheimer.png';
import interstellar from './img/interstellar.png';


const main = document.querySelector('main');

renderHomePage();






let isDisplayAbout = false;
function addListerOnButton() {
    const button = document.querySelector('button');
    if(isDisplayAbout){
        button.addEventListener('click', renderHomePage);
        
    }else{
        button.addEventListener('click', renderAboutPage);
        
    }
 
}
function renderHomePage() {
  const homePage = `
  <div class="container text-center">
  <div class="row mb-4">
      <div class="col">
      <h3>myMovies</h3>

      </div>
  </div>

  <div class="row">
      <div class="col-12 col-lg-6">
      <img class="img-thumbnail" src="${oppenheimer}" alt="Oppenheimer" />
      <span>Oppenheimer</span>
      </div>

      <div class="col-12 col-lg-6">
      <img class="img-thumbnail" src="${interstellar}" alt="Interstellar" />
      <span>Interstellar</span>
      </div>
  </div>
  <button type="button" class="btn btn-primary">About</button>
</div>`;

  main.innerHTML = homePage;
  isDisplayAbout = false;
  addListerOnButton();
  
}

function renderAboutPage() {
  const aboutPage = `
  <div class="container text-center">
    <h2 class="text-center">Made By Xavier M</h2>
    <div class="row">
        <div class="col text-center">Using Bootstrap</div>
        <div class="col text-center">Using WebPack</div>
    </div>
    <div class="row">
        <div class="col text-center">Using EsLint</div>
        <div class="col text-center">using Prettier</div>
    </div>
    <div class="row">
        <p class="text-center">And other packages</p> 
    </div> 
    <button type="button" class="btn btn-dark">Back</button>
              
  </div>`;
  main.innerHTML = aboutPage;
  isDisplayAbout = true;
  addListerOnButton();
  
}


 




