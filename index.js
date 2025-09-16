const sum = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  return a + b;
};

function derivative(f, x, h = 1e-5) {
  if (typeof f !== 'function' || typeof x !== 'number') {
    throw new Error('Invalid arguments');
  }
  return (f(x + h) - f(x - h)) / (2 * h);
}

module.exports = { sum, derivative };