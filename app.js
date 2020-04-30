const express = require("express")
const morgan = require("morgan");
const app = express();
//import sequelize models
const models = require('./models');

//import routes for user and wiki pages
const userRouter = require('./routes/user.js');
const wikiRouter = require('./routes/wiki.js');

//view functions
const layout = require("./views/layout");

//add middleware and static files
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));




//define routes
app.use('/wiki', wikiRouter);

app.use('/user', userRouter);


app.get('/', (req, res, next) => {
    res.redirect('/wiki')
})


// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })


const PORT = 3000;

const init = async () => {
    // this drops all tables then recreates them based on our JS definitions
    await models.db.sync({force: true})
    app.listen(PORT, () => {console.log('Listening in port 3000')})
}

init();



