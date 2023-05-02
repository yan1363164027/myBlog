import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = "/api";
const ajaxJSON = (url, method, data, params) => {
  return new Promise((reslove, reject) => {
    axios({
      url: BASE_URL + url,
      method,
      data,
      params,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: ('Bearer ' + localStorage.getItem('token')) || ''
      },
    }).then(
      (res) => {
        if (res.status === 200) {
          reslove(res.data);
        } else {
          reject("failed");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });
};
const ajax = (url, method, data, params, headers) => {
  return new Promise((reslove, reject) => {
    axios({
      url: BASE_URL + url,
      method,
      data,
      params,
      headers: headers || {
        "Content-Type": "application/x-www-form-unlencoded",
        Authorization: ('Bearer ' + localStorage.getItem('token')) || ''
      },
    }).then(
      (res) => {
        if (res.status === 200) {
          reslove(res.data);
        } else {
          reject("failed");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });
};
// 获取验证码
export function getValidateNumer({ method, data }) {
  return ajaxJSON('/sendsms', method, data)
}
// 用户注册
export function registerUser({ method, data }) {
  return ajaxJSON('/register', method, data)
}
// 用户登录
export function loginUser({ method, data }) {
  return ajaxJSON('/login', method, data)
}
// 忘记密码
export function forgetPassword({ method, data }) {
  return ajaxJSON('/forgetPwd', method, data)
}
// 获取博客数据列表
export function getBlogList({ method, data }) {
  return ajaxJSON(`/getBlogList?tag=${data.tag}&content=${data.content}`, method)
}
// 上传图片
export function uploadImage({ method, data, headers }) {
  return ajaxJSON(`/uploadImage`, method, data, headers)
}
// 发布文章
export function publishAS({ method, data, headers }) {
  return ajaxJSON(`/publishAS`, method, data, headers)
}
// 获取用户信息
export function getUserInfo({ method, data, headers }) {
  return ajaxJSON(`/getUserInfo`, method, data, headers)
}