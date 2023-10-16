const red = document.querySelector(".red");
const orange = document.querySelector(".orange");
const green = document.querySelector(".green");

function changeColorOf(elem, color) {
    elem.style.backgroundColor = color;
}

function setRed() {
    changeColorOf(red, "red");
    changeColorOf(orange, "white");
    changeColorOf(green, "white");
}

function setOrange() {
    changeColorOf(red, "white");
    changeColorOf(orange, "orange");
    changeColorOf(green, "white");
}

function setGreen() {
    changeColorOf(red, "white");
    changeColorOf(orange, "white");
    changeColorOf(green, "green");
}

const timeBeforeSwitch =  2 * 1000;
let index = 0;
let isGoingDown = true;

let intervalId = setInterval( () => {
   if(index === 0){
    setRed();
    isGoingDown = true; // go down;
   } 

   if(index === 1) setOrange();
    

   if(index === 2){
    setGreen();
    isGoingDown = false; // go up
   } 

   isGoingDown ? index++ : index--; 
   // index = index % 6; // when index = 6 -> 0
},timeBeforeSwitch);