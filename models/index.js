const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});


//define models
const User = db.define('users', {
  name : {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});


const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});


//add relations
Page.belongsTo(User, { as: 'author' });


//add hooks
Page.beforeValidate((pageInstance, optionsObject) => {
  pageInstance.slug = createSlug(pageInstance.title);
})




//utility functions

//create slug function
function createSlug(postTitle) {
  // Removes all non-alphanumeric characters from title And make whitespace underscore
  return postTitle.replace(/\s+/g, '_').replace(/\W/g, '');
  // const space = ' ';
  // const specialChar = /[^A-Za-z0-9]/g;
  // //replace first parameter with the second
  // postTitle = postTitle.replace(space, '_');
  // postTitle = postTitle.replace(specialChar, '');
}



module.exports = {Page, User, db};
