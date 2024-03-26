const path = require('path');

module.exports = {
  entry: {
    app: './js/home.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
  },
};
