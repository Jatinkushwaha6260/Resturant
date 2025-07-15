const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

// Middleware Function 
const logRequest = (req , res , next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next(); // move on to the next phase
}
app.use(logRequest);


app.use(passport.initialize());

 const localAuthMiddleware = passport.authenticate('local', { session: false });

// get route
app.get('/', function(req, res){

   res.send('welcome to my resturant');
}) 


// import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// use the routers
app.use('/person' , personRoutes);
app.use('/menu' ,localAuthMiddleware, menuItemRoutes);


app.listen(PORT , ()=>{

    console.log('listening on port 3000');
})

console.log("jatin kushwaha my name k");