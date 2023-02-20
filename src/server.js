import initWebRoute from './route/web';
import initApiRoute from './route/api';
import configViewEngine from './config/viewEngine';

require('dotenv').config();

const express = require('express')
const path = require('path');
var morgan = require('morgan');

const app = express()
const port = process.env.PORT || 8080;

app.use(morgan('combined'));

//config to get data from request UI up controller  
// use midlewere to conver res to JSON and object
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);
//init api route
initApiRoute(app);

//use midlewere handle 404 not found
app.use( (req, res) => {
  return res.render('notFound.ejs');
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



  //nodemon  -  when save code system run command to reload server