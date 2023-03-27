const { defineConfig } = require("@vue/cli-service");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3001", // 目标地址
        pathRewrite: {
          "^/api": "",
        },
        ws: true, // 用于支持websocket
        changeOrigin: true,
      },
    }
  },
  chainWebpack: (config) => {
    config.module.rules.delete("svg"); // 重点:删除默认配置中处理svg
    config.module
      .rule("svg-sprite-loader") // rule 匹配规则
      .test(/\.svg$/) // 用正则匹配 文件
      .include // 包含 包括
      .add(resolve("src/icon")) // 处理svg目录
      .end()
      .use("svg-sprite-loader") // 配置loader  use() 使用哪个loader
      .loader("svg-sprite-loader") // 加载loader
      .options({
        // [name] 变量。一般表示匹配到的文件名 xxx.svg
        // 注意： symbolId  在  <use xlink:href="#dl-icon-svg文件名" />
        symbolId: "dl-icon-[name]", // 将所有的.svg 集成到 symbol中，当使用 类名 icon-文件名
      });
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options({
        raw: true,
      });
    config.resolve.alias
      .set("@", resolve("src"))
    // .set("@assets", resolve("src/assets"))
    // .set("@components", resolve("src/components"))
    // .set("@base", resolve("baseConfig"))
    // .set("@public", resolve("public"));

  },
});
