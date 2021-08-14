const express = require('express')
const router = express.Router()
const calculationService = require('../calculationService')

router.get('/', (req, res) => {
  // req.params.decimal
  res.send('Hello World')
})

// get calculation
router.get('/:id', (req, res) => {
  const hex = calculationService.convertBase10ToBase16(req.params.id);
  res.json({
    decimal: req.params.id,
    hexadecimal: hex,
  })
})

module.exports = router