var webpack = require('webpack');

const CopyPlugin = require('copy-webpack-plugin');
console.log('The custom config is used');

module.exports = {
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
      result.request = result.request.replace(/typeorm/, "typeorm/browser");
    }),
    new webpack.ProvidePlugin({
      'window.SQL': 'sql.js/dist/sql-wasm.js'
    }),
    new CopyPlugin({ patterns: [
      // This wasm file will be fetched dynamically when we initialize sql.js
      // It is important that we do not change its name, and that it is in the same folder as the js
      { from: "../../node_modules/sql.js/dist/sql-wasm.wasm", to: "static/js/" }
    ]})
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    global: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  optimization: {
    minimize: false
  }
};
