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
      <div class="user-self-comment">
        <div class="comment-content">
          <div class="current-user">userName</div>
          <el-input
            v-model="commentInfo"
            :autosize="{ minRows: 3, maxRows: 20 }"
            type="textarea"
            :placeholder="comPlaceholder"
          />
        </div>
        <div class="publish-comment">
          <el-button type="primary">发表评论</el-button>
        </div>
      </div>
      <div class="comment-list">
        <h2>评论列表</h2>
        <CommentBlogCard :comPlaceholder="comPlaceholder" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import "md-editor-v3/lib/style.css";
import CommentBlogCard from "@/components/Blog/CommentBlogCard.vue";
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
const comPlaceholder = "想对他说些什么呀！";
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
  padding: 0 0 40px 0;
  h1 {
    padding: 40px 0;
    text-align: center;
  }
  background: #f2f3f5;
  .preview-praise,
  .preview-collect {
    position: fixed;
    left: 30px;
    cursor: pointer;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0px 3px 0 rgb(174, 174, 174);
    padding: 10px;
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
    width: 900px;
    left: 40%;
    transform: translateX(-40%);
    margin: 50px 0;
    padding: 0px 15px 50px;
    background-color: #fff;
    border-radius: 4px;
    h2 {
      padding: 10px 0;
      font-size: 30px;
    }
    .user-self-comment {
      display: flex;
      flex-direction: column;
      width: 900px;
      .comment-content {
        display: flex;
        justify-content: space-between;
        .current-user {
          position: relative;
          padding-top: 20px;
        }
        .el-textarea {
          flex: 1;
          margin-left: 20px;
          /deep/ .el-textarea__inner {
            font-size: 24px;
            &::-webkit-scrollbar-track {
              border-radius: 4px;
            }
            &::-webkit-scrollbar {
              width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
              height: 0px;
            }
            &::-webkit-scrollbar-thumb {
              border-radius: 10px;
              background-color: #84ebef;
              // background-image: linear-gradient(
              //   rgba(255, 0, 0, 1) 10%,
              //   rgb(236, 223, 35) 30%,
              //   rgba(74, 249, 65, 1) 50%,
              //   rgb(31, 249, 198) 50%,
              //   rgba(111, 44, 245, 1) 70%,
              //   rgb(84, 63, 239) 70%,
              //   rgba(255, 0, 0, 1) 100%
              // );
            }
            &::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              background: #ededed;
              border-radius: 2px;
            }
          }
        }
      }
      .publish-comment {
        padding: 10px 0px;
        align-self: flex-end;
      }
    }
    .comment-list {
      padding-left: 100px;
      width: 800px;
      align-self: flex-end;
    }
  }
}
</style>
