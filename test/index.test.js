const { sum, derivative } = require('../index');

describe('sum', () => {
  test.each([
    [1, 2, 3],
    [-1, -2, -3],
    [0.1, 0.2, 0.3],
    [0, 0, 0],
    [Number.MAX_SAFE_INTEGER, 1, Number.MAX_SAFE_INTEGER + 1],
    [-Number.MAX_SAFE_INTEGER, -1, -Number.MAX_SAFE_INTEGER - 1],
    [0, 5, 5],
  ])('sum(%p, %p) = %p', (a, b, expected) => {
    expect(sum(a, b)).toBeCloseTo(expected);
  });

  test.each([
    ['1', 2],
    [null, undefined],
    [[], {}],
  ])('sum(%p, %p) throws error', (a, b) => {
    expect(() => sum(a, b)).toThrow();
  });
});

describe('derivative', () => {
  test.each([
    [x => x * x, 3, 6],
    [Math.sin, 0, 1],
    [x => x * x * x, 0, 0],
    [x => x * x * x, 1, 3],
  ])('derivative of function at x=%p', (f, x, expected) => {
    expect(derivative(f, x)).toBeCloseTo(expected, 2);
  });

  test.each([
    [123, 1],
    [x => x, 'a'],
  ])('derivative throws error for invalid args', (f, x) => {
    expect(() => derivative(f, x)).toThrow();
  });
});

describe('mock example', () => {
  test('derivative with mocked function', () => {
    const mockFn = jest.fn(x => 2 * x);
    const result = derivative(mockFn, 5);
    expect(result).toBeCloseTo(2, 2); // derivative of 2x is 2
    expect(mockFn).toHaveBeenCalledTimes(2); // called for x+h and x-h
  });

  test('sum with mocked arguments', () => {
    const a = jest.fn(() => 3)();
    const b = jest.fn(() => 4)();
    expect(sum(a, b)).toBe(7);
  });
});

describe('async tests', () => {
  test('async sum resolves correctly', async () => {
    const asyncSum = async (a, b) => Promise.resolve(sum(a, b));
    await expect(asyncSum(2, 3)).resolves.toBe(5);
  });

  test('async derivative resolves correctly', async () => {
    const asyncDerivative = async (f, x) => Promise.resolve(derivative(f, x));
    await expect(asyncDerivative(x => x * x, 2)).resolves.toBeCloseTo(4, 2);
  });

  test('async sum throws error', async () => {
    const asyncSum = async (a, b) => Promise.resolve().then(() => sum(a, b));
    await expect(asyncSum('a', 2)).rejects.toThrow();
  });
});

describe('performance tests', () => {
  test('sum handles large arrays quickly', () => {
    const arrA = Array(1e6).fill(1);
    const arrB = Array(1e6).fill(2);
    const start = Date.now();
    for (let i = 0; i < arrA.length; i++) {
      sum(arrA[i], arrB[i]);
    }
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(500); // deve ser rápido
  });

  test('derivative performance on complex function', () => {
    const f = x => Math.sin(x) * Math.exp(x);
    const start = Date.now();
    for (let i = 0; i < 1000; i++) {
      derivative(f, i * 0.01);
    }
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(500); // deve ser rápido
  });
});

describe('integration tests', () => {
  test('sum and derivative together', () => {
    const f = x => sum(x, 2) * sum(x, 3); // (x+2)*(x+3)
    const result = derivative(f, 1); // derivada de (x+2)*(x+3) em x=1
    // derivada analítica: 2x + 5, em x=1: 7
    expect(result).toBeCloseTo(7, 2);
  });

  test('derivative of sum as function', () => {
    const f = x => sum(x, x); // 2x
    const result = derivative(f, 10);
    expect(result).toBeCloseTo(2, 2);
  });
});

describe('snapshot tests', () => {
  test('derivative returns expected value snapshot', () => {
    const f = x => x * x + 2 * x + 1;
    const result = derivative(f, 5);
    expect(result).toMatchSnapshot();
  });

  test('sum returns expected value snapshot', () => {
    expect(sum(10, 20)).toMatchSnapshot();
  });
});

describe('coverage and reporting', () => {
  test('sum and derivative are covered', () => {
    expect(typeof sum).toBe('function');
    expect(typeof derivative).toBe('function');
  });
});

describe('documentation', () => {
  test('README describes main functions', () => {
    const fs = require('fs');
    const readme = fs.readFileSync(require('path').resolve(__dirname, '../README.md'), 'utf8');
    expect(readme).toMatch(/sum\(a, b\)/);
    expect(readme).toMatch(/derivative\(f, x, h\)/);
  });
});