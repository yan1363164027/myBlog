<template>
  <div class="home">
    <div class="home-background-image">
      <!-- <img src="@/assets/image/bg2.jpg" alt="" srcset=""> -->
    </div>
    <div class="now-content">
      <img src="../assets/image/user-me.png" alt="" srcset="" />
      <div class="concat">
        <h2>My concat</h2>
        <div class="detail">
          <svg-icon iconClass="arrowLeft"></svg-icon>
          <div class="concat-detail">
            <template
              v-for="(item, index) in svgArr"
              :key="index"
              :title="item"
            >
              <svg-icon
                :iconClass="item"
                :width="svgIcon.width"
                :cursor="svgIcon.cursor"
              ></svg-icon>
            </template>
          </div>
          <svg-icon iconClass="arrowRight"></svg-icon>
        </div>
      </div>
    </div>
    <div class="next-content">
      <div class="encourage-center">
        <Encourage :encourage="encourage"></Encourage>
        <Encourage :myBlog="myBlogInfo"></Encourage>
      </div>
      <div class="article">
        <div class="article-head">
          <svg-icon :iconClass="yezi" :cursor="false"></svg-icon>
          <span>文章</span>
        </div>
        <template
          v-for="(articleDetail, index) in articleDetails"
          :key="articleDetail.rlseTime"
        >
          <BlogCard
            :articleDetail="articleDetail"
            @click="jumpDetails(articleDetail)"
          ></BlogCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import myRoute from "../components/Common/MyRoute.vue";
import Encourage from "../components/Home/Encourage.vue";
import BlogCard from "../components/Home/BlogCard.vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
export default {
  name: "Home",
  components: {
    myRoute,
    Encourage,
    BlogCard,
  },
  setup() {
    const router = useRouter();
    const svg = {
      svgArr: ["gitee", "github", "qq", "weixin"],
      svgIcon: {
        width: 30,
        cursor: true,
      },
    };
    const encourage = "今天又是充满希望的一天！";
    const blog = reactive({
      myBlogInfo: {
        count: 5,
        initTime: 1661910302619,
        time: 0,
        lastestTime: "2022-8-30",
      },
      articleDetails: [],
    });
    // 跳转至详情页
    const jumpDetails = (detail) => {
      router.addRoute({
        path: `/${detail.name}`,
        component: () => import(`../views/Blog/${detail.name}.vue`),
      });
      router.push({
        path: `/${detail.name}`,
      });
    };

    const yezi = "yezi";
    onMounted(() => {
      let diff = Date.now() - blog.myBlogInfo.initTime;
      blog.myBlogInfo.time = Math.ceil(diff / (1000 * 3600 * 24));
      const arr = require("../assets/articleDetails");
      blog.articleDetails.push(...arr.default.arr);
    });
    return {
      encourage,
      ...blog,
      ...svg,
      yezi,
      jumpDetails,
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 2560px;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  .home-background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 2560px;
    max-height: 1080px;
    top: 0;
    background: url("../assets/image/home.jpg") no-repeat;
    background-position-x: center;
    background-position-y: start;
    // img{
    //   width: 100%;
    //   max-height: 1297px;
    //   object-fit: contain;
    //   position: absolute;
    //   transform: translate(-50%,-50%);
    //   top: 50%;
    //   left: 50%;
    // }
  }
  .now-content {
    margin-top: 300px;
    position: relative;
    width: 400px;
    height: 400px;
    text-align: center;
    img {
      width: 160px;
      object-fit: contain;
      border-radius: 80px;
      transform: rotate(0deg);
      transition: transform 1s cubic-bezier(0.29, 0.06, 0.15, 0.87);
    }
    img:hover {
      transform: rotate(-360deg);
      transition: transform 1s cubic-bezier(0.29, 0.06, 0.15, 0.87);
    }
    .concat {
      margin-top: 20px;
      width: 100%;
      height: 100px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 20px;
      h2 {
        color: white;
      }
      .detail {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
        .concat-detail {
          width: 300px;
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
  .next-content {
    position: relative;
    width: 100%;
    height: auto;
    margin-top: 400px;
    .encourage-center {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .article {
      width: 1050px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .article-head {
        font-size: 18px;
        width: 90%;
        border-bottom: 1px dashed rgb(204, 204, 204);
      }
    }
  }
}
</style>
