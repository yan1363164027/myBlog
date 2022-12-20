<template>
  <div class="write">
    <md-editor v-model="text" :theme="theme" style="height: 760px" />
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const { appContext } = getCurrentInstance();
let text = ref("");
let theme = ref("");
const changeMode = () => {};
onMounted(() => {
  appContext.$mitt.on("changeMode", function (mode) {
    console.log(1111111);
    console.log(mode);
    changeMode();
  });
  console.log(text);
});
</script>
<style lang="less">
.write {
  width: 90%;
  height: 800px;
  max-width: 2000px;
  margin: 0 auto;
  position: relative;
  top: 120px;
  font-family: 宋体;
  .md-editor {
    .md-editor-toolbar-wrapper {
      height: 30px;
      .md-editor-toolbar .md-editor-toolbar-item {
        height: 30px;
        svg {
          width: 30px;
          line-height: 30px;
          height: 30px;
        }
      }
    }
    .md-editor-content {
      .md-editor-input-wrapper {
        #md-editor-v3-textarea {
          font-family: 宋体;
        }
      }
      .md-editor-preview-wrapper {
        .md-editor-preview {
          * {
            font-family: 宋体;
          }
        }
      }
    }
    .md-editor-footer {
      flex-basis: 40px;
      height: 40px;
    }
  }
}
</style>
