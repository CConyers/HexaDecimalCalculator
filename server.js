const express = require('express')
const app = express()

app.use(express.json())

const calculatorRouter = require('./routes/calculations')
app.use('/calculations', calculatorRouter)

app.listen(3000, () => {
  console.log('This server has started')
})