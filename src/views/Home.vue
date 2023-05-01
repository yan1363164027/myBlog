<template>
  <el-main>
    <div class="home-nav">
      <ul>
        <li
          v-for="(nav, index) in navList"
          :key="index"
          @click="switchNav(nav, index)"
        >
          {{ nav }}
        </li>
      </ul>
    </div>
    <div class="home-content-list">
      <template
        v-for="(articleDetail, index) in blogList"
        :key="articleDetail.rlseTime"
      >
        <BlogCard
          :articleDetail="articleDetail"
          @click="jumpDetails(articleDetail)"
        ></BlogCard>
      </template>
    </div>
  </el-main>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import BlogCard from "@/components/Blog/DetailBlogCard.vue";
import VirtualScroll from "@/components/VitualScroll.vue";
import { getBlogList } from "@/utils/service/service";
const tempArr = require("@/assets/articleDetails");

const activeIndex = ref(0);
const navList = [
  "前端",
  "后端",
  "算法",
  "测试",
  "JAVA",
  "Python",
  "大数据",
  "人工智能",
];
const blogList = reactive([]);
async function switchNav(index) {
  activeIndex.value = index;
  blogList.length = 0;
  blogList.push(...tempArr.default.arr);
}
onMounted(async () => {
  switchNav(0);
  const res = await getBlogList({ method: "get", data: { tag: navList[0] } });
  console.log("%c Line:54 🍓🍓🍓🍓🍓 res", "color:#fca650", res);
});
</script>
<style lang="less" scoped>
.el-main {
  position: relative;
  width: 100%;
  max-width: 1520px;
  margin: 100px auto 0;
  .home-nav {
    background: #fff;
    border-radius: 4px;
    ul {
      display: flex;
      justify-content: space-around;
      padding: 10px;
      li {
        border-radius: 4px;
        list-style-type: none;
        padding: 4px 6px;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: #30d7fe;
          background-color: rgb(232, 232, 232);
        }
      }
    }
    .active-nav {
      color: #30d7fe;
    }
  }
  .home-content-list {
    width: 1050px;
    margin: 0 auto;
  }
}
</style>
