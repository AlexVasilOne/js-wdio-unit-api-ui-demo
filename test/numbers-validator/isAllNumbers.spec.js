const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');

const NumbersValidator = require('../../app/numbers-validator');

describe('isAllNumbers', () => {
  let validator;

  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });
  describe('positive tests', () => {
    it('should return true all elements of array is numbers', () => {
      expect(validator.isAllNumbers([0, 6, 8, -10.2, 1024.2]))
        .to.be.equal(true);
    });
  });
  describe('negative tests', () => {
    it('should return false for empty array', () => {
      expect(validator.isAllNumbers([]))
        .to.be.equal(false);
    });
    it('should return false for array with non numbers elements', () => {
      expect(validator.isAllNumbers([2, 3, 4, 'five']))
        .to.be.equal(false);
    });
    it('should throw an error for not array', () => {
      const input = { key: 'value' };
      expect(() => {
        validator.isAllNumbers(input);
      }).to.throw(`[${input}] is not an array`);
    });
  });
});
