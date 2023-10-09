let clickCount = 0;


const counterContent = document.querySelector("#counterContent");
const messageBox =  document.querySelector("#messageBox");

//initialiser le compteur de click
counterContent.innerText = clickCount;

window.addEventListener('click', () =>{
    clickCount++;

    counterContent.innerText = clickCount;

    if(clickCount >= 5 && clickCount <= 9){
        messageBox.innerText = "Bravo, bel échauffement !";
    }
    if(clickCount >= 10){
        messageBox.innerText = "Vous êtes passé maître en l'art du clic !";
    }
})