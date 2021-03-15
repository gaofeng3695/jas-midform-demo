import axios from 'axios';
import storage from './jas-storage';
import Vue from 'vue';

const ajax = function (type, url, oParam, isnoToken) {
  if (!isnoToken) {
    let token = storage.get('token', 1000 * 60 * 60 * 24); // 按照过期时间取token
    if (!token) { // 未取到token，重新加载
      location.reload();
      return;
    }
    url = url + '?token=' + token;
  }
  var _type = type == 'post' ? 'post' : 'get';
  let params = type == 'post' ? oParam : {
    params: {
      ...oParam
    }
  };
  url = '/jasproxy' + url;
  return new Promise((resolve, reject) => {
    axios[_type](url, params)
      .then(res => {
        let data = res.data;
        // console.log(data)
        if (data.status == -1 && data.code == "402") { // token失效或者过期，会返回-1
          Vue.prototype.$confirm('登录信息失效，请重新登录', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                // window.top.location.href = jasTools.base.rootPath + "/jasmvvm/pages/page-login/login.html";
              }
            }
          });
          return;
        }
        if (data.status == -1 && data.code == "excel-400") { // token失效或者过期，会返回-1
          Vue.prototype.$message({
            message: '当前查询条件下无数据',
            type: 'error'
          });
          return;
        }
        if (data.status == 1 || data.status == 'ok') {
          resolve(data);
        } else if (!data.status && data) {
          if (data.success == -1) {
            Vue.prototype.$message({
              message: data.msg || data.message || '服务器连接失败，请稍后再试',
              type: 'error'
            });
            reject(data);
          } else {
            resolve(data);
          }
        } else {
          Vue.prototype.$message({
            message: data.msg || data.message || '服务器连接失败，请稍后再试',
            type: 'error'
          });
          reject(data);
        }

      })
      .catch(res => {
        Vue.prototype.$message({
          message: '服务器连接失败，请稍后再试...',
          type: 'error'
        });
        reject(res);
      });
  });
};


export default {
  get: ajax.bind(null, 'get'),
  post: ajax.bind(null, 'post'),
  axios
};