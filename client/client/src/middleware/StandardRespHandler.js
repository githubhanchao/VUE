/**
 * Created by huangjason on 2017/9/22.
 */

import ResponeUtil from '../utils/ResponeUtil';
import router from '@/router';
import Vue from 'vue';

// https://zh.wikipedia.org/wiki/%E5%8D%95%E4%B8%80%E5%8A%9F%E8%83%BD%E5%8E%9F%E5%88%99
// 违反面向对象设计原则的SCP原则，强烈建议改动，不要找到任何点去 填充大量逻辑代码

function succResponseHandle(response) {
  // if (!(response.data) || !(response.data.respCode)) {
  //   const data = ResponeUtil.formatErrResp(ResponeUtil.RESP_CODES.SVR_EXCEPTION, ResponeUtil.RESP_MSG.SERVICE_EXP);
  //   return Promise.reject(data);
  // }
  //
  // if (response.data.respCode === ResponeUtil.RESP_CODES.SUCCESS) {
  //   return response.data;
  // }
  //
  // return Promise.reject(response.data);

  return response;
}

function errResponseHandle(error) {
  // if (!error.response) {
  //   return Promise.reject(ResponeUtil.formatErrResp(ResponeUtil.RESP_CODES.NETWORK_ERR, '网络异常'));
  // }
  let data = error;
  //
  // if (!data) {
  //   switch (error.response.status) {
  //     case 404:
  //       data = ResponeUtil.formatErrResp(ResponeUtil.RESP_CODES.NOT_FOUND, '资源不存在');
  //       break;
  //     case 500:
  //       data = ResponeUtil.formatErrResp(ResponeUtil.RESP_CODES.SVR_ERR, '服务器内部错误');
  //       break;
  //     default:
  //       data = ResponeUtil.formatErrResp(ResponeUtil.RESP_CODES.UNKNOWN_ERR, '未知错误');
  //       break;
  //   }
  //
  //   if (data.hasOwnProperty('respErrorDetails')) {
  //     console.error(data.respErrorDetails);
  //   }
  //
  //   return Promise.reject(data);
  // }

  if (error.respCode === ResponeUtil.RESP_CODES.UNAUTHORIZED) {
    data = ResponeUtil.formatErrResp(ResponeUtil.RESP_CODES.UNAUTHORIZED, '页面已过期，请重新登录');
    router.push('/login');
    Vue.prototype.$message({
      showClose: true,
      message: '页面已过期，请重新登录',
      type: 'error',
    });
  }

  return Promise.reject(data);
}

export default {
  succResponseHandle,
  errResponseHandle,
};
