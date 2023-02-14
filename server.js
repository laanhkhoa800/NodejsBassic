
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello La Anh Khoa!')
})

app.get('/about', (req, res) => {
    res.send('My name is Khoa')
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})