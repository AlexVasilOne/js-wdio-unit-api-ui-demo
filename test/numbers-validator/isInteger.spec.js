const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');

const NumbersValidator = require('../../app/numbers-validator');

describe('isInteger', () => {
  let validator;

  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });
  describe('positive tests', () => {
    it('should return true all elements of array is numbers', () => {
      expect(validator.isInteger(2)).to.be.equal(true);
      expect(validator.isInteger(0)).to.be.equal(true);
      expect(validator.isInteger(-678)).to.be.equal(true);
    });
  });
  describe('negative tests', () => {
    it('should false if number isnt integer', () => {
      expect(validator.isInteger(2.23)).to.be.equal(false);
      expect(validator.isInteger(0.345)).to.be.equal(false);
      expect(validator.isInteger(-3.90)).to.be.equal(false);
    });
    it('should throw an error if input isnt a number', () => {
      const input = { key: 'value' };
      expect(() => {
        validator.isInteger(input);
      }).to.throw(`[${input}] is not a number`);
    });
  });
});
