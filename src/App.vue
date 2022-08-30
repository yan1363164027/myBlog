<template>
  <myHead></myHead>
  <router-view></router-view>
</template>
<script>
import myHead from "./components/MyHead.vue";
export default {
  name: "App",
  components: {
    myHead,
  },
  setup() {},
};
</script>
<style>
@import url(./assets/iconfont/iconfont.css);
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  position: relative;
  margin: 0 auto;
  width: 100vw;
  height: auto;
  max-width: 100%;
}
</style>
