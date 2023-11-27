// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';

const STORE_THEME = "theme";

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">myMovies</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#" data-uri="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/movies">View movies</a>
              </li> 
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/movies/add">Add movies</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/about">About</a>
              </li>                       
            </ul>
            Theme dark: <input type="checkbox" id="toggle-one">
          </div>
          
        </div>
      </nav>
  `;
  navbarWrapper.innerHTML = navbar;

  const body = document.querySelector("main");
const checkbox = document.querySelector("#toggle-one");

  if( localStorage.getItem(STORE_THEME) === "dark"){
    body.classList.add("dark");
    checkbox.checked = true;
  }


  checkbox.addEventListener('click', () => {

    const gettedTheme = localStorage.getItem(STORE_THEME);

    if(gettedTheme === "dark"){
      localStorage.setItem(STORE_THEME, 'ligth');
      body.classList.remove("dark");
    }else{
      localStorage.setItem(STORE_THEME, 'dark');
      body.classList.add("dark");
    }

  

  });



};

export default Navbar;
