<template>
  <div id="head-wrapper" ref="myScroll">
    <div :class="scrollTop >= 20 ? 'backTop appear-cat' : 'backTop'">
      <img
        src="../../assets/image/scroll.png"
        alt=""
        srcset=""
        @click="backTop"
      />
    </div>
    <div
      :class="scrollTop >= 20 ? 'header scrollTop' : 'header'"
      :style="`${scrollTop >= 20 ? '' : 'background-color: #F2F3F5;'}`"
    >
      <div class="left"></div>
      <div class="center">
        <myRoute :content="header.center" />
      </div>
      <div class="right">
        <myRoute :content="header.right.search" />
        <div @click="changeMode">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-badge :value="2" class="item">
                <svg-icon
                  :iconClass="header.right.info.iconClass"
                  :width="30"
                ></svg-icon>
              </el-badge>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="clearfix">
                  测试用户1收藏了你的博客
                  <el-badge class="mark" :value="1" />
                </el-dropdown-item>
                <el-dropdown-item class="clearfix">
                  测试用户2点赞了你的博客
                  <el-badge class="mark" :value="1" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <myRoute :content="header.right.user" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref, getCurrentInstance } from "vue";
import { onMounted } from "vue";
import myRoute from "./MyRoute.vue";
const { appContext } = getCurrentInstance();
const header = {
  left: {},
  center: [
    { id: 1, iconClass: "home", title: "首页", path: "/" },
    { id: 2, iconClass: "wenzhang", title: "博客", path: "/blog" },
    // { id: 3, iconClass: "ziliao", title: "资料", path: null },
    // {
    //   id: 4,
    //   iconClass: "github",
    //   title: "github",
    //   path: null,
    //   url: "https://github.com/yan1363164027?tab=repositories",
    // },
    // {
    //   id: 5,
    //   iconClass: "gitee",
    //   title: "gitee",
    //   path: null,
    //   url: "https://gitee.com/yzx136",
    // },
    {
      id: 6,
      iconClass: "write",
      title: "写博客",
      path: "/write",
    },
  ],
  right: {
    search: [
      {
        id: 1,
        iconClass: "search",
        width: 35,
        // title: "搜索",
      },
    ],
    user: [
      {
        id: 1,
        iconClass: "user",
        width: 35,
        // title: "用户",
        path: '/userCenter'
      },
    ],
    info: {
      id: 1,
      iconClass: "information",
      width: 30,
      // title: "用户",
    },
  },
};
const theme = ref("light");
const scrollTop = ref(0);
let headWrapper = null;
const changeMode = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  console.log(99999);
  // appContext.$mitt.emit("changeMode", theme.value);
};
onMounted(() => {
  window.onscroll = function () {
    scrollTop.value =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
  };
  headWrapper = document.querySelector("#head-wrapper");
});

const backTop = () => {
  if (scrollTop.value > 0) {
    window.requestAnimationFrame(backTop);
    window.scrollTo(0, scrollTop.value - scrollTop.value / 10);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#head-wrapper {
  position: absolute;
  width: 100vw;
  max-width: 100%;
  height: 100px;
  overflow: hidden;
  background-color: #fff;
  .header {
    position: fixed;
    z-index: 2000;
    left: 50%;
    width: 100vw;
    max-width: 2560px;
    transform: translateX(-50%);
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: none;
    background-color: rgb(255, 255, 255);
    transition: box-shadow 1s, background-color 1s;
    .left {
      width: 120px;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-shrink: 0;
      background-image: url("../../assets/image/logo.png");
      filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
      -moz-background-size: 100% 100%;
      background-size: 100% 100%;
    }
    .center {
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
    top: -250px;
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
