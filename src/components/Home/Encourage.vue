<template>
  <div class="encourage">
    <h3 v-if="encourage">{{ encourage }}</h3>
    <h4 v-else>
      文章数量：{{ myBlog.count }} &nbsp;
      最近更新时间：{{myBlog.lastestTime}} &nbsp;
      运行时长：{{myBlog.time}}天
    </h4>
  </div>
</template>
<script>
export default {
  name: "Encourage",
  props: {
    encourage: {
      type: String,
      default: "",
    },
    myBlog: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    return {
      ...props,
    };
  },
};
</script>
<style lang="less" scoped>
.encourage {
  position: relative;
  margin: 20px 0;
  width: 900px;
  height: 40px;
  padding: 20px;
  font-size: 20px;
  border-radius: 20px;
  box-sizing: content-box;
  border: 1px dashed #e6e6e6;
  background-image: -webkit-linear-gradient(180deg, #f35626, #feab3a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: hue 4s infinite linear;
  box-shadow: 0 0 8px 0 #ef00ff59, 0 2px 4px 0 #02efce66;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    text-align: center;
  }
}
@-webkit-keyframes hue {
  from {
    -webkit-filter: hue-rotate(0deg);
  }
  to {
    -webkit-filter: hue-rotate(-360deg);
  }
}
</style>
