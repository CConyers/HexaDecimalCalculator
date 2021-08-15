const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;

const calculationService = require('../services/calculationService');

describe('calculationService', () => {
  describe('divideBySixteen', () => {
    let sandbox;
    let divideBySixteenSpy;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
      divideBySixteenSpy = sandbox.spy(
        calculationService,
        'divideBySixteen',
      );
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('should return the correct remainder array when quotient === 0', () => {
      const result = calculationService.divideBySixteen(125)
      expect(result).to.deep.equal([13, 7]);
    });
    it('should call itself the correct number of times (initial + recursively) until quotient === 0', () => {
      const result = calculationService.divideBySixteen(1250)
      expect(result).to.deep.equal([2, 14, 4]);
      expect(divideBySixteenSpy).to.have.been.calledThrice;
    });
  });
  describe('convertBase10ToBase16', () => {
    let sandbox;
    let divideBySixteenStub;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
      divideBySixteenStub = sandbox.stub(
        calculationService,
        'divideBySixteen',
      );
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('should reverse the returned remainder array from divideBySixteen and convert to the correct hexadecimal (0-9)', () => {
      divideBySixteenStub.returns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const result = calculationService.convertBase10ToBase16(10)
      expect(result).to.equal('9876543210');
    });
    it('should reverse the returned remainder array from divideBySixteen and convert to the correct hexadecimal (10-15)', () => {
      divideBySixteenStub.returns([10, 11, 12, 13, 14, 15]);
      const result = calculationService.convertBase10ToBase16(10)
      expect(result).to.equal('FEDCBA');
    });
  });
  describe('calculateBase16', () => {
    describe('mock tests', () => {
      let sandbox;
      let convertBase10ToBase16Stub;
      beforeEach(() => {
        sandbox = sinon.createSandbox();
        convertBase10ToBase16Stub = sandbox.stub(
          calculationService,
          'convertBase10ToBase16',
        );
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should call calculationService.calculateBase16 with decimal passed in if it is a positive integer', () => {
        const result = calculationService.calculateBase16(10)
        expect(convertBase10ToBase16Stub).to.have.been.calledWith(10);
      });
      it('should call calculationService.calculateBase16 with decimal passed in, converted to absolute if negative integer', () => {
        const result = calculationService.calculateBase16(-10)
        expect(convertBase10ToBase16Stub).to.have.been.calledWith(10);
      });
    });
    describe('full tests', () => {
      it('should return the correct hexadecimal of the decimal passed in', () => {
        expect(calculationService.calculateBase16(10)).to.equal('A');
        expect(calculationService.calculateBase16(15)).to.equal('F');
        expect(calculationService.calculateBase16(30)).to.equal('1E');
        expect(calculationService.calculateBase16(12232)).to.equal('2FC8');
      });
    });
  });
});