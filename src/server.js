import initWebRoute from './route/web';
import initApiRoute from './route/api';
import configViewEngine from './config/viewEngine';
import connection from './config/connectDB';

require('dotenv').config();

const express = require('express')
const path = require('path');

const app = express()
const port = process.env.PORT || 8080;

//config to get data from request UI up controller  
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
  
//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);
//init api route
initApiRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



  //nodemon  -  when save code system run command to reload server