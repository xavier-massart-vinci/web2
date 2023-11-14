const HomePage = () => {
  fetch('https://v2.jokeapi.dev/joke/Any?type=single')
  .then((response =>{
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    return response.json();
  })).then((joke) => {
    renderMain(joke.joke, joke.category)
  })
  
};


function renderMain(joke, category) {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container row">
    <div class="col-2">Categoty:</div>
    <div class="col">${category}</div>
  </div>
  <div class="container row">
    <div class="col-2">Joke:</div>
    <div class="col">${joke}</div>
  </div>`;
  
}

export default HomePage;
