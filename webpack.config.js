var path = require('path');
var webpack = require('webpack');
 
var providePlugin = new webpack.ProvidePlugin({
  'Handsontable': '../handsontable/handsontable.full.js'
});

module.exports = {
  entry: './js/main.js',
  output: { path: path.join(__dirname, "static"), filename: 'bundle.js' },
  module: {    
    noParse: [path.join(__dirname, "handsontable/handsontable.full.js")],
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [providePlugin],
};