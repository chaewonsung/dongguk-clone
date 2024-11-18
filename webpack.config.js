const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: '/src/js/main.js',
    introduction: '/src/js/introduction.js',
    qna: '/src/js/qna.js',
    detail: '/src/js/detail.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'pages/index.html',
      filename: 'pages/index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: 'pages/qna.html',
      filename: 'pages/qna.html',
      chunks: ['qna'],
    }),
    new HtmlWebpackPlugin({
      template: 'pages/introduction.html',
      filename: 'pages/introduction.html',
      chunks: ['introduction'],
    }),
    new HtmlWebpackPlugin({
      template: 'pages/student.html',
      filename: 'pages/student.html',
      chunks: ['detail'],
    }),
    new HtmlWebpackPlugin({
      template: 'pages/teacher.html',
      filename: 'pages/teacher.html',
      chunks: ['detail'],
    }),
    new HtmlWebpackPlugin({
      template: 'pages/industry.html',
      filename: 'pages/industry.html',
      chunks: ['detail'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images', to: 'src/images' },
        { from: 'pages/includes', to: 'pages/includes' },
        { from: 'index.html', to: 'index.html' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
};
