<template>
  <div class="write">
    <md-editor
      ref="editorRef"
      :toolbars="toolbars"
      v-model="text"
      :theme="theme"
      @onSave="handleSave"
      @onUploadImg="onUploadImg"
      @htmlChanged="handleHtmlChange"
      style="height: 760px"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
// import service from '@/utils/service'
const editorRef = ref(null);
let text = ref(""); // 左侧md内容
let theme = ref("light");
const toolbars = [
  "bold",
  "underline",
  "italic",
  "-",
  "title",
  "strikeThrough",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "task",
  "-",
  "codeRow",
  "code",
  "link",
  "image",
  "table",
  "mermaid",
  "katex",
  "-",
  "revoke",
  "next",
  "save",
  "=",
  "pageFullscreen",
  "fullscreen",
  "preview",
  "catalog",
];
// 获取预览html代码
function handleHtmlChange (html) { 
  console.log("%c Line:55 🍭🍭🍭🍭 html", "color:#3f7cff", html);
}

// 保存
function handleSave(curText) {
  console.log(curText, "curText");
}
// 上传图片
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append("file", file);

        axios
          .post("/api/img/upload", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );

  callback(res.map((item) => item.data.url));
};

onMounted(() => {
  console.log(text);
});
</script>
<style lang="less" scoped>
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
