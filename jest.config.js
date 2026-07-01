module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-redux|@reduxjs|redux-persist|immer)/)',
  ],
};
