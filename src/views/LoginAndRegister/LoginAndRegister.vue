<template>
  <div class="login">
    <div class="login-form">
      <div class="user-avatar">
        <el-row class="demo-avatar demo-basic">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="160" :src="avatarUrl" />
            </div>
          </div>
        </el-row>
      </div>
      <el-form
        :rules="rules"
        ref="ruleFormRef"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            minlength="5"
            maxLength="10"
            v-model="form.userName"
            placeholder="请输入账号"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            minlength="6"
            maxLength="16"
            v-model="form.password"
            placeholder="请输入密码"
            :prefix-icon="Unlock"
          />
          <div v-if="loginType" class="forgetPwd" @click="handldForgetPwd">
            忘记密码
          </div>
        </el-form-item>
        <el-form-item v-if="!loginType" label="绑定手机" prop="phoneNum">
          <el-input
            type="number"
            minLength="11"
            maxLength="11"
            v-model="form.phoneNum"
            placeholder="请输入手机号"
            :prefix-icon="Iphone"
          />
        </el-form-item>
        <el-form-item v-if="!loginType" label="验证码" prop="validateNum">
          <div class="validate-iphone-num">
            <el-input
              minLength="6"
              maxLength="6"
              v-model="form.validateNum"
              placeholder="验证码"
              :prefix-icon="Unlock"
            />
            <el-button
              @click="getValidateNum"
              :disabled="validateText !== '获取验证码'"
              :style="validateText !== '获取验证码' ? 'color: grey;' : ''"
              >{{ validateText }}</el-button
            >
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="loginType"
            type="primary"
            @click="formSubmit(ruleFormRef)"
          >
            <span>登陆</span>
            <el-icon :size="20" color="white"> <Loading /> </el-icon>
          </el-button>
          <el-button type="primary" @click="registerSubmit(ruleFormRef)">
            <span>注册</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 确认登录对话框 -->
    <el-dialog v-model="dialogVisible" width="30%">
      <span>注册成功是否立即登陆</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmLogin"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { User, Unlock, Loading, Iphone } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { getValidateNumer } from "@/utils/service/service";

const router = useRouter();
let validateText = ref("获取验证码");
let validateTime = ref(60);

const dialogVisible = ref(false); // 注册成功展示对话框是否直接登陆
const ruleFormRef = ref(); // 表单对象ref
// 表单数据
const form = reactive({
  userName: "",
  password: "",
  phoneNum: "",
  validateNum: "",
});
const loginType = ref(true); // true 为登陆 false 为注册
const avatarUrl = require("@/assets/image/user-me.png");
// 获取验证码
const getValidateNum = async () => {
  let timer = setInterval(() => {
    validateTime.value--;
    if (validateTime.value === 0) {
      validateText.value = "获取验证码";
      validateTime.value = 60;
      clearInterval(timer);
    } else {
      validateText.value = `${validateTime.value}s后重新发送`;
    }
  }, 1000);
  validateText.value = `${validateTime.value}s后重新发送`;
  const params = {
    url: "/sendsms",
    method: "post",
    data: { phone: Number(form.phoneNum) },
  };
  const result = await getValidateNumer(params);
  console.log("%c Line:137 🍆🍆🍆 result", "color:#3f7cff", result);
};
// 注册成功确认登陆跳转至主页面
const confirmLogin = () => {
  dialogVisible.value = false;
  router.push({
    path: "/",
  });
};
// 置空数据
function clearFormData() {
  form.userName = "";
  form.password = "";
  form.phoneNum = "";
  form.validateNum = "";
}
// 登陆表单提交
const formSubmit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 验证成功 发送请求
      router.push({
        path: "/",
      });
    } else {
      return false;
    }
  });
};
// 注册表单提交
const registerSubmit = (formEl) => {
  if (loginType.value) {
    // 登陆切换注册，清空数据
    loginType.value = false;
    clearFormData();
  } else {
    if (!formEl) return;
    formEl.validate(async (valid) => {
      if (valid) {
        // 验证成功 发送请求
        // const res = await
        // if(res.code === '000000'){
        dialogVisible.value = true;
        // }
      } else {
        return false;
      }
    });
  }
};
// 校验方法
const validateForm = {
  validateAccount: (rule, value, callback) => {
    if (value === "") {
      callback(new Error("账号不能为空！"));
    } else {
      callback();
    }
  },
  validatePassword: (rule, value, callback) => {
    if (value === "") {
      callback(new Error("密码不能为空！"));
    } else {
      callback();
    }
  },
  validateIphoneNum: (rule, value, callback) => {
    if (!loginType.value) callback();
    else if (value === "") {
      callback(new Error("手机号不能为空！"));
    }
    // else if(){
    // }
    else {
      callback();
    }
  },
  validateValidateNum: (rule, value, callback) => {
    if (!loginType) callback();
    else if (value === "") {
      callback(new Error("验证码不能为空！"));
    } else {
      callback();
    }
  },
};
// 校验规则
const rules = reactive({
  userName: [{ validator: validateForm.validateAccount, trigger: "blur" }],
  password: [{ validator: validateForm.validatePassword, trigger: "blur" }],
  phoneNum: [{ validator: validateForm.validateIphoneNum, trigger: "blur" }],
  validateNum: [
    { validator: validateForm.validateValidateNum, trigger: "blur" },
  ],
});

function handldForgetPwd() {}
</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  min-width: 100vw;
  max-width: 100%;
  height: calc(100vh - 2rem);
  max-height: 100%;
  background: url("@/assets/image/Login.jpg");
  background-size: 100%;
  .login-form {
    width: 400px;
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .forgetPwd {
      position: absolute;
      right: 5px;
      bottom: -32px;
      text-align: right;
      cursor: pointer;
      &:hover {
        color: rgb(53, 133, 191);
      }
    }
    .user-avatar .demo-avatar {
      display: flex;
      justify-content: center;
    }
    .el-form {
      margin-top: 60px;
      .validate-iphone-num {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-button {
          position: absolute;
          right: 5px;
          height: 28px;
          font-size: 14px !important;
          padding: 0 8px;
          color: #1e80ff;
          border: none;
          &:hover {
            background-color: #fff;
          }
        }
      }
      .el-form-item {
        margin: 30px 0 0;
        /deep/ .el-button {
          font-size: 18px;
          .el-icon {
            font-size: 20px;
            margin-left: 10px;
          }
        }
        /deep/ .el-form-item__label {
          color: black;
          font-size: 20px;
        }
        /deep/ .el-input__wrapper {
          font-size: 18px;
          height: 32px;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
