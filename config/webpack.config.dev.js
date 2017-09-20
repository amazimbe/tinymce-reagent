var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './static/index.html'
    })
  ]
}
