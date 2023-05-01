<template>
  <div class="fans-list">
    <div
      class="fans"
      v-for="(FansItem, index) in FansList"
      :key="FansItem.userId"
    >
      <div class="fans-left-wrapper">
        <el-avatar
          :size="60"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="fans-user-name">{{ FansItem.userName }}</span>
      </div>
      <el-button @click="changeFansStatus(FansItem)">
        {{ FansItem.Fansed ? "已关注" : "关注" }}
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
const FansList = reactive([
  {
    userId: "111",
    userName: "测试1",
    Fansed: true,
  },
  {
    userId: "222",
    userName: "测试2",
    Fansed: true,
  },
  {
    userId: "333",
    userName: "测试3",
    Fansed: true,
  },
]);
function changeFansStatus(FansItem) {
  // 发送请求
  FansItem.Fansed = !FansItem.Fansed;
}
const FansStatus = computed((FansItem) => {
  return FansItem.Fansed ? "已关注" : "关注";
});
</script>
<style lang="less" scoped>
.fans-list {
  .fans {
    box-sizing: border-box;
    width: 945px;
    margin: 0 auto;
    padding: 0 25px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(236, 236, 236);
    background-color: white;
    border-radius: 4px;

    .fans-left-wrapper {
      padding: 5px 0;
      display: flex;
      flex: 1;
      align-items: center;
      .fans-user-name {
        margin-left: 10px;
        align-self: center;
      }
    }
    .el-button {
      margin-right: 20px;
    }
  }
}
</style>
