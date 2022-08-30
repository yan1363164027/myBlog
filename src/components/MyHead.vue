<template>
  <div id="head-wrapper">
    <div :class="scrollTop >= 20 ? 'backTop appear-cat' : 'backTop'">
      <img src="../assets/image/scroll.png" alt="" srcset="" />
    </div>
    <div :class="scrollTop >= 20 ? 'header scrollTop' : 'header'">
      <div class="left"></div>
      <div class="center">
        <myRoute :content="center" />
      </div>
      <div class="right">
        <myRoute :content="right.search" />
        <myRoute :content="right.user" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { onMounted } from "vue";
import myRoute from "./MyRoute.vue";
export default {
  name: "header",
  components: {
    myRoute,
  },
  setup() {
    const header = {
      left: {},
      center: [
        { id: 1, iconClass: "home", title: "首页" },
        { id: 2, iconClass: "wenzhang", title: "博客" },
        { id: 3, iconClass: "ziliao", title: "资料" },
        // { id: 4, icon: "icon-gitee", title: "github" },
      ],
      right: {
        search: [
          {
            id: 1,
            iconClass: "search",
            // title: "搜索",
            width: 50,
          },
        ],
        user: [
          {
            id: 1,
            iconClass: "user",
            // title: "用户",
            width: 50,
          },
        ],
      },
    };
    const scrollTop = ref(0);
    onMounted(() => {
      window.onscroll = function () {
        scrollTop.value =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
      };
      const headWrapper = document.querySelector("#head-wrapper");
    });
    return {
      ...header,
      scrollTop,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#head-wrapper {
  position: absolute;
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 1);
  .header {
    position: fixed;
    z-index: 2000;
    left: 50%;
    width: 100vw;
    max-width: 1920px;
    transform: translateX(-50%);
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0);
    transition: box-shadow 1s, background-color 1s;
    .left {
      width: 120px;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-shrink: 0;
      background-image: url("../assets/image/logo.png");
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      -moz-background-size: 100% 100%;
      background-size: 100% 100%;
    }
    .center {
      width: 400px;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
    .right {
      margin-right: 10px;
      width: 180px;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .scrollTop {
    box-shadow: 5px 1px 1em 1px rgb(186, 186, 186);
    background-color: rgba(255, 255, 255, 0.9);
    transition: box-shadow 0.5s, background-color 1s;
  }
  .backTop {
    position: fixed;
    right: 100px;
    width: 70px;
    height: 900px;
    top: -900px;
    transition: top ease-in-out 0.5s;
    z-index: 2000;
    cursor: pointer;
  }
  .appear-cat {
    top: 0px;
    transition: top cubic-bezier(0.54, 1.09, 0.54, 1.01) 1s;
    animation: appearCat 2s infinite;
    z-index: 1000;
    cursor: pointer;
  }
  @keyframes appearCat {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @-webkit-keyframes appearCat {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
}
</style>
