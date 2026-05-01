module.exports = {
  testMatch: ['**/tests/unit/**/*.js', '**/tests/integration/**/*.js'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^gi://Gio$': '<rootDir>/__mocks__/Gio.js',
    '^gi://GLib$': '<rootDir>/__mocks__/GLib.js',
    '^gi://GObject$': '<rootDir>/__mocks__/GObject.js',
  },
};
