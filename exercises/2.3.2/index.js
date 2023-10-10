const divs = document.querySelectorAll(".color-div");

divs.forEach((div) => {
  div.addEventListener("click", (e) => {
        const target = e.target;
    if(target.innerText === ""){
        target.style.width = "100px";
        target.style.height = "100px";
        target.innerText = target.style.backgroundColor;
    }else{
        target.style.width = "50px";
        target.style.height = "50px";
        target.innerText = "";
    }

        
    });
});