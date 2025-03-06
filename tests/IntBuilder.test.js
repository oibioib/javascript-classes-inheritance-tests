require('dotenv').config();
const path = require('path');

const modulepath = path.resolve(__dirname, process.env.INT_BUILDER_PATH);
const IntBuilder = require(modulepath);

describe('IntBuilder', () => {
  describe('get', () => {
    test('should return the value', () => {
      const intBuilder = new IntBuilder(10);
      const result = intBuilder.get();
      expect(result).toBe(10);
    });

    test('should return 0 value if no argument passed to constructor', () => {
      const intBuilder = new IntBuilder();
      const result = intBuilder.get();
      expect(result).toBe(0);
    });
  });

  describe('plus', () => {
    test('should plus one value', () => {
      const intBuilder = new IntBuilder(10);
      const result = intBuilder.plus(1).get();
      expect(result).toBe(11);
    });

    test('should plus multiple values', () => {
      const intBuilder = new IntBuilder(10);
      const result = intBuilder.plus(1, 3, 5).get();
      expect(result).toBe(19);
    });
  });

  describe('minus', () => {
    test('should minus one value', () => {
      const intBuilder = new IntBuilder(10);
      const result = intBuilder.minus(1).get();
      expect(result).toBe(9);
    });

    test('should minus multiple values', () => {
      const intBuilder = new IntBuilder(10);
      const result = intBuilder.minus(1, 3, 5).get();
      expect(result).toBe(1);
    });
  });

  describe('multiply', () => {
    test('should multiply stored value by n', () => {
      const intBuilder = new IntBuilder(10);
      const result = intBuilder.multiply(3).get();
      expect(result).toBe(30);
    });
  });

  describe('divide', () => {
    test('should divide stored value by n and return integer part', () => {
      const intBuilder = new IntBuilder(10);
      const result = intBuilder.divide(3).get();
      expect(result).toBe(3);
    });
  });

  describe('mod', () => {
    test('should leaves remainder of the division stored value with on n', () => {
      const intBuilder = new IntBuilder(7);
      const result = intBuilder.mod(3).get();
      expect(result).toBe(1);
    });
  });

  describe('all operations', () => {
    test('should return correct value after applying multiple operations', () => {
      const intBuilder = new IntBuilder(10);
      const result = intBuilder.plus(2, 3, 2).minus(1, 2).multiply(2).divide(4).mod(3).get();
      expect(result).toBe(1);
    });
  });

  describe('random', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('should return minimum value from the range', () => {
      jest.spyOn(Math, 'random').mockImplementation(() => 0);
      const result = IntBuilder.random(5, 10);
      expect(result).toBe(5);
    });

    test('should return maximum value from the range', () => {
      jest.spyOn(Math, 'random').mockImplementation(() => 0.999999);
      const result = IntBuilder.random(5, 10);
      expect(result).toBe(10);
    });

    test('should return random value from the range', () => {
      const result = IntBuilder.random(5, 10);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThanOrEqual(10);
    });
  });

  describe('methods chaining', () => {
    test.each([
      { method: 'plus', value: 0 },
      { method: 'minus', value: 1 },
      { method: 'multiply', value: 0 },
      { method: 'divide', value: 1 },
      { method: 'mod', value: 0 },
    ])('$method should be chainable', ({ method, value }) => {
      const intBuilder = new IntBuilder();
      const isChainable = intBuilder[method](value) === intBuilder;
      expect(isChainable).toBeTruthy();
    });
  });
});
