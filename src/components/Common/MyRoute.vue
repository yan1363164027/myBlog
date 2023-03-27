<template>
  <div
    class="route"
    v-for="item in content"
    :key="item.id"
    @click="toBlog(item)"
  >
    <svg-icon
      :iconClass="item.iconClass"
      :width="item.width"
      :title="item.title"
    ></svg-icon>
    <div v-if="item.title">
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "myRoute",
  props: {
    content: {
      default: [],
    },
  },
  setup(props) {
    const router = useRouter();
    const toBlog = (item) => {
      if (item.path) {
        router.push({
          path: item.path,
          // name: 'home'
        });
      } else {
        // 创建元素a, 打开github
        let github = document.createElement("a");
        github.setAttribute("href", item.url);
        github.setAttribute("target", "_blank");
        github.click();
      }
    };

    return { toBlog };
  },
};
</script>
<style lang="less" scoped>
.route {
  width: 120px;
  margin: 0 5px;
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
