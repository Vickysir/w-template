const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { DEV, DEBUG } = process.env;
process.env.BABEL_ENV = DEV ? 'development' : 'production';
process.env.NODE_ENV = DEV ? 'development' : 'production';

module.exports = {
   entry: './src/index.tsx', // 入口，开始打包的起点
   // 打包文件的地址
   output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
   },
   // live server配置
   devServer: {
      port: 8080
   },
   mode: DEV ? 'development' : 'production',
   devtool: DEV && 'source-map',
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        },
        {
            test: /\.(less)$/,
            exclude: /\.module\.less$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  sourceMap: !!DEV,
                },
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: !!DEV,
                },
              },
            ],
          },
          {
            test: /\.(sass|scss)$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  sourceMap: !!DEV,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: !!DEV,
                },
              },
            ],
          },
      ]
   },
   optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
      minimize: !DEV,
        splitChunks: {
          minSize: 500000,
            cacheGroups: {
              vendors: false,
            },
        },
  },
   plugins:[
       new HtmlWebpackPlugin({
            template: path.join(__dirname,'/src/index.html')
       }) ,
       new CleanWebpackPlugin(),
      // new BundleAnalyzerPlugin(),
   ],
   resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    }
}
