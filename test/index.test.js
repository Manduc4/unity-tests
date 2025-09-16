const { sum, derivative } = require('../index');

test('adds 1 + 2', () => {
  expect(sum(1, 2)).toBe(3);
});

test('handles negative numbers', () => {
  expect(sum(-1, -2)).toBe(-3);
  expect(sum(-5, 5)).toBe(0);
});

test('handles floating point numbers', () => {
  expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  expect(sum(-0.1, 0.1)).toBeCloseTo(0);
});

test('throws error when arguments are not numbers', () => {
  expect(() => sum('1', 2)).toThrow();
  expect(() => sum(null, undefined)).toThrow();
});

test('derivative of x^2 at x=3', () => {
  const f = x => x * x;
  const result = derivative(f, 3);
  expect(result).toBeCloseTo(6, 2);
});

test('derivative of sin(x) at x=0', () => {
  const f = Math.sin;
  const result = derivative(f, 0);
  expect(result).toBeCloseTo(1, 2);
});

test('derivative throws error for invalid args', () => {
  expect(() => derivative(123, 1)).toThrow();
  expect(() => derivative(x => x, 'a')).toThrow();
});