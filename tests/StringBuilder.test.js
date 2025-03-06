require('dotenv').config();
const path = require('path');

const modulepath = path.resolve(__dirname, process.env.STRING_BUILDER_PATH);
const StringBuilder = require(modulepath);

describe('StringBuilder', () => {
  describe('get', () => {
    test('should return the value', () => {
      const stringBuilder = new StringBuilder('test value');
      const result = stringBuilder.get();
      expect(result).toBe('test value');
    });

    test('should return empty string if no argument passed', () => {
      const stringBuilder = new StringBuilder();
      const result = stringBuilder.get();
      expect(result).toBe('');
    });
  });

  describe('plus', () => {
    test('should plus one value', () => {
      const stringBuilder = new StringBuilder('test');
      const result = stringBuilder.plus(' value').get();
      expect(result).toBe('test value');
    });

    test('should plus multiple values', () => {
      const stringBuilder = new StringBuilder('test');
      const result = stringBuilder.plus(' value', ' and another test value').get();
      expect(result).toBe('test value and another test value');
    });
  });

  describe('minus', () => {
    test('should cut last n chars', () => {
      const stringBuilder = new StringBuilder('test value');
      const result = stringBuilder.minus(6).get();
      expect(result).toBe('test');
    });
  });

  describe('multiple', () => {
    test('should repeat value n times', () => {
      const stringBuilder = new StringBuilder('test');
      const result = stringBuilder.multiply(3).get();
      expect(result).toBe('testtesttest');
    });
  });

  describe('divide', () => {
    test('should return first k chars', () => {
      const stringBuilder = new StringBuilder('test test');
      const result = stringBuilder.divide(2).get();
      expect(result).toBe('test');
    });
  });

  describe('remove', () => {
    test('should remove taken string from stored', () => {
      const stringBuilder = new StringBuilder('test test');
      const result = stringBuilder.remove('st te').get();
      expect(result).toBe('test');
    });

    test('should remove all occurrences of taken string', () => {
      const stringBuilder = new StringBuilder('test test');
      const result = stringBuilder.remove('t').get();
      expect(result).toBe('es es');
    });

    test('should not use String.prototype.replace method', () => {
      const replaceSpy = jest.spyOn(String.prototype, 'replace');
      const stringBuilder = new StringBuilder('test test');
      stringBuilder.remove('t').get();
      expect(replaceSpy).not.toHaveBeenCalled();
      replaceSpy.mockRestore();
    });
  });

  describe('sub', () => {
    test('should leaves substring starting from and with length n', () => {
      const stringBuilder = new StringBuilder('value test');
      const result = stringBuilder.sub(6, 4).get();
      expect(result).toBe('test');
    });
  });

  describe('all operations', () => {
    test('should return correct value after applying multiple operations', () => {
      const stringBuilder = new StringBuilder('Hello');
      const result = stringBuilder
        .plus(' all', '!')
        .minus(4)
        .multiply(3)
        .divide(4)
        .remove('l')
        .sub(1, 1)
        .get();

      expect(result).toBe('e');
    });
  });

  describe('methods chaining', () => {
    test.each([
      { method: 'plus', value: [''] },
      { method: 'minus', value: [1] },
      { method: 'multiply', value: [2] },
      { method: 'divide', value: [3] },
      { method: 'remove', value: [''] },
      { method: 'sub', value: [1, 1] },
    ])('$method should be chainable', ({ method, value }) => {
      const stringBuilder = new StringBuilder('Hello');
      const isChainable = stringBuilder[method](...value) === stringBuilder;
      expect(isChainable).toBeTruthy();
    });
  });
});
