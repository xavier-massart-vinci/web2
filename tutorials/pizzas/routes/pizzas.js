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

router.get('/', (req, res, next) => {
    console.log('GET /PIZZA');
    res.json(MENU);
})

module.exports = router;