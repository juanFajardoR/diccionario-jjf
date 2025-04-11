require('@testing-library/jest-dom');

global.matchMedia = global.matchMedia || function(query) {
  return {
    matches: query === '(prefers-color-scheme: dark)',
    addEventListener: jest.fn(), 
    removeEventListener: jest.fn(),
  };
};
