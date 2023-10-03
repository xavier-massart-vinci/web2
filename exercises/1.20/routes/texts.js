const express = require('express');

const router = express.Router();

const {
  readAllTexts,
  readOneText,
  createOneText,
  removeOneText,
  updateOneText
} = require('../models/texts');

router.get('/', (req, res) => {
  const level = req?.query?.level ? req.query.level : undefined;
  res.json(readAllTexts(level));
});

router.get('/:id', (req, res) => {
  const id = req?.params?.id ? req.params.id : undefined;
  if(!id)
    res.sendStatus(400);

  const text =  readOneText(id);
  if(!text)
    res.sendStatus(404);

  res.json(text);
});

router.post('/', (req, res) =>{
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
  const level = req?.body?.level?.length !== 0  ? req.body.level : undefined;

  if(level !== "easy" && level !== "medium" && level !== "hard")
    return res.sendStatus(400);

  const text =  createOneText(content, level)

  if(!text)
    res.sendStatus(404);

  return res.json(text);
});


router.delete("/:id", (req, res) =>{
  const id = req?.params?.id ? req.params.id : undefined;

  if(!id)
    res.sendStatus(400);

  const text = removeOneText(id);
  if(!text)
    res.sendStatus(404);

  return res.json(text);
});



router.put("/:id", (req, res) =>{
  const id = req?.params?.id ? req.params.id : undefined;
  const content = req?.body?.content?.length > 0 ? req.body.content : undefined;
  const level = req?.body?.content?.level > 0 ? req.body.level : undefined;

  if(!id || !content || !level)
    res.sendStatus(400);

  const text = updateOneText(id, content, level);
  if(!text)
    return res.sendStatus(404);

    return res.json(text);

});


module.exports = router;
