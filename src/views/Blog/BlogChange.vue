<template>
    <div class="change">
      <md-editor
      :toolbars="toolbars"
        v-model="text"
        :theme="theme"
        @onSave="handleSave"
        @onUploadImg="onUploadImg"
        style="height: 760px"
      />
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import MdEditor from "md-editor-v3";
  import "md-editor-v3/lib/style.css";
  let text = ref("");
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
    "catalog",
  ];
  
  // 保存
  function handleSave(curText) {
    console.log(curText, "curText");
  }
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
    const mdSourceCode = localStorage.getItem('')
    console.log(text);
  });
  </script>
  <style lang="less">
  .change {
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
  