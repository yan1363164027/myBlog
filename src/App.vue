<template>
  <myHead></myHead>
  <router-view></router-view>
  <MyBottom></MyBottom>
</template>
<script>
import myHead from "./components/Common/MyHead.vue";
import MyBottom from "./components/Common/MyBottom.vue";
export default {
  name: "App",
  components: {
    myHead,
    MyBottom,
  },
  setup() {},
};
</script>
<style lang="less">
*,
html,
body {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: "杨任东竹石体";
  font-size: 24px;
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
  position: relative;
  margin: 0 auto;
  width: 100vw;
  height: auto;
  max-width: 100%;
}
</style>
