<template>
  <div class="write">
    <div class="blog-title">
      <el-input v-model="blogTitle" placeholder="请输入文章标题"></el-input>
    </div>
    <div class="blog-right-img">
      <div class="upload-img">
        <div class="text-tip">文章卡图片</div>
        <el-upload
          ref="uploadRef"
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
          :on-change="handleChange"
        >
          <el-icon><Plus /></el-icon>
          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="dialogImageUrl"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <el-icon><Download /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
      <div class="write-desc">
        <el-input
          type="textarea"
          v-model="desc"
          placeholder="简介"
          :rows="5"
        ></el-input>
      </div>
      <div class="select-tag">
        <el-select v-model="tagValue" placeholder="选择标签" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div>
          <el-button type="primary" @click="publishArticle">发布</el-button>
        </div>
      </div>
    </div>
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
import { onMounted, reactive, ref } from "vue";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import { uploadImage, publishAS, getUserInfo } from "@/utils/service/service";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import store from "@/store/index";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter()
// import service from '@/utils/service'
const editorRef = ref(null);
let text = ref(""); // 左侧md内容
let theme = ref("light");
const desc = ref("");
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
async function uploadImgToServer(file) {
  const formData = new FormData();
  formData.append("file", file.raw || file);
  const params = {
    method: "post",
    data: formData,
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq",
      Authorization: "Bearer " + localStorage.getItem("token") || "",
    },
  };
  const res = await uploadImage(params);
  if (res.code == "200") return res;
}

async function handleChange(file) {
  const res = await uploadImgToServer(file);
  dialogImageUrl.value = res.path;
}
const userInfo = reactive({})
async function publishArticle() {
  console.log(
    "%c Line:148 🌽🌽🌽🌽 store",
    "color:#f5ce50",
    store.state.userInfo
  );
  const params = {
    method: "post",
    data: {
      userId: store.state.userInfo.id || userInfo.id,
      title: blogTitle.value,
      desc: desc.value,
      imageUrl: dialogImageUrl.value,
      tagName: tagValue.value,
      content: content.value,
      praiseCount: 0,
      collectCount: 0,
      viewCount: 0,
    },
  };
  const res = await publishAS(params);
  if(res.code == '200' && res.data){
    ElMessage({
      message: res.message,
      type: 'success'
    })
    router.push({
      path: '/',
    })
  }
}
const content = ref("");
const uploadRef = ref(null);
const blogTitle = ref("");
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const tagValue = ref("");
const options = [
  {
    value: "前端",
    label: "前端",
  },
  {
    value: "后端",
    label: "后端",
  },
  {
    value: "大数据",
    label: "大数据",
  },
  {
    value: "人工智能",
    label: "人工智能",
  },
  {
    value: "算法",
    label: "算法",
  },
];
const handleRemove = (file) => {
  console.log(file);
};
const handleExceed = (files) => {
  uploadRef.value?.clearFiles();
  const file = files[0];
  uploadRef.value?.handleStart(file);
};
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file);
};
//////////////////// markdown编辑器方法如下
// 获取预览html代码
function handleHtmlChange(html) {
  console.log("%c Line:200 🥔🥔 html", "color:#b03734", html);
  content.value = html;
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
        uploadImgToServer(file)
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );
  callback(res.map((item) => item.path));
};

onMounted(async () => {
  userInfo.push(...JSON.parse(localStorage.getItem('userInfo')))
  const params = {
    method: 'get',
  }
  const res = await getUserInfo()
});
</script>
<style lang="less" scoped>
.write {
  width: 90%;
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  top: 160px;
  font-family: 宋体;
  border: 1px solid grey;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 200px;
  background-color: #fff;
  .blog-title {
    padding: 20px;
    .el-input {
      font-size: 36px;
      text-align: center;
      /deep/ .el-input__wrapper {
        box-shadow: none;
        border-bottom: 1px solid rgba(198, 198, 198, 0.5);
        .el-input__inner {
          height: 60px;
          border: none;
          text-align: center;
        }
      }
    }
  }
  .blog-right-img {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .upload-img {
      display: flex;
      align-items: center;
      padding: 20px;
      .text-tip {
        padding-right: 20px;
        font-weight: 600;
      }
      /deep/ .el-upload-list__item {
        width: auto;
        div {
          overflow-y: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          /deep/ .el-upload-list__item-thumbnail {
            object-fit: cover;
          }
        }
      }
      .el-overlay .el-dialog__body img {
        width: 100%;
      }
    }
    .write-desc {
      .el-textarea {
        width: 260px;
        font-size: 18px;
      }
    }
    .select-tag {
      display: flex;
      margin-right: 100px;
      align-items: center;
      .el-button {
        height: 50px;
        width: 100px;
        margin-left: 50px;
        font-size: 20px;
      }
    }
  }
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
