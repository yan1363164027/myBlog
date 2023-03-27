<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    :style="
      props.width
        ? `width:${props.width}px;height:${props.width}px;${
            props.cursor ? 'cursor:pointer;' : ''
          }`
        : ''
    "
    :title="title"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed } from "@vue/reactivity";

export default {
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 0,
    },
    cursor: {
      type: Boolean,
      default: true,
    },
    title:{
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 图标在 iconfont 中的名字
    const iconName = computed(() => {
      return `#dl-icon-${props.iconClass}`;
    });
    // 给图标添加上类名
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      }
      return "svg-icon";
    });
    return {
      svgClass,
      iconName,
      props,
    };
  },
};
</script>

<style lang="less" scoped>
.svg-icon {
  width: 30px;
  height: 30px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  transition: all 1s;
}
.big-svg-icon {
  width: 50px;
  height: 50px;
}
</style>
