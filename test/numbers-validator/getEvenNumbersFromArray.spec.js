const { expect } = require('chai');
const { describe, it } = require('mocha');

const NumbersValidator = require('../../app/numbers-validator');

describe('getEvenNumbersFromArray', () => {
  const validator = new NumbersValidator();

  describe('positive tests', () => {
    it('should return array of even numbers', () => {
      expect(validator.getEvenNumbersFromArray([0, 6, 8, -10, 1024]))
        .to.deep.equal([0, 6, 8, -10, 1024]);
      expect(validator.getEvenNumbersFromArray([3.2, 6, 9, 10, 23]))
        .to.deep.equal([6, 10]);
      expect(validator.getEvenNumbersFromArray([1, 3, 7, -3, -23]))
        .to.deep.equal([]);
      expect(validator.getEvenNumbersFromArray([]))
        .to.deep.equal([]);
    });
  });

  describe('negative tests', () => {
    it('should throw an error with invalid element inside array', () => {
      const input = [4, 6, 'four', 33];
      expect(() => {
        validator.getEvenNumbersFromArray(input);
      }).to.throw(`[${input}] is not an array of "Numbers"`);
    });
    it('should throw an error with invalid input', () => {
      const input = "[4, 6, 'four', 33]";
      expect(() => {
        validator.getEvenNumbersFromArray(input);
      }).to.throw(`[${input}] is not an array of "Numbers"`);
    });
  });
});
