const { v4: uuidv4 } = require('uuid');

const path = require('node:path');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/texts.json');

const defaultTexts = [

    {
        id: uuidv4(),
        content: "Le contenu du 0",
        level: "easy"
    },
    {
        id: uuidv4(),
        content: "Le contenu du 1",
        level: "medium"
    },
    {
        id: uuidv4(),
        content: "Le contenu du 2",
        level: "hard"
    }
];


function readAllTexts(level) {
    const texts = parse(jsonDbPath, defaultTexts);

    if(level !== undefined  ){
        return [...texts].filter( (a) => a.level === level)
    }
    
    return texts;
}

function readOneText(id) {

    const texts = parse(jsonDbPath, defaultTexts);


    const indexFound = texts.findIndex((currentText) => currentText.id === id);

    if(indexFound < 0 ) return undefined;

    return texts[indexFound];
}

function createOneText(content, level) {
    const id = uuidv4();
    const texts = parse(jsonDbPath, defaultTexts);
    const newText = {
        id,
        content,
        level
    }

    texts.push(newText);

    serialize(jsonDbPath, texts);

    return newText;
}

function removeOneText(id) {
   const texts = parse(jsonDbPath, defaultTexts);
   const indexFound = texts.findIndex((current) => current.id === id);
   if (indexFound < 0) return undefined;
   const deletedTexts = texts.splice(indexFound, 1);
  
   serialize(jsonDbPath, texts);
    
   return deletedTexts[0]
}


function updateOneText(id, content, level) {

    if(level !== "easy" && level !== "medium" && level !== "hard")
        return undefined;
    const texts = parse(jsonDbPath, defaultTexts);
    const indexFound = texts.findIndex((current) => current.id === id);
    if (indexFound < 0) return undefined;

    const textUpdated = {...texts[indexFound], content, level}; /// pas sur regarde ici si erreur 

    texts[indexFound] = textUpdated;

    serialize(texts, defaultTexts);

    return  textUpdated;
}



module.exports = {
    readAllTexts,
    readOneText,
    createOneText,
    removeOneText,
    updateOneText
};