import Navigate from "../Router/Navigate";
import { addOneMovie } from "../../models/movies";

const AddMoviePage = () =>{
    renderMoviePage();
    addListenderForm();
}


function renderMoviePage(){
    const main = document.querySelector("main")
    main.innerHTML = `
    <div class= "mx-2 card">
        <form class="p-4">
            <div class="form-group mt-2">
                <label for="title">Title</label>
                <input type="text" minlength="1" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title" required>
            </div>


            <div class="form-group mt-2">
                <label for="duration">Duration</label>
                <input type="number" min="1" class="form-control" id="duration" aria-describedby="emailHelp" placeholder="Enter duration" required>
            </div>

            <div class="form-group mt-2">
                <label for="budget">Budget (in million)</label>
                <input type="number" min="1" class="form-control" id="budget" aria-describedby="emailHelp" placeholder="Enter budget" required>
            </div>


            <div class="form-group mt-2">
                <label for="link">Link</label>
                <input type="text" minlength="3" class="form-control" id="link" placeholder="Enter link" required>
            </div>


            <button type="submit" class="btn btn-primary mt-2">Ajouter</button>

        </form>
    </div>
    `;
}


function addListenderForm() {
    const form = document.querySelector("form");
    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        const title = document.querySelector("#title").value;
        const duration = document.querySelector("#duration").value;
        const budget = document.querySelector("#budget").value;
        const link = document.querySelector("#link").value;
        
        addOneMovie(title, duration, budget, link);


        Navigate('/viewMoviePage');
    });
}



export default AddMoviePage;