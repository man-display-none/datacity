const isDev = process.env.NODE_ENV === 'development'
const OfflinePlugin = require('offline-plugin')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  plugins: [
    new OfflinePlugin({
      publicPath: '/',
      responseStrategy: 'network-first',
      ServiceWorker: {
        events: true,
        output: './client/sw.js',
        minify: false
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  }
}
