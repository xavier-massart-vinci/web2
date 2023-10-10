
let form = document.querySelector("form");
const btnForm = document.querySelector(".submit");
const wish = document.querySelector(".wish");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = "none";
    const message = document.querySelector("#wish");

    wish.innerHTML = `<span>${message.value}</span>`;

});

