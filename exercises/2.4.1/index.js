const btn = document.querySelector("button");

let timedoutId;
const delay = 5 * 1000;

let countClick = 0;
let startTime = 0;

btn.addEventListener("mouseover", () =>{
    timedoutId = 0;
    countClick = 0;
    startTime = new Date(); 
    timedoutId = setTimeout(() => {
        alert("Game over, you did not click 10 times within 5s !");
    }, delay);

});


btn.addEventListener("click", () =>{
    countClick++;
    if(countClick === 10){
        const timeTakeToClick = new Date().valueOf() - startTime.valueOf(); // get difference beetwen new and started timer
        alert(`You win ! You clicked 10 times within ${timeTakeToClick} ms`);
        clearTimeout(timedoutId);
    }
})
