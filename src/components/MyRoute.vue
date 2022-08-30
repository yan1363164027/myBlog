<template>
  <div class="route" v-for="item in content" :key="item.id">
    <svg-icon :iconClass="item.iconClass" :width="item.width"></svg-icon>
    <div v-if="item.title">{{ item.title }}</div>
  </div>
</template>

<script>
import { toRefs } from "vue";

export default {
  name: "myRoute",
  props: {
    content: {
      default: [],
    },
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
};
</script>
<style lang="less" scoped>
.route {
  width: 90px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  cursor: pointer;
  font-size: 20px;
  i {
    font-size: 20px;
  }
}
</style>
