var webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [],
  },
  chainWebpack: (config) => {
    // gltf loader
    config.module
      .rule('gltf')
      .test(/\.(glb|gltf)$/)
      .use('file-loader')
      .loader('file-loader');
  },
};
