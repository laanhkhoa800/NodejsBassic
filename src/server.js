
const express = require('express')
const path = require('path');
require('dotenv').config();

import configViewEngine from './config/viewEngine';

const app = express()
const port = process.env.PORT || 8080;

configViewEngine(app);
console.log("check port", port);

app.get('/', (req, res) => {
  res.render('index.ejs');
  // res.sendFile(path.join(__dirname, '/index.html'));
  
})

app.get('/about', (req, res) => {   

  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})