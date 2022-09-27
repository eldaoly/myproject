const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const path = require("path");



module.exports = {

    

    entry: {
      main: path.resolve(__dirname, './src/index.js'),
    },

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },

    mode: 'development',

    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: "html-loader",
          },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'images/[name][ext]'
            }
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[name][ext]'
            }
          },
        ],
    },


    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      open: true,
      hot: false,
      devMiddleware: {
        writeToDisk: true,
      },
    },
  
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new HtmlMinimizerPlugin(),
      ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: './css/style.css', 
        })
    ],
}