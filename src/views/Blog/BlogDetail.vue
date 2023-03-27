<template>
  <div class="blog-detail">
    <div
      class="preview-praise"
      title="点赞"
      @click="icon.handleChangeIcon('praise')"
    >
      <svg-icon :iconClass="icon.praise"></svg-icon>
    </div>
    <div
      class="preview-collect"
      title="收藏"
      @click="icon.handleChangeIcon('collect')"
    >
      <svg-icon :iconClass="icon.collect"></svg-icon>
    </div>
    <h1>我是标题</h1>
    <div
      id="md-editor-v3-preview-wrapper"
      class="md-editor-preview-wrapper my-preview"
    >
      <div id="md-editor-v3-preview" class="md-editor-preview default-theme">
        <div v-html="articleDetail"></div>
      </div>
    </div>
    <div class="comment">
      <h2>评论</h2>
      <el-input
        v-model="commentInfo"
        :rows="3"
        type="textarea"
        placeholder="文明评论哦！"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import "md-editor-v3/lib/style.css";
// import { service } from '@/utils/service' 引入请求方法体
const route = useRoute();
const data = require("@/assets/articleDetails");
const articleDetail = ref(data.default.arr[0].content);
const icon = reactive({
  praise: "praiseBlack",
  collect: "collect",
  handleChangeIcon: (type) => {
    if (type === "praise") {
      // 发请求
      icon.praise =
        icon.praise === "praiseBlack" ? "praiseConfirm" : "praiseBlack";
    } else if (type === "collect") {
      // 发请求
      icon.collect = icon.collect === "collect" ? "collectFilled" : "collect";
    }
  },
});
const commentInfo = ref("");
// async function getArticleDital () {
//   const res = await
//  if (res.code === '000000'){
//   articleDetail.value = res.data.content
//  }
// }

onMounted(() => {
  // 根据props.nameId请求数据
  console.log(route.query, "666");
});
</script>

<style lang="less" scoped>
.blog-detail {
  position: relative;
  padding-top: 100px;
  h1{
    padding:40px 0;
    text-align: center;
  }
  background: #F2F3F5;
  .preview-praise,
  .preview-collect {
    position: fixed;
    left: 30px;
    cursor: pointer;
  }
  .preview-praise {
    top: 240px;
  }
  .preview-collect {
    top: 320px;
  }
  .my-preview {
    position: relative;
    width: 1200px;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 4px;
    padding: 15px;
    background: #fff;
  }
  .comment {
    position: relative;
    width: 1200px;
    left: 50%;
    transform: translateX(-50%);
    padding: 50px 15px;
    h2{
      padding: 10px 0;
    }
    /deep/ .el-textarea__inner {
      width: 800px;
      font-size: 24px;
    }
  }
}
</style>
