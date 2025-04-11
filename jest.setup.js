require('@testing-library/jest-dom');

global.matchMedia = global.matchMedia || function(query) {
  return {
    matches: query === '(prefers-color-scheme: dark)', // Aquí puedes ajustarlo según tu lógica
    addEventListener: jest.fn(), // Simulamos la función addEventListener
    removeEventListener: jest.fn(), // Simulamos la función removeEventListener
  };
};