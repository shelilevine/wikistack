const express = require("express");
const router = express.Router();

//import sequelize models
const {Page, User, db} = require('../models');

//view functions
// const addPage = require("../views/addPage");
const { addPage, editPage, main, userList, userPages, wikiPage } = require ('../views/index.js');



router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    const html = userList(allUsers);
    res.send(html);
    } catch(err) {
      next(err);
    }
})

router.get('/:id', async (req, res, next) => {
  try{
    //get user with given id
    const user = await User.findByPk(req.params.id);

    //get all pages written by user
    const pages = await Page.findAll({
      where : {
        authorId : req.params.id
      }
    });

    //render the user's pages in html and send back
    const html = userPages(user, pages);
    res.send(html);

  } catch(err) {
    next(err);
  }



  // })

})





module.exports = router;
