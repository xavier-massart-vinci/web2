var express = require('express');
var router = express.Router();

let MENU = [
    {
        id: 1,
        title: 'Alpage',
        content: 'contenu de la pizza'
    },
    {
        id: 2,
        title: 'Alpage1',
        content: 'contenu de la pizza'
    },
    {
        id: 3,
        title: 'Alpage2',
        content: 'contenu de la pizza'
    },
    {
        id: 4,
        title: 'Alpage3',
        content: 'contenu de la pizza'
    },
    {
        id: 5,
        title: 'Alpage4',
        content: 'contenu de la pizza'
    },
];


// GET /pizzas/id

router.get('/:id', (req, res, next) =>{
    console.log(`GET /pizzas/${req.params.id}`);//req.params.id permes de lire le parametre 

    const indexOfPizzaFound = MENU.findIndex((pizza) => pizza.id == req.params.id); //iter sur notre tableau et retourn l'index de la pizza (id)

    if(indexOfPizzaFound < 0) return res.sendStatus(404);

    res.json(MENU[indexOfPizzaFound]);
})


/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
    const orderByTitle =
      req?.query?.order?.includes('title') // si il y a query et order et contiend titre alors orderByTitle = req.query.order sinon undefined
        ? req.query.order
        : undefined;
    let orderedMenu;
    console.log(`order by ${orderByTitle ?? 'not requested'}`); // ?? si null ou undefined 'not requested' sinon orderByTitle
    if (orderByTitle)
      orderedMenu = [...MENU].sort((a, b) => a.title.localeCompare(b.title));//shadowcopy
    if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();
  
    console.log('GET /pizzas');
    res.json(orderedMenu ?? MENU);
  });


// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
  
    console.log('POST /pizzas');
  
    if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'
  
    const lastItemIndex = MENU?.length !== 0 ? MENU.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? MENU[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;
  
    const newPizza = {
      id: nextId,
      title: title,
      content: content,
    };
  
    MENU.push(newPizza);
  
    res.json(newPizza);
  });


module.exports = router;