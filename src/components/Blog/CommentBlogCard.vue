<template>
  <div class="comment-card">
    <div
      class="comment-main"
      v-for="(commentTitleInfo, index1) in commentList"
      :key="index1"
    >
      <div class="comment-main-title">
        <el-avatar :size="50" :src="commentTitleInfo.userAvatarUrl" />
        <div class="comment-main-right">
          <div class="user-name">
            <span>
              <span>{{ commentTitleInfo.userName }}</span>
              <span
                v-if="articleUserData.userId === commentTitleInfo.userId"
                style="margin-left: 20px"
                >( 作者 )</span
              >
            </span>
          </div>
          <div class="comment-content">
            {{ commentTitleInfo.commentContent }}
          </div>
          <div class="comment-other">
            <div>
              <span @click.stop="handlePraise(commentTitleInfo)">
                <svg-icon
                  :iconClass="
                    commentTitleInfo.isPraise ? icon.confirmPraise : icon.praise
                  "
                  :width="16"
                ></svg-icon>
                {{
                  commentTitleInfo.praiseCount
                    ? commentTitleInfo.praiseCount
                    : "点赞"
                }}</span
              >
              <span @click.stop="handleReply(commentTitleInfo)">
                <svg-icon :iconClass="icon.reply" :width="16"></svg-icon>
                {{ commentTitleInfo.showReplay ? "取消回复" : "回复" }}</span
              >
              <div @click.stop="handleDel(index1)" class="delete-comment">
                删除
              </div>
            </div>
            <div v-if="opneComment.cur?.replyId === commentTitleInfo.replyId">
              <el-input
                v-model="commentDetail"
                :autosize="{ minRows: 3, maxRows: 20 }"
                type="textarea"
                :placeholder="comPlaceholder"
              />
              <el-button type="primary">发布</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-reply-wrapper">
        <div
          class="comment-reply"
          v-for="(commentReplyInfo, index2) in commentTitleInfo.replayArr"
          :key="index2"
        >
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <div class="comment-main-right">
            <div class="user-name">
              <span>
                <span>{{ commentReplyInfo.userName }}</span>
                <span
                  v-if="articleUserData.userId === commentReplyInfo.userId"
                  style="margin-left: 20px"
                  >( 作者 )</span
                >
              </span>
              <span v-if="commentReplyInfo.replyUserName">
                <span style="margin-left: 20px"> 回复 </span>
                <span style="margin-left: 20px">{{
                  commentReplyInfo.replyUserName
                }}</span>
              </span>
            </div>
            <div class="comment-content">
              {{ commentReplyInfo.commentContent }}
            </div>
            <div v-if="index2 > 0 && commentReplyInfo.replyUserName" class="reply-comment-content">
              {{ commentTitleInfo.replayArr[index2 - 1].commentContent }}
            </div>
            <div class="comment-other">
              <div>
                <!-- 点赞 -->
                <span @click.stop="handlePraise(commentReplyInfo)">
                  <svg-icon
                    :iconClass="
                      commentReplyInfo.isPraise
                        ? icon.confirmPraise
                        : icon.praise
                    "
                    :width="16"
                  ></svg-icon>
                  {{
                    commentReplyInfo.praiseCount
                      ? commentReplyInfo.praiseCount
                      : "点赞"
                  }}</span
                >
                <!-- 评论 -->
                <span @click.stop="handleReply(commentReplyInfo)">
                  <svg-icon :iconClass="icon.reply" :width="16"></svg-icon>
                  {{ commentReplyInfo.showReplay ? "取消回复" : "回复" }}</span
                >
                <div
                  @click.stop="handleDel(index1, index2)"
                  class="delete-comment"
                >
                  删除
                </div>
              </div>
              <div v-if="opneComment.cur?.replyId === commentReplyInfo.replyId">
                <el-input
                  v-model="commentDetail"
                  :autosize="{ minRows: 3, maxRows: 20 }"
                  type="textarea"
                  :placeholder="comPlaceholder"
                />
                <el-button type="primary">发布</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { Tileline } from "element-plus";
import { onMounted, reactive, ref, toRefs } from "vue";
const props = defineProps({
  comPlaceholder: {
    type: String,
    default: "想对他说点什么呀！",
  },
});
const commentList = reactive([
  {
    replyId: null,
    replyUserName: "",
    articleId: "",
    commentId: "1",
    userName: "秋水不爱星河",
    userId: "1",
    userAvatarUrl:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    praiseCount: 10, // replayArr.length === 回复数量
    commentContent:
      "这是一段测试评论！",
    isPraise: false,
    replayArr: [
      {
        replyId: "1", // replyId 就是 commentId
        replyUserName: "",
        replyCommentContent: '', // replyCommentContent 就是 回复的哪一条的内容
        articleId: "",
        commentId: "1-1",
        userName: "疏影",
        userId: "1-1",
        userAvatarUrl:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        praiseCount: 0,
        replyCount: 0,
        commentContent: "学到了，学到了，感谢博主分享!我感觉你在那个icon写错了，应该是需要加s的。",
        isPraise: false, // 读者是否赞过
      },
      {
        replyId: "1-1", // replyId 就是 commentId
        replyUserName: "流年",
        replyCommentContent: '', // replyCommentContent 就是 回复的哪一条的内容
        articleId: "",
        commentId: "1-2",
        userName: "用户名2",
        userId: "1-2",
        userAvatarUrl:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        praiseCount: 0,
        replyCount: 0,
        commentContent: "对，我也注意到了！",
        isPraise: false,
      },
      {
        replyId: "1-2", // replyId 就是 commentId
        replyUserName: "那年夏天",
        replyCommentContent: '', // replyCommentContent 就是 回复的哪一条的内容
        articleId: "",
        commentId: "1-3",
        userName: "用户名3",
        userId: "1-3",
        userAvatarUrl:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        praiseCount: 0,
        replyCount: 0,
        commentContent: "大佬求带！",
        isPraise: false,
      },
    ],
  },
]);
const articleUserData = JSON.parse(localStorage.getItem("articleUser") || "{}");
const commentDetail = ref("");
const icon = reactive({
  praise: "praiseBlack",
  confirmPraise: "praiseConfirm",
  reply: "comment",
});
const opneComment = reactive({
  pre: null,
  cur: null,
});
function closeOtherReply() {}
function handleDel(index1, index2) {
  if (index2 !== undefined) {
    commentList[index1].replayArr.splice(index2, 1);
  } else {
    commentList.splice(index1, 1);
  }
}
const curUser = JSON.parse(localStorage.getItem("curUser") || "{}");
function handlePraise(item) {
  if (item.isPraise) {
    item.isPraise = false;
    item.praiseCount--;
  } else {
    item.isPraise = true;
    item.praiseCount++;
  }
}
function handleReply(item) {
  if (item.replyId === opneComment.cur?.replyId) {
    opneComment.pre = opneComment.cur;
    opneComment.cur = null;
  } else {
    opneComment.pre = opneComment.cur;
    opneComment.cur = item;
  }
  item.showReplay = item.showReplay ? false : true;
}
</script>

<style lang="less" scoped>
.comment-card {
  padding: 5px 10px;
  // background-color: #fff;
  font-size: 20px;
  border-radius: 10px;
  box-shadow: 0 0 4px 1px #efefef;

  .reply-comment-content{
    width: 660px;
    background-color: rgba(211, 222, 222, 0.5);
    padding: 3px 10px;
    box-sizing: border-box;
    border-radius: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
    margin-right: 10px;
  }
  .comment-main {
    display: flex;
    flex-direction: column;
    padding: 15px 0;
  }
  .comment-main-title {
    display: flex;
  }
  .comment-reply-wrapper {
    margin: 10px 0 0 60px;
    border-radius: 6px;
    background-color: #f9fafb;
    border: 1px solid rgb(212, 212, 212);
    .comment-reply {
      padding: 5px 0px 0px 5px;
      display: flex;
      border-bottom: 1px solid rgba(224, 224, 224, 0.5);
      margin: 10px 0;
      box-sizing: border-box;
      &:last-child {
        border-bottom: none;
      }
    }
  }

  .comment-main-right {
    width: 100%;
    padding: 0px 0 10px 15px;
  }
  .user-name {
    display: flex;
    align-items: center;
  }
  .comment-content {
    padding: 10px 10px 10px 0;
    word-break: break-all;
  }
  .comment-other {
    position: relative;
    font-size: 16px;
    > div:nth-child(2) {
      padding-bottom: 10px;
    }
    .el-textarea {
      padding: 10px 10px 10px 0;
      box-sizing: border-box;
    }
    .delete-comment {
      position: absolute;
      right: 10px;
      top: 0;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
    span {
      padding-right: 15px;
      cursor: pointer;
      &:hover {
        color: #1e80ff;
      }
    }
  }
}
</style>
