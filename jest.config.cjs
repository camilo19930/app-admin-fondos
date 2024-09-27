module.exports = {
    preset: 'ts-jest', // Si usas TypeScript
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Para soporte de TypeScript con Jest
      '^.+\\.jsx?$': 'babel-jest', // Si tienes archivos JavaScript, usa babel-jest
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Extensiones soportadas
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mapea estilos para evitar errores
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mapea imágenes
    },
  };
  