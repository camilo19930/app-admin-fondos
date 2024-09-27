module.exports = {
  preset: 'ts-jest', // Usa ts-jest como el preset para TypeScript
  testEnvironment: 'jsdom', // Asegúrate de que el entorno sea 'jsdom' para aplicaciones React
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transforma archivos .ts y .tsx con ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Asegúrate de incluir las extensiones que estás usando
};
