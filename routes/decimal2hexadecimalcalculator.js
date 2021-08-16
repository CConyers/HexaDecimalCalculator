const express = require('express');
const router = express.Router();
const calculationService = require('../services/calculationService');

//Middleware
const typeChecker = (req, res, next) => {
  const regex = /^-?\d*$/;
  const isInteger = regex.test(req.params.decimal);
  if (isInteger) {
    next();
  } else {
    throw new Error('Wrong type, Expected type Integer');
  }
};

// get decimal to hexadecimal conversion
router.get('/:decimal', typeChecker , (req, res) => {
  const hex = calculationService.calculateBase16(req.params.decimal);
  res.json({
    decimal: req.params.decimal,
    hexadecimal: hex,
  });
});

module.exports = router