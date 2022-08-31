<template>
  <div class="article-main" @click="">
    <template v-if="articleDetail.flag">
      <div class="content left right">
        <h3>发布时间：{{ articleDetail.rlseTime }}</h3>
        <h2>{{ articleDetail.title }}</h2>
        <h3>{{ articleDetail.tag }}</h3>
        <div class="brief-introduction">
          {{ articleDetail.briefIntroduction }}
        </div>
        <div class="details">○ ○ ○</div>
      </div>
      <div class="image right">
        <img :src="articleDetail.imgSrc" alt="" srcset="" />
      </div>
    </template>
    <template v-else>
      <div class="image left">
        <img :src="articleDetail.imgSrc" alt="" srcset="" />
      </div>
      <div class="content left right">
        <h3>发布时间：{{ articleDetail.rlseTime }}</h3>
        <h2>{{ articleDetail.title }}</h2>
        <h3>{{ articleDetail.tag }}</h3>
        <div class="brief-introduction">
          {{ articleDetail.briefIntroduction }}
        </div>
        <div class="details ellipsis">○ ○ ○</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "BlogCard",
  props: {
    articleDetail: {
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
.article-main {
  position: relative;
  width: 90%;
  height: 300px;
  // background-color: #bfa;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  box-shadow: 0 1px 20px -8px rgb(0 0 0 / 50%);
  .image {
    width: 425px;
    height: 300px;
    overflow: hidden;
    img {
      height: 300px;
      transition: transform 0.5s ease-in-out;
    }
    img:hover {
      transform: scale(1.1);
    }
  }
  .content {
    padding: 10px 20px;
    h2 {
      margin: 10px 0;
    }
    h2:hover {
      color: rgb(254, 150, 0);
      cursor: pointer;
    }
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .brief-introduction {
      margin-top: 10px;
      width: 90%;
      height: 120px;
      font-size: 18px;
      cursor: pointer;
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
  }
  .ellipsis {
    text-align: right;
  }
}
</style>
