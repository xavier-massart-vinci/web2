
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
}


export default HomePage;
