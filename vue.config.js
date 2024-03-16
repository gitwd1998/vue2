const { defineConfig } = require('@vue/cli-service')
const { _buildversion } = require('./package.json')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const VconsolePlugin = require('vconsole-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const path = require('path')

const version = {
  production: _buildversion,
  test: 'v1.0.0',
  uat: 'v1.0.0',
  development: 'v1.0.0',
}[process.env.NODE_ENV]


module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/vue2',
  productionSourceMap: process.env.NODE_ENV === 'production',
  outputDir: path.resolve(__dirname, `./dist/${version}`),
  devServer: {
    proxy: {
      "/wd": {
        target: "http://127.0.0.1:8088", // 本地
        // target: "http://47.99.150.145/", // 服务器
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/wd": "/wd"
        }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'development') {
      // config.devtool = 'cheap-module-source-map'
      config.plugins.push(new CssMinimizerWebpackPlugin())
      config.plugins.push(new TerserPlugin())
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
      const productionGzipExtensions = ['js', 'css']
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )
    }
    if (process.env.NODE_ENV === 'production') {
      config.devtool = "source-map"
      const { sentryWebpackPlugin } = require('@sentry/webpack-plugin')
      config.plugins.push(
        sentryWebpackPlugin({
          org: 'gitwd1998',
          project: 'vue2',
          authToken: '11212edbe6d34e66ba00b06a8243a13e96493b3cb45c476496ac1dfc3968dfdc'
        })
      )
    } else {
      config.plugins.push(new VconsolePlugin({ filter: [], enable: true }))
    }
    config.plugins.push(
      new GenerateSW({
        cacheId: 'fee-cache',
        skipWaiting: true, // 跳过waiting状态
        clientsClaim: true, // 通知让新的sw立即在页面上取得控制权
        cleanupOutdatedCaches: true, // 删除过时、老版本的缓存
        // 最终生成的service worker地址，这个地址和webpack的output地址有关
        swDest: 'serviceWorker.js',
        include: [],
        // 缓存规则，可用正则匹配请求，进行缓存
        // 这里将js、css、还有图片资源分开缓存，可以区分缓存时间(虽然这里没做区分。。)
        // 由于种子农场此站点较长时间不更新，所以缓存时间可以稍微长一些
        runtimeCaching: [
          {
            urlPattern: /.*\.js.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'js',
              expiration: {
                maxEntries: 20, // 最多缓存20个，超过的按照LRU原则删除
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              }
            }
          },
          {
            urlPattern: /.*css.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'css',
              expiration: {
                maxEntries: 30, // 最多缓存30个，超过的按照LRU原则删除
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              }
            }
          },
          {
            urlPattern: /.*(png|svga).*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image',
              expiration: {
                maxEntries: 30, // 最多缓存30个，超过的按照LRU原则删除
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              }
            }
          }
        ]
      })
    )
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        postcssOptions: { //! webpack4没有这一层
          plugins: [
            require('postcss-px2rem')({
              remUnit: 37.5
            }),
          ]
        }
      }
    }
  },
  chainWebpack(config) {
    // 首屏加载prefetch和preload过多
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    config.optimization.runtimeChunk({
      name: 'single',
    })
    config.optimization.splitChunks({
      chunks: 'all', // 代码分割时对异步代码生效，all：所有代码有效，inital：同步代码有效
      minSize: 20000, // 代码分割最小的模块大小，引入的模块大于 30000B 才做代码分割
      maxSize: 0, // 代码分割最大的模块大小，大于这个值要进行代码分割，一般使用默认值
      minChunks: 1, // 引入的次数大于等于1时才进行代码分割
      maxAsyncRequests: 6, // 最大的异步请求数量,也就是同时加载的模块最大模块数量
      maxInitialRequests: Infinity, // 入口文件做代码分割最多分成 4 个 js 文件
      automaticNameDelimiter: '-', // 文件生成时的连接符
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 位于node_modules中的模块做代码分割
          priority: 10
        }, // 分割，，既满足 vendors，又满足 default，那么根据优先级会打包到 vendors 组中。
        default: {
          // 没有 test 表明所有的模块都能进入 default 组，但是注意它的优先级较低。
          priority: -20, //  根据优先级决定打包到哪个组里,打包到优先级高的组里。
          reuseExistingChunk: true // //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
        }
      }
    })
  }
})
