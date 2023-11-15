

const HomePage = () => {
  fetch('http://localhost:3000/questions')
  .then( (response) => {
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    return response.json();
  }).then( (q) =>{
    renderMain(q);
  })
};


function renderMain(questions) {
  const main = document.querySelector('main');
  let text = '';
  let questionId = 0;
  questions.forEach(q => {
    text += `<h4>${q.question}</h4>`;
    text += `<form class="${questionId}">`;

    let answerId = 0;
    q.answers.forEach( (answer) =>{
      text += `${answer.text} : <input type="radio" name="${questionId}" value="${answerId}"/><br >`
      answerId += 1;
    });
    text += `<input type="submit" name="${questionId}" value="valider"/>`;
    text += "</form>";

    
    questionId += 1;
   
  });
  main.innerHTML += text;
  addAllEventListener(questions);
}

function addAllEventListener(questions) {

let score = 0;
  const allFroms = document.querySelectorAll('form');
    allFroms.forEach( (form) =>{
      form.addEventListener('submit', (e) =>{
        e.preventDefault();
        const questionId = e.target.classList.value;
        const radios = form.querySelectorAll(`input`);
        
        radios.forEach( (radio) =>{
          if(radio.checked){
            if(questions[questionId].answers[radio.value].isCorrect){
              score += 1;
              console.log(score);
            }
          }
        })
      });
  });
  
}





















// function renderMain(questions) {
//   const main = document.querySelector('main');
//   let text = '';

//   const size = questions.length;
//   for (let i = 0; i < size; i+=1) {
//     text += `<div class="container"><h2>${questions[i].question}</h2>
//     <form class="${i}">`;

//     for (let j = 0; j < questions[i].answers.length; j+=1) {
//       const elem = questions[i].answers[j].text;
//       text += `
//       <input type="radio" name="${i}" id="radio-${i}" value="${elem}"> ${elem}<br>`;
//     }
//     text += `
//     <input type="submit" value="Submit" class="btn-${i}">
//     </form>
//     </div>`;
//     main.innerHTML += text;
//   }
//   const allFroms = document.querySelectorAll('form');
//   allFroms.forEach( (form) =>{
//     form.addEventListener('submit', (e) =>{
//       e.preventDefault();

//       const ratio = document.querySelectorAll(`#radio-${form.classList.value}`);
//       ratio.forEach( (elem) =>{
//         console.log(elem);
//       })
//       console.log(ratio.value);
//       console.log(questions[form.classList.value]);
//       console.log(questions[form.classList.value].answers);
//       console.log(questions[form.classList.value].answers[ratio.value]);
//       if(questions[form.classList.value].answers[ratio.value].isCorrect === true){
//         console.log('bonne reponse');
//       }else{
//         console.log('mauvaise reponse');
//       }
    
//       console.log(`You have choise ${ratio.value}`);
//     })

//   })
 
// }




export default HomePage;
