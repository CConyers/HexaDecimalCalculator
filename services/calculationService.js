const { 
  HexEnums, 
  BASE_SIXTEEN, 
  QUOTIENT_LIMIT, 
  DECI_HEX_MATCH_LIMIT,
} = require('../constants')

const CalculationService = () => ({
  divideBySixteen: function divideBySixteen(decimal, array = []) {
    const quotient = Math.floor(decimal / BASE_SIXTEEN);
    const remainder = decimal % BASE_SIXTEEN;
    array.push(remainder);
    if (quotient === QUOTIENT_LIMIT) return array;
    return this.divideBySixteen(quotient, array);
  },
  convertBase10ToBase16: function convertBase10ToBase16(decimal) {
    const remainders = this.divideBySixteen(decimal).reverse();
    const reducer = (accumulator = '', num) => accumulator + String(num <= DECI_HEX_MATCH_LIMIT ? num : HexEnums[num]);
    return remainders.reduce(reducer, []);
  },
  calculateBase16: function calculateBase16(decimal) {
    const isNegative = decimal < 0;
    if (isNegative) {
      decimal = Math.abs(decimal);
      return `-${this.convertBase10ToBase16(decimal)}`
    }
    return this.convertBase10ToBase16(decimal);
  }
});

module.exports = CalculationService();
