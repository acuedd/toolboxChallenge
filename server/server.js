const express = require('express')
const cors = require('cors')
const files = require('./controller/files');

const app = express()

app.use(cors())

app.get('/', async (req, res) => {
  const dataFile = await files.Files()   
  res.json(dataFile)
})

app.listen(4000, () => {
  console.log('connected on port 4000')
})