<template>
  <div class="markdown-body">
    <md></md>
  </div>
</template>
<script>
import "github-markdown-css"; // markdown样式
import "highlight.js/styles/github.css"; // 代码高亮
import { onBeforeUnmount } from "vue";
import md from "../../md/Blog0.md";
export default {
  name: "Blog",
  components: {
    md,
  },
  setup(){
    onBeforeUnmount(()=>{
      clearTimeout()
    })
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/markdown.less");
</style>
