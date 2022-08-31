<template>
  <div class="my-bottom">
    <div class="contact">
      暂无域名。。。
      <div class="c-one">
        <div class="address">
          河南省新乡市红旗区洪门镇华兰大道东段河南科技学院
        </div>
        <div class="phone">
          <a class="tel">电话(微信):15090388072</a>
        </div>
      </div>
      <div class="c-two">
        <div class="copyright">COPYRIGHT @ 2022</div>
        <div class="owner">版权所有：Yzx</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyBottom",
};
</script>
<style lang="less" scoped>
.my-bottom {
  position: relative;
  width: 1920px;
  max-width: 100%;
  height: 300px;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  .contact {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 0;
    line-height: 2;
    background-color: #fff;
  }
  .c-two {
    justify-content: center;
    align-items: center;
  }
  .address,
  .phone {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .tel {
    text-decoration: underline;
  }
}
</style>
