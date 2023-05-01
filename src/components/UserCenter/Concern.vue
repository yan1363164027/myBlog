<template>
  <div class="concer-list">
    <div
      class="concer"
      v-for="(concerItem, index) in concerList"
      :key="concerItem.userId"
    >
      <div class="concer-left-wrapper">
        <el-avatar
          :size="60"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="concer-user-name">{{ concerItem.userName }}</span>
      </div>
      <el-button @click="changeconcerStatus(concerItem)">
        {{ concerItem.concered ? "已关注" : "关注" }}
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
const concerList = reactive([
  {
    userId: "111",
    userName: "测试3",
    concered: true,
  },
  {
    userId: "222",
    userName: "测试2",
    concered: true,
  },
  {
    userId: "333",
    userName: "测试1",
    concered: true,
  },
]);
function changeconcerStatus(concerItem) {
  // 发送请求
  concerItem.concered = !concerItem.concered;
}
</script>
<style lang="less" scoped>
.concer-list {
  .concer {
    box-sizing: border-box;
    width: 945px;
    margin: 0 auto;
    padding: 0 25px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(236, 236, 236);
    background-color: white;
    border-radius: 4px;

    .concer-left-wrapper {
      padding: 5px 0;
      display: flex;
      flex: 1;
      align-items: center;
      .concer-user-name {
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
