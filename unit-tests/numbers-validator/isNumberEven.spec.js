const { expect } = require('chai');
const { describe, it } = require('mocha');
const NumbersValidator = require('../../app/numbers-validator');

describe('isNumberEven', () => {
  const validator = new NumbersValidator();

  describe('positive tests', () => {
    it('should return true if number is even', () => {
      expect(validator.isNumberEven(4)).to.be.equal(true);
      expect(validator.isNumberEven(-6)).to.be.equal(true);
      expect(validator.isNumberEven(0)).to.be.equal(true);
    });
  });

  describe('negative tests', () => {
    it('should return false if number is odd', () => {
      expect(validator.isNumberEven(3)).to.be.equal(false);
      expect(validator.isNumberEven(-53)).to.be.equal(false);
      expect(validator.isNumberEven(4.1)).to.be.equal(false);
    });

    it('should return throw a message if input isnt a number', () => {
      const input = ['four', { key: 'value' }, [1, 23, 4]];
      input.forEach((elem) => {
        expect(() => {
          validator.isNumberEven(elem);
        }).to.throw(`[${elem}] is not of type "Number" it is of type "${typeof elem}"`);
      });
    });
  });
});
