const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const calculatorRouter = require('./routes/decimal2hexadecimalcalculator');
app.use('/decimal2hexadecimalcalculator', calculatorRouter);

app.listen(port, (error) => {
  if (error) {
    console.log('An error has occurred: ', error)
  } else {
    console.log('Server is listening on port: ', port)
  }
});