const express = require("express");
const router = express.Router();

//import sequelize models
const {Page, User, db} = require('../models');

//view functions
// const addPage = require("../views/addPage");
const { addPage, editPage, main, userList, userPages, wikiPage } = require ('../views/index.js');



//define /wiki routes
router.get('/', async (req, res, next) => {
  const allPages = await Page.findAll();
  const html = main(allPages);
  res.send(html);
});

router.post('/', async (req, res, next) => {
  // res.json(req.body) //sends the body of the requests in json format

  //create new page instance
  const page = new Page({
    title : req.body.title,
    content : req.body.content
  })

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {

    await page.save();
    console.log(page.dataValues);
    res.redirect(`/wiki/${page.slug}`);

  } catch(err) {
    next(err);
  }


});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});


router.get('/:slug', async (req, res, next) => {
  try {
    //query for page with slug = slug
    const pageWiki = await Page.findOne({
      where : {
        slug : req.params.slug
      }
    });
    //return formatted wikipage
    res.send(wikiPage(pageWiki));

  } catch(err) {
    next(err);
  }





  res.send(`This is the route for ${slug}`);
})












module.exports = router;
