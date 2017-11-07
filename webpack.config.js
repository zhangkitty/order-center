/**
 * Created by fed on 2017/8/28.
 */
const webpack = require('webpack');
const path = require('path');
const i18n = require('i18n-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const languages = {
  en: require('./src/langs/en'),
  zh: require('./src/langs/zh'),
};

module.exports = Object.keys(languages).map((lang) => ({
  entry: {
    app: ['babel-polyfill', './src/entry.jsx'],
    common: ['react', 'antd','redux-saga', 'react-dom', 'redux', 'react-redux', 'react-router', 'whatwg-fetch'],
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.join(__dirname, 'dist', lang),
    publicPath: 'dist/' + lang + '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
  },
  externals: {
    antd: 'window.antd',
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    moment: 'window.moment',
    'babel-polyfill': 'window.undefined'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader', {
            loader: 'react-redux-component-loader',
            options: {
              externals: ['navigation', 'login'],
              lazy: true,
              loading: 'Loading'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[path]__[local]-[hash:base64:5]', 'postcss-loader'],
      },
      {
        test: /\.(ttf|eot|svg|woff)/,
        loader: 'file-loader?name=[sha512:hash:base64:7].[ext]',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loaders: ['file-loader'],
      },
      {
        test: /\/me\.json$/,
        use: [ {
          loader: 'react-redux-component-loader',
          options: {
            bundle: true,
          }
        }],
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          BASE_URI: JSON.stringify('/index_new.php/Order'),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
          LOCALE: JSON.stringify(lang),
        },
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'manifest'],
      filename: '[name].[chunkhash].js',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new i18n(languages[lang]),
    new HtmlWebpackPlugin({
      template: `./${lang=='en'?'en':'index'}-template.html`,
      filename:`../../${lang=='en'?'en':'index'}.html`
    })
  ],
}));
