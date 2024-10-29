class NumbersValidator {
  /**
   * @param {Number} number number to check
   * @return {Boolean} true if element is even
   */
  isNumberEven(number) {
    const typeOfVariable = typeof number;
    if (typeOfVariable !== 'number') {
      throw new Error(`[${number}] is not of type "Number" it is of type "${typeOfVariable}"`);
    } else {
      return number % 2 === 0;
    }
  }

  /**
   * @param {Array<Number>} arrayOfNumbers array of numbers to go through
   * @return {Array<Number>} array of even numbers
   */
  getEvenNumbersFromArray(arrayOfNumbers) {
    if (Array.isArray(arrayOfNumbers) && arrayOfNumbers.every(item => typeof item === 'number')) {
      return arrayOfNumbers.filter(this.isNumberEven);
    }
    throw new Error(`[${arrayOfNumbers}] is not an array of "Numbers"`);
  }

  /**
   * @param {Array<Number>} arrayOfNumbers array of numbers to go through
   * @return {Boolean} true if all are numbers
   */
  isAllNumbers(arrayOfNumbers) {
    if (!Array.isArray(arrayOfNumbers)) {
      throw new Error(`[${arrayOfNumbers}] is not an array`);
    }
    return arrayOfNumbers.every(n => typeof n === 'number');
  }

  /**
   * Check if passed value is integer
   * @param n - value
   * @return {boolean} true if value is integer
   */
  isInteger(n) {
    if (typeof n !== 'number') {
      throw new Error(`[${n}] is not a number`);
    }
    return Number.isInteger(n);
  }
}

module.exports = NumbersValidator;
