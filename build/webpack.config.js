const path = require('path')

module.exports = {
  entry: process.env.NODE_ENV === 'production' ? './src/index.js' : './example/index.js',
  output: {
    path: path.join(__dirname, '../lib'),
    library: 'with-context',
    libraryTarget: 'umd',
    filename: "index.js"
  },
  mode: 'production',
  externals: ['react', 'react-dom'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [/node_modules/]
      },
    ]
  },
}
