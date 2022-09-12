const webpackContext = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) => {
  // requireContext.keys()   匹配的 文件路径数组
  return requireContext.keys().map(requireContext);
};
// 得到一个完整解析的module数组
requireAll(webpackContext);
