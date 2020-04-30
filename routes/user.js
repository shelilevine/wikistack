const express = require("express");
const router = express.Router();

//import sequelize models
const {Page, User, db} = require('../models');

//view functions
// const addPage = require("../views/addPage");
const { addPage, editPage, main, userList, userPages, wikiPage } = require ('../views/index.js');



router.get('/', async (req, res, next) => {
  const allUsers = await User.findAll();
  const html = userList(allUsers);
  res.send(html);
})

router.get('/:id', async (req, res, next) => {

})





module.exports = router;
