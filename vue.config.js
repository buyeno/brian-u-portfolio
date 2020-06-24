var webpack = require("webpack");
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
        new PrerenderSPAPlugin(
          // Absolute path to compiled SPA
          path.resolve(__dirname, 'dist'),
          // List of routes to prerender
          [ '/'],
          {
            // options
          }
        ),
      ]
    }
  },
  chainWebpack: config => {
    // gltf loader
    config.module
      .rule("gltf")
      .test(/\.(glb|gltf)$/)
      .use("file-loader")
      .loader("file-loader");
  }
};
