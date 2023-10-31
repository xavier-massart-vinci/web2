import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import oppenheimer from './img/oppenheimer.png';
import interstellar from './img/interstellar.png';




const homeContent = `
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
</div>`;

const main = document.querySelector("main");

main.innerHTML = homeContent;
