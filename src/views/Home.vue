<template>
  <div class="home">
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
              <svg-icon :iconClass="item"></svg-icon>
            </template>
          </div>
          <svg-icon iconClass="arrowRight"></svg-icon>
        </div>
      </div>
    </div>
    <div class="next-content">
      <div class="encourage-center">
        <Encourage :encourage="encourage"></Encourage>
        <Encourage :myBlog="myBlog"></Encourage>
      </div>
      <div class="article">
        <div class="article-head">
          <svg-icon :iconClass="yezi" :cursor="false"></svg-icon>文章
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myRoute from "../components/MyRoute.vue";
import Encourage from "../components/Encourage.vue";
export default {
  name: "Home",
  components: {
    myRoute,
    Encourage,
  },
  setup() {
    const svgArr = ["gitee", "github", "qq", "weixin"];
    const encourage = "今天也要好好努力啊！";
    const myBlog = {
      count: 0,
      time: 0,
      lastestTime: 0,
    };
    const yezi = "yezi";
    return {
      svgArr,
      encourage,
      myBlog,
      yezi,
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 1920px;
  max-width: 100%;
  height: auto;
  background: url("../assets/image/bg1.jpg") no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    height: 800px;
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
      .article-head {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: "modern" !important;
        width: 100%;
        border-bottom: 1px dashed rgb(204, 204, 204);
      }
    }
  }
}
</style>
