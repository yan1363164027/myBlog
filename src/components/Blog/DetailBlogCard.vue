<template>
  <div class="article-main" :style="`margin: ${marginInfo}px;`">
      <div class="content left right">
        <h3>
          <div class="releaseTime">发布时间：{{ articleDetail.rlseTime }}</div>
          <div class="article-operation-wapper">
            <el-tooltip
              placement="left"
              popper-class="article-operation-tooltip"
            >
              <template #content>
                <div class="article-operation">
                  <li @click.stop="toChange" class="article-operation-detail">
                    修改
                  </li>
                  <li
                    @click.stop="deleteArticle"
                    class="article-operation-detail"
                  >
                    删除
                  </li>
                  <li
                    @click.stop="toBlogDetail"
                    class="article-operation-detail"
                  >
                    查看
                  </li>
                </div>
              </template>
              <svg-icon iconClass="more" :cursor="false"></svg-icon>
            </el-tooltip>
          </div>
        </h3>
        <h2 :title="articleDetail.title">{{ articleDetail.title }}</h2>
        <h3>{{ articleDetail.tag }}</h3>
        <div class="brief-introduction">
          {{ articleDetail.briefIntroduction }}
        </div>
        <!-- <div class="details">○ ○ ○</div> -->
      </div>
      <div class="image right">
        <img :src="articleDetail.imgSrc" alt="" srcset="" />
      </div>
  </div>
</template>
<script setup>
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter();
const props = defineProps({
  articleDetail: {
    type: Object,
    default: {},
  },
  marginInfo: {
    type: Number,
    default: 20
  }
});
function toChange() {
  router.push({
    path: "/write",
    query: {
      nameId: props.articleDetail.nameId,
    },
  });
}
async function  deleteArticle() {
  ElMessageBox.confirm("确认删除文章吗?", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
      // 发送请求

    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
}
function toBlogDetail() {
  router.push({
    path: "/blogDetail",
    query: {
      nameId: props.articleDetail.nameId,
    },
  });
}
</script>
<style lang="less">
.article-operation-tooltip {
  padding: 0;
  width: 60px;
}
.article-operation-wapper {
  .el-button {
    border: none;
  }
}
.article-operation {
  li {
    list-style-type: none;
    width: 100%;
    cursor: pointer;
    text-align: center;
    padding: 5px 0;
    font-size: 18px;
    &:hover {
      background-color: coral;
    }
  }
}
</style>
<style lang="less" scoped>
.article-main {
  position: relative;
  min-height: 280px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  box-shadow: 0 1px 20px -8px rgb(0 0 0 / 50%);
  .image {
    width: 425px;
    height: 280px;
    overflow: hidden;
    img {
      height: 280px;
      transition: transform 0.5s ease-in-out;
    }
    img:hover {
      transform: scale(1.1);
    }
  }
  .content {
    padding: 0px 20px;

    h3 {
      display: flex;
      justify-content: space-between;
    }
    h2 {
      margin: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    h2:hover {
      color: rgb(254, 150, 0);
      cursor: pointer;
    }
    width: 500px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .brief-introduction {
      margin-top: 10px;
      width: 90%;
      height: 120px;
      font-size: 18px;
      cursor: pointer;
      text-align: left;
    }
    .brief-introduction:hover {
      color: rgb(254, 150, 0);
    }
    .details {
      width: 98%;
      align-self: center;
      font-size: 14px;
      padding-bottom: 10px;
    }
  }
  .left {
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
  .right {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    justify-content: center;
  }
  .ellipsis {
    text-align: right;
  }
}
</style>
