import { readAllMovies } from "../../models/movies";

const ViewMoviePage = () =>{
    renderViewMoviePage();
}


function renderViewMoviePage() {
    const main = document.querySelector("main");
    const movies = readAllMovies();

    main.innerHTML = `
    <table class="table">
        <thead>
            <tr>
            <th scope="col">Title</th>
            <th scope="col">Duration (min)</th>
            <th scope="col">Budget (million)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Oppen</th>
                <td>2000</td>
                <td>888</td>
            </tr>
        </tbody>
    </table>`;

    const tbody = document.querySelector("tbody");
    let list = '';
    movies.forEach( (elem) => {
        
        list += ` 
            <tr>
                <th><a href="${elem.link}">${elem.title}</a></th>
                <td>${elem.duration}</td>
                <td>${elem.budget}</td>
            </tr>`;
        
    });

    tbody.innerHTML = list;
    
}

export default ViewMoviePage;