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
          <div class="validate-code-num">
            <el-input
              minLength="6"
              maxLength="6"
              v-model="form.validateNum"
              placeholder="验证码"
              :prefix-icon="Unlock"
            />
            <el-button
              @click="getValidateNum()"
              :disabled="validateText !== '获取验证码'"
              :style="validateText !== '获取验证码' ? 'color: grey;' : ''"
              >{{ validateText }}</el-button
            >
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerSubmit(ruleFormRef)">
            <span>注册</span>
          </el-button>
          <el-button type="primary" @click="formSubmit(ruleFormRef)">
            <span>{{ loginType ? "" : "回到" }}登陆</span>
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
    <!-- 忘记密码 -->
    <el-dialog v-model="forgetPwd" width="30%">
      <el-form :model="forgetForm" :rules="forgetRules" ref="forgetEl">
        <el-form-item label="用户名" prop="name">
          <el-input :prefix-icon="User" v-model="forgetForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            :prefix-icon="Unlock"
            type="number"
            v-model="forgetForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <div class="validate-code-num">
            <el-input
              type="password"
              minLength="6"
              maxLength="6"
              v-model="forgetForm.newPwd"
              placeholder="请输入新密码"
              :prefix-icon="Unlock"
            />
          </div>
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode">
          <div class="validate-code-num">
            <el-input
              minLength="6"
              maxLength="6"
              v-model="forgetForm.verifyCode"
              placeholder="验证码"
              :prefix-icon="Unlock"
            />
            <el-button
              @click="forgetPwdFunc()"
              :disabled="forgetText !== '获取验证码'"
              :style="forgetText !== '获取验证码' ? 'color: grey;' : ''"
              >{{ forgetText }}</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="forgetPwd = false">取消</el-button>
          <el-button type="primary" @click="forgetPwdVerify(forgetEl)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { User, Unlock, Loading, Iphone } from "@element-plus/icons-vue";
import {
  getValidateNumer,
  registerUser,
  forgetPassword,
  loginUser,
} from "@/utils/service/service";
import { ElMessage } from "element-plus";
const store = useStore();
const router = useRouter();
let validateText = ref("获取验证码");
const forgetText = ref("获取验证码");
let validateTime = ref(60);
const forgetPwd = ref(false);
const dialogVisible = ref(false); // 注册成功展示对话框是否直接登陆
const ruleFormRef = ref(); // 表单对象ref
const forgetEl = ref();
const forgetStatus = ref(true);
const forgetForm = reactive({
  name: "",
  phone: "",
  verifyCode: "",
  newPwd: "",
});
// 表单数据
const form = reactive({
  userName: "",
  password: "",
  phoneNum: "",
  validateNum: "",
});
const loginType = ref(true); // true 为登陆 false 为注册
const avatarUrl = require("@/assets/image/user-me.png");
const forgetCode = ref(0);
const registerCode = ref(0);
// 获取验证码
const getValidateNum = async (path) => {
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
    method: "post",
    data: { phone: form.phoneNum },
  };
  const result = await getValidateNumer(params);
  forgetCode.value = result.data.code;
};
const forgetPwdVerify = async (forgetEl) => {
  if (!forgetEl) return;
  forgetEl.validate(async (valid) => {
    if (valid) {
      const result = await forgetPassword(forgetForm);
      console.log("%c Line:208 🍿🍿🍿🍿 result", "color:#f5ce50", result);
      if (result.data) {
        ElMessage({
          message: z,
        });
      }
    } else {
      return false;
    }
  });
};
async function loginFunc() {
  const params = {
    method: "post",
    data: {
      username: form.userName,
      password: form.password,
    },
  };
  const res = await loginUser(params);
  localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
  return res;
}
// 注册成功确认登陆跳转至主页面
const confirmLogin = async () => {
  dialogVisible.value = false;
  let res = await loginFunc();
  if (res.code == "200" && res.data) {
    store.commit("SET_USERINFO", res.data.userInfo);
    localStorage.setItem("token", res.data.token);
    router.push({
      path: "/",
    });
  }
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
  if (!loginType.value) {
    loginType.value = true;
    return;
  }
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      // 验证成功 发送请求
      const res = await loginFunc();
      if (res.code == "200") {
        ElMessage({
          message: res.message,
          type: res.data ? "success" : "error",
        });
      }
      if (res.data.userInfo) {
        store.commit("SET_USERINFO", res.data.userInfo);
        localStorage.setItem("token", res.data.token);
        router.push({
          path: "/",
        });
      }
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
        const params = {
          method: "post",
          data: {
            username: form.userName,
            password: form.password,
            phone: form.phoneNum,
            verifyCode: form.validateNum,
          },
        };
        const res = await registerUser(params);
        if (res.code == "200" && res.data) {
          dialogVisible.value = true;
        }else{
          ElMessage({
            message: res.message,
            taye: 'warning'
          })
        }
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
};
// 忘记密码校验方法
const validateForgetForm = {
  validateName: (rule, value, callback) => {
    if (value === "") {
      callback(new Error("用户名不能为空！"));
    } else {
      callback();
    }
  },
  validateIphoneNum: (rule, value, callback) => {
    if (value === "") {
      callback(new Error("手机号不能为空！"));
    }
    // else if(){
    // }
    else {
      callback();
    }
  },
  validateForgetPwd: (rule, value, callback) => {
    if (value === "") {
      callback(new Error("验证码不能为空！"));
    } else if (value != forgetCode.value) {
      callback(new Error("验证码错误！"));
    } else {
      callback();
    }
  },
  validateNewPwd: (rule, value, callback) => {
    if (value === "") {
      callback(new Error("新密码不能为空！"));
    } else {
      callback();
    }
  },
};
// 忘记密码校验规则
const forgetRules = reactive({
  name: [{ validator: validateForgetForm.validateName, trigger: "blur" }],
  phone: [{ validator: validateForgetForm.validateIphoneNum, trigger: "blur" }],
  verifyCode: [
    { validator: validateForgetForm.validateForgetPwd, trigger: "blur" },
  ],
  newPwd: [{ validator: validateForgetForm.validateNewPwd, trigger: "blur" }],
});
// 校验规则
const rules = reactive({
  userName: [{ validator: validateForm.validateAccount, trigger: "blur" }],
  password: [{ validator: validateForm.validatePassword, trigger: "blur" }],
  phoneNum: [{ validator: validateForm.validateIphoneNum, trigger: "blur" }],
});

function handldForgetPwd() {
  forgetPwd.value = true;
}
async function forgetPwdFunc() {
  if(forgetForm.phone === '') {
    ElMessage({
      type: 'warning',
      message: '请输入手机号'
    })
    return
  }
  let timer = setInterval(() => {
    validateTime.value--;
    if (validateTime.value === 0) {
      forgetText.value = "获取验证码";
      validateTime.value = 60;
      clearInterval(timer);
    } else {
      forgetText.value = `${validateTime.value}s后重新发送`;
    }
  }, 1000);
  forgetText.value = `${validateTime.value}s后重新发送`;
  const params = {
    method: "post",
    data: { phone: forgetForm.phone },
  };
  const result = await getValidateNumer(params);
}
</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  min-width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
  background: url("@/assets/image/Login.jpg");
  background-size: 100%;
  .validate-code-num {
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
