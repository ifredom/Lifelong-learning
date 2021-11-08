const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
    // libraryTarget: "umd",
  },
  devtool: "cheap-source-map",
  devServer: {
    hot: true,
    //默认端口
    port: 8065,
    //自动打开浏览器
    open: false,
    //开启服务端压缩
    compress: false,
    //使用 History 路由模式时，若404错误时被替代为 index.html
    historyApiFallback: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: ["ts-loader"],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: [path.resolve(__dirname, "src/components")],
      },
      // 加载 CSS，逆向链式执行
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              modules: {
                localIdentName: "module__[name]--[local]",
              },
            },
          },
        ],
        include: [path.resolve(__dirname, "src/components")],
      },
      // 加载 images 图像
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name].[hash:6][ext]",
        },
      },
      // 加载 fonts 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:3][ext]",
        },
      },
      // 加载 csv，xml 数据
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "视频弹窗",
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
    }),
  ],
};
