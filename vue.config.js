const glob = require('glob');
const path = require('path');
const fs = require('fs');
let entries;
let pages={};
try {
  entries = glob('src/pages/*/main.js', { sync: true });
} catch (err) {
  entries = [];
  throw err;
}
entries.forEach(filePath => {
  const pageName = path.basename(path.dirname(filePath));
  let templateHtml = path.dirname(filePath) + '/index.html';
  if (!fs.existsSync(templateHtml)) {
    templateHtml = path.resolve(__dirname, 'public') + '/index.html';
  }
  pages[pageName] = {
    // page 的入口
    entry: filePath,
    // 模板来源
    template: templateHtml,
    // 在 dist/index.html 的输出
    filename: `${pageName}.html`,
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', pageName]
  };
});
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pages,
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {
  },
  configureWebpack: config => {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      config.devtool='eval-source-map'
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // extract: true,
    // sourceMap: false,
    loaderOptions: {
      // stylus: {//cube 插件添加的配置
      //   'resolve url': true,
      //   'import': [
      //     './src/theme'
      //   ]
      // }
      // less: {//vant 自定义主题
      //   modifyVars: {
      //     red: '#fdbb2c',//'#ff9a6a',
      //     blue: '#fdbb2c',
      //     orange: '#fdbb2c',
      //   }
      // }
    },
    modules: false
  },
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: 8004,
    proxy: {
      '/api/': {
        target: 'http://localhost:8095',  // target host
        // ws: true,  // proxy websockets
        changeOrigin: true,  // 是否跨域
        // pathRewrite: {
        //   '^/api': '/api/v1'  // 重写请求路径
        // }
      },
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // 'cube-ui': {//cube 插件添加的配置
    //   postCompile: true,
    //   theme: true
    // }
  }
}
