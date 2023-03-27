import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = "/api";
const ajaxJSON = (url, method, data, params) => {
  return new Promise((reslove, reject) => {
    axios({
      url: BASE_URL + url,
      method,
      data,
      params,
      Headers: {
        "Content-Type": "application/json;charset=utf-8",
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
      Headers: {
        "Content-Type": "application/x-www-form-unlencoded",
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

export function getValidateNumer({url, method, data}){
    return ajax(url, method, data)
}