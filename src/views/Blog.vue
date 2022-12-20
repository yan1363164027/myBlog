<template>
  <div class="blog-time-line">
    <el-timeline>
      <el-timeline-item
      v-for="(articleDetail, index) in articleDetails"
      :key="articleDetail.rlseTime"
      :color="index !== 0 ? '#00867F' : '#002FA7'"
      center
      :timestamp="articleDetail.rlseTime"
      placement="top"
      >
        <BlogCard
          :articleDetail="articleDetail"
          @click="jumpDetails(articleDetail)"
        ></BlogCard>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { Tileline } from "element-plus";
import { onMounted, reactive, ref, toRefs } from "vue";
import BlogCard from "@/components/Home/BlogCard.vue";
export default {
  name: "Blog",
  components: {
    Tileline,
    BlogCard,
  },
  setup() {
    const blog = reactive({
      articleDetails: [],
    });

    onMounted(() => {
      const arr = require("@/assets/articleDetails");
      blog.articleDetails.push(...arr.default.arr);
    });
    return {
      ...blog,
    };
  },
};
</script>

<style lang="less" scoped>
.blog-time-line {
  position: relative;
  width: 100%;
  height: auto;
  background: url("@/assets/image/timeLine.jpg") no-repeat fixed;
  .el-timeline {
    width: 1000px;
    margin: 0 auto;
    position: relative;
    top: 100px;
    padding-bottom: 100px;
    /deep/ .el-timeline-item {
      width: 950px;
      .el-timeline-item__tail {
        border-left: 14px solid #e4e7ed;
      }
      .el-timeline-item__node {
        width: 23px;
        height: 23px;
      }
      .el-timeline-item__wrapper {
        margin-left: 30px;
        .el-timeline-item__timestamp{
          font-size: 24px;
          color: rgb(32, 231, 188);
        }
      }
    }
  }
}
</style>
