const {
  override,
  fixBabelImports,
  addPostcssPlugins,
  addWebpackAlias,
} = require("customize-cra");

const { resolve } = require("path");

// customize-cra react-app-rewired
module.exports = override(
  // 按需加载 - antd-mobile的样式
  // babel-plugin-import
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: "css",
  }),
  // px2rem
  // postcss-px2rem
  addPostcssPlugins([require("postcss-px2rem")({ remUnit: 3.75 })]),

  // 配置路径别名
  addWebpackAlias({
    "@utils": resolve(__dirname, "./src/utils"),
    "@api": resolve(__dirname, "./src/api"),
    "@assets": resolve(__dirname, "./src/assets"),
    "@pages": resolve(__dirname, "./src/pages"),
    "@comps": resolve(__dirname, "./src/components"),
    "@store": resolve(__dirname, "./src/store"),
  })
);
