<template>
  <div class="markdown-body">
    <md></md>
  </div>
</template>
<script>
import "github-markdown-css"; // markdown样式
import "highlight.js/styles/github.css"; // 代码高亮
import md from "../../md/Blog2.md";
export default {
  name: "Blog",
  components: {
    md,
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/markdown.less");
</style>
