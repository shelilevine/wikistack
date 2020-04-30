const express = require("express")
const morgan = require("morgan"); 
const app = express(); 
const layout = require("./views/layout"); 


app.use(morgan("dev")); 

app.use(express.static(__dirname + "/public")); 

app.use(express.urlencoded({extended: false})); 

app.get('/', (req, res, next) => {
    console.log('hello world!'); 
    res.send(layout('')); 
})

const PORT = 3000; 

app.listen(PORT, () => {console.log('Listening in port 3000')})