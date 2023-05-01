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
const ajax = (url, method, data, params) => {
  return new Promise((reslove, reject) => {
    axios({
      url: BASE_URL + url,
      method,
      data,
      params,
      headers: {
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
  return ajax('/sendsms', method, data)
}
// 用户注册
export function registerUser({ method, data }) {
  return ajax('/register', method, data)
}
// 用户登录
export function loginUser({ method, data }) {
  return ajax('/login', method, data)
}
// 忘记密码
export function forgetPassword({ method, data }) {
  return ajax('/forgetPwd', method, data)
}
// 获取博客数据列表
export function getBlogList({ method, data }) {
  return ajaxJSON(`/getBlogList?tag=${data.tag}`, method)
}