"use strict";

const express = require('express')
const app = express()
const { sendContactEmail } = require('./mail/contact_me.js')

app.use(express.json())
app.use(express.static(__dirname))

app.listen(3000, () => {
  console.log('Server is starting on port 3000')
})

app.get('/', function (req, res) {
  res.sendfile('index.html')
})

app.post('/contact', async function(req, res) {
  try {
    const data = req.body
    await sendContactEmail(data)
    res.send({ result: 'success' })
  } catch (e) {
    console.error(e.message)
    res.sendStatus(500)
  }
})