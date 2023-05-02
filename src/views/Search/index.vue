<template>
  <div class="search">
    <div class="search-content">
      <el-select v-model="searchInfo.tag">
        <el-option
          v-for="(item, index) in tagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="searchInfo.content" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" @click="searchList">搜索</el-button>
    </div>
    <div class="search-result-list" v-if="searchResList.length">
      <template
        v-for="(articleDetail, index) in searchResList"
        :key="articleDetail.rlseTime"
      >
        <BlogCard
          :articleDetail="articleDetail"
          @click="jumpDetails(articleDetail)"
        ></BlogCard>
      </template>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { getBlogList } from "@/utils/service/service";
import BlogCard from "@/components/Blog/DetailBlogCard.vue";
const searchInfo = reactive({
  content: '',
  tag: ''
});
const tagOptions = reactive([
  { label: "前端", value: "前端" },
  { label: "后端", value: "后端" },
  { label: "算法", value: "算法" },
]);
const searchResList = reactive([])
async function searchList() {
  const res = await getBlogList({ method: "get", data: searchInfo });
  res.data && searchResList.push(res.data.list)
}

onMounted(async () => {});
</script>
<style lang="less" scoped>
.search {
  position: relative;
  width: 100%;
  max-width: 1520px;
  margin: 100px auto 0;
  .search-content {
    display: flex;
    justify-content: center;
    .el-select {
      width: 100px;
      margin-right: 20px;
      /deep/ .el-input__inner {
        height: 40px;
        font-size: 18px;
      }
    }
    .el-input {
      width: 500px;
      height: 40px;
      font-size: 18px;
    }
    .el-button {
      height: 40px;
      width: 60px;
      font-size: 18px;
    }
  }
  .search-result-list {
    width: 1050px;
    margin: 0 auto;
  }
}
</style>
