<template>
  <div class="user-center">
    <div class="user-center-background-image"></div>
    <div class="user-content">
      <div class="user-info-top">
        <div class="user-info-top-left">
          <div class="user-info-top-left-left">
            <img src="@/assets/image/user-me.png" alt="" srcset="" />
            <div class="user-name">秋水不爱星河</div>
          </div>
          <div class="user-info-top-left-right">
            <div class="user-short-introduce">
              <svg-icon iconClass="shotIntroduce" title="简介"></svg-icon>
              个性签名：
              <span :title="'路漫漫其修远，吾将上下而求索。'"
                >路漫漫其修远，吾将上下而求索。路漫漫其修远，吾将上下而求索。路漫漫其修远，吾将上下而求索。路漫漫其修远，吾将上下而求索。</span
              >
            </div>
            <div class="user-concat">
              <div class="detail">
                <span>联系方式：</span>
                <div class="user-concat-detail">
                  <template
                    v-for="(item, index) in svgArr"
                    :key="index"
                    :title="item"
                  >
                    <svg-icon
                      :iconClass="item"
                      :width="svgIcon.width"
                      :cursor="svgIcon.cursor"
                    ></svg-icon>
                  </template>
                </div>
              </div>
            </div>
            <div class="change-userInfo">
              <svg-icon iconClass="editUserInfo"></svg-icon>
              编辑个人资料
            </div>
          </div>
        </div>
        <div class="user-info-top-right">
          <h2>个人成就</h2>
          <h3><svg-icon iconClass="praise-confirm"></svg-icon> 总点赞量 100</h3>
          <h3>
            <svg-icon iconClass="read-number"></svg-icon> 文章被阅读数量 10000
          </h3>
          <h3>
            <svg-icon iconClass="collect-filled"></svg-icon> 文章被收藏数量
            20000
          </h3>
          <h3>我的关注 1000</h3>
          <h3>我的粉丝 1000</h3>
        </div>
      </div>
      <div class="user-info-bottom">
        <div class="encourage-center">
          <Encourage :encourage="encourage"></Encourage>
          <!-- <Encourage :myBlog="myBlogInfo"></Encourage> -->
        </div>
        <el-tabs
          v-model="activeName"
          class="user-center-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="文章" name="article">
            <div class="article">
              <!-- <div class="article-head">
                <svg-icon :iconClass="yezi" :cursor="false"></svg-icon>
                <span>文章</span>
              </div> -->
              <template
                v-for="(articleDetail, index) in articleDetails"
                :key="articleDetail.rlseTime"
              >
                <BlogCard
                  :articleDetail="articleDetail"
                  @click="jumpDetails(articleDetail)"
                ></BlogCard>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="点赞" name="praise">praise</el-tab-pane>
          <el-tab-pane label="收藏" name="collect">collect</el-tab-pane>
          <el-tab-pane label="关注" name="concern">concern</el-tab-pane>
          <el-tab-pane label="粉丝" name="fans">fans</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import myRoute from "@/components/Common/MyRoute.vue";
import Encourage from "@/components/UserCenter/Encourage.vue";
import BlogCard from "@/components/UserCenter/DetailBlogCard.vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
export default {
  name: "user-center",
  components: {
    myRoute,
    Encourage,
    BlogCard,
  },
  setup() {
    const router = useRouter();
    const svg = {
      svgArr: ["gitee", "github", "qq", "weixin"],
      svgIcon: {
        width: 30,
        cursor: true,
      },
    };
    const encourage = "今天又是充满希望的一天！";
    const blog = reactive({
      myBlogInfo: {
        count: 5,
        initTime: 1661910302619,
        time: 0,
        lastestTime: "2022-8-30",
      },
      articleDetails: [],
    });
    // 跳转至详情页
    const jumpDetails = (detail) => {
      router.push({
        path: `/blogDetail`,
        query: {
          nameId: detail.nameId,
        },
      });
    };
    const handleClick = () => { 
     
    }
    const activeName = ref("article");
    const yezi = "yezi";
    onMounted(() => {
      let diff = Date.now() - blog.myBlogInfo.initTime;
      blog.myBlogInfo.time = Math.ceil(diff / (1000 * 3600 * 24));
      const arr = require("../../assets/articleDetails");
      blog.articleDetails.push(...arr.default.arr);
    });
    return {
      handleClick,
      activeName,
      encourage,
      ...blog,
      ...svg,
      yezi,
      jumpDetails,
    };
  },
};
</script>

<style lang="less" scoped>
.user-center {
  position: relative;
  background-color: #f2f3f5;
  left: 50%;
  transform: translateX(-50%);
  width: 2560px;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  // .user-center-background-image {
  //   background-size: cover;
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   max-width: 2560px;
  //   max-height: 1080px;
  //   top: 0;
  //   background: url("@/assets/image/home1.jpg") no-repeat;
  //   background-position-x: center;
  //   background-position-y: start;
  //   // img{
  //   //   width: 100%;
  //   //   max-height: 1297px;
  //   //   object-fit: contain;
  //   //   position: absolute;
  //   //   transform: translate(-50%,-50%);
  //   //   top: 50%;
  //   //   left: 50%;
  //   // }
  // }
  .user-content {
    margin-top: 150px;
    position: relative;
    height: 100%;
    width: 1100px;
    text-align: center;
    .user-info-top {
      display: flex;
      justify-content: space-evenly;
      height: auto;
      .user-info-top-left {
        padding: 20px 10px;
        border-radius: 4px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;
        box-shadow: 0px 1px 1em 1px #eaeaea;
        .user-info-top-left-left,
        .user-info-top-left-right {
          padding: 20px 10px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
        }
        .user-name {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-name {
          font-weight: 700;
        }
        .user-short-introduce {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 400px;
          height: auto;
          max-height: 90px;
          white-space: pre-wrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .change-userInfo {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 200px;
          height: 36px;
          border: 2px solid grey;
          border-radius: 4px;
          cursor: pointer;
        }
      }
      .user-info-top-right {
        width: 300px;
        font-size: 20px;
        border-radius: 4px;
        h3 {
          text-align: left;
        }
        padding: 5px 10px;
        box-shadow: 0px 1px 1em 1px #eaeaea;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    .user-info-bottom {
    }
    img {
      width: 160px;
      object-fit: contain;
      border-radius: 80px;
      transform: rotate(0deg);
      transition: transform 1s cubic-bezier(0.29, 0.06, 0.15, 0.87);
    }
    img:hover {
      transform: rotate(-360deg);
      transition: transform 1s cubic-bezier(0.29, 0.06, 0.15, 0.87);
    }
    .user-concat {
      border-radius: 20px;
      h2 {
        color: white;
      }
      .detail {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .user-concat-detail {
          padding: 5px 0;
          width: 260px;
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
  .user-info-bottom {
    position: relative;
    width: 100%;
    height: auto;
    .encourage-center {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .user-center-tabs {
      /deep/ .el-tabs__header{
        padding:0 60px;
      }
      /deep/ .el-tabs__item {
        font-size: 20px;
      }
      .article {
        width: 1050px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        .article-head {
          font-size: 18px;
          width: 90%;
          border-bottom: 1px dashed rgb(204, 204, 204);
        }
      }
    }
  }
}
</style>
