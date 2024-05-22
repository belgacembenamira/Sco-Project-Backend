const webpack = require('webpack');

module.exports = {
  // Other Webpack configuration options
  entry: './src/main.ts', // Adjust the entry point to your project's main file
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^fs$|^net$/,
    }),
    // Other plugins
  ],
};
