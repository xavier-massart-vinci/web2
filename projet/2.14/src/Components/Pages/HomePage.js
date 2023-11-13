
import anime from 'animejs/lib/anime.es';
import { clearPage } from '../../utils/render';
import oppenheimer from '../../img/oppenheimer.png';
import interstellar from '../../img/interstellar.png';

const HomePage = () => {
  clearPage();
  renderHomePage();
};


function renderHomePage() {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container text-center">
  <div class="row mb-4">
      <div class="col">
      <h3>myMovies</h3>

      </div>
  </div>

  <div class="row">
      <div class="movie col-12 col-lg-6">
      <img class="img-thumbnail" src="${oppenheimer}" alt="Oppenheimer" />
      <span>Oppenheimer</span>
      </div>

      <div class="movie col-12 col-lg-6">
      <img class="img-thumbnail" src="${interstellar}" alt="Interstellar" />
      <span>Interstellar</span>
      </div>
  </div>
  <button type="button" class="btn btn-primary">About</button>
</div>`;

  anime({
    targets: 'h3',
    rotate: {
      value: 360,
      duration: 1800,
      easing: 'easeInOutSine'
    },
    scale: {
      value: 2,
      duration: 1600,
      delay: 800,
      easing: 'easeInOutQuart'
    },
    delay: 250
  });


  const movies = document.querySelectorAll('.movie');
  for (let i = 0; i < movies.length; i+=1) {
    movies[i].style.opacity = '0';
  }

  anime({
    targets: '.movie',
    opacity: 1,
    scale: {
      value: 0.75
    },
    duration: 2000, 
    easing: 'linear', 
});
    
  
}


export default HomePage;
