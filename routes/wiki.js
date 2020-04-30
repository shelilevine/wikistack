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
  try {
  //create new author instance
    const [author, isNewAuthor] = await User.findOrCreate({
      where : {
        name : req.body.authorName,
        email : req.body.authorEmail
      }
    })



    //create new page instance
    const page = new Page({
      title : req.body.title,
      content : req.body.content,
      // authorId : author.id,
      status : req.body.status
    })

    //alt
    //const page = await Page.create(req.body);


    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise.

    //save new page instance
    await page.save();
    //set author id of the page to the id of the author
    page.setAuthor(author);

    console.log(page.dataValues);
    console.log(page);
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
    //get author
    const author = await pageWiki.getAuthor();

    //return formatted wikipage
    res.send(wikiPage(pageWiki, author));

  } catch(err) {
    next(err);
  }
})





module.exports = router;
