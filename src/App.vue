<template>
  <myHead v-if="hasCookies"> </myHead>
  <router-view></router-view>
  <MyBottom v-if="hasCookies"></MyBottom>
</template>
<script setup>
import myHead from "./components/Common/MyHead.vue";
import MyBottom from "./components/Common/MyBottom.vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
const route = useRoute();
const hasCookies = ref(false);
const getCookies = () => {
  // 回头需要换成token校验，数值存储到sessionStorage/localStorage当中
  hasCookies.value = document.cookie ? true : false;
};
onMounted(async () => {
  getCookies();
});
</script>
<style lang="less">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}

* {
  margin: 0px;
  padding: 0px;
}
html,
body {
  width: 100%;
  height: calc(100vh - 1.9rem); //这个页面只有头部,所以将头部的高度减去
  box-sizing: border-box;
  font-family: "杨任东竹石体";
  font-size: 24px;
  @import url("./assets/css/markdown.less");
}
body {
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-image: linear-gradient(
      45deg,
      rgba(255, 0, 0, 1) 10%,
      rgb(236, 223, 35) 30%,
      rgba(74, 249, 65, 1) 50%,
      rgb(31, 249, 198) 50%,
      rgba(111, 44, 245, 1) 70%,
      rgb(84, 63, 239) 70%,
      rgba(255, 0, 0, 1) 100%
    );
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 2px;
  }
}
#app {
  position: absolute;
  margin: 0 auto;
  height: auto;
  width: 100vw;
  max-width: 100%;
  // .top-distance {
  //   position: relative;
  //   top: 100px;
  // }
}
</style>
