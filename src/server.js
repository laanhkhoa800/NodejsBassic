import initWebRoute from './route/web'
const express = require('express')
const path = require('path');
require('dotenv').config();

import configViewEngine from './config/viewEngine';

const app = express()
const port = process.env.PORT || 8080;

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



  //nodemon  -  when save code system run command to reload server