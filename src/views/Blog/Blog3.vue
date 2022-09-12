<template>
  <div class="markdown-body">
    <md></md>
  </div>
</template>
<script>
import "github-markdown-css"; // markdown样式
import "highlight.js/styles/github.css"; // 代码高亮
import { onMounted, ref } from "vue";
import md from "../../md/Blog3.md";
export default {
  name: "Blog",
  components: {
    md,
  },
  setup() {
    onMounted(() => {
      // const head = document.querySelector("#head-wrapper");
      // head.scrollIntoView(true);
    });
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/markdown.less");
</style>
