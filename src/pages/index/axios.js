import Vue from 'vue'
import axios from 'axios'
// console.log('axios init')
let instance= axios.create();
instance.defaults.baseURL = process.env.VUE_APP_apiPath;
instance.defaults.timeout = 200000;//200秒
instance.defaults.withCredentials = true; // 让ajax携带cookie
// if (window.quicker.getCookie('access_token')) {
//   axios.defaults.headers.common['authorization'] = 'Bearer ' + window.quicker.getCookie('access_token');
// }
// else {
//   common.authorize();
// }
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.method.toLowerCase() === 'get') {
    config.params._timesnap_ = new Date().getTime();
  }
  if (window.quicker.getCookie('access_token')) {
    config.headers.common['authorization'] = 'Bearer ' + window.quicker.getCookie('access_token');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  response = response.data;
  // if(response.code&&response.code!=='SUCCESS'){
  //   Vue.prototype.$message.error(response.message);
  //   return Promise.reject(error);
  // }else {
  //   return response;
  // }
  return response;
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    // common.authorize();
    return Promise.reject(error);
  }
  else {
    Vue.prototype.$message.error(error.response.data.message);
    return Promise.reject(error);
  }
});
// Vue.prototype.axios = axios;
export default instance;