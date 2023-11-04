const path = require("path");

//! Примечание: если в какой-то момент изображения перестали отображаться, то нужно просто нажать Ctrl + S/сохранить index.html, и всё вернётся на круги своя


//Плагины
const HtmlWebpackPlugin = require("html-webpack-plugin");//
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// let mode = 'development';
// let devtool = 'source-map';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  devtool = false;
} else { 
    mode = 'development';
    devtool = 'source-map';
}
console.log(mode); 


const plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Данный html будет использован как шаблон
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css', // Формат имени файла
      }), // Добавляем в список плагинов
  ]; // Создаем массив плагинов

module.exports = {
    mode,
    plugins,
    devtool,
    entry: {
        main: './src/scripts/index.js',
        website: './src/website.html'
    },

    output: {
        filename: 'scripts/[name].[contenthash].js', // '[chunkhash].[id].chunk.js', //'[name].[chunkhash].js', //'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // clean: true, //очищать dist перед повторным npm run build
        clean: process.env.NODE_ENV === "production", //возможное решение с пропаданием картинок при работе dev servera webpacka
        assetModuleFilename: 'assets/images/[name].[contenthash].[ext]', //если название папки с картинками другое, не забудьте поменять
        environment: {
            arrowFunction: false,
        },        
    },
    
    module: {
        rules: [
            {
                test: /\.(html)$/i,
                loader: "html-loader",
            },
            {
                test: /\.(scss|css)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "autoprefixer"
                                ],
                            ],
                        },
                    },
                }, "group-css-media-queries-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                type: 'asset/resource'//resource
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-transform-arrow-functions"],
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
        ],
    },
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // inject: false,
            template: 'src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            // inject: false,
            template: 'src/website.html',
            filename: 'website.html'
        }),

        new MiniCssExtractPlugin({filename: 'styles/[name].[contenthash].css'})        
    ],
    // devServer: {
    //     watchFiles: ["*.html"],
    //     static: './dist',
    //     hot: true,
    // }
};