const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      template: 'index.html',
      filename: 'index.html',
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
      ],
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
