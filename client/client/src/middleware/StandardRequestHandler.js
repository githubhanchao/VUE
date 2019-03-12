/**
 * Created by huangjason on 2017/9/22.
 */

import Vue from 'vue';
import StorageKeyConst from '@/utils/StorageKeyConst';
import RequestHeaderUtil from '@/utils/RequestHeaderUtil';

// https://zh.wikipedia.org/wiki/%E5%8D%95%E4%B8%80%E5%8A%9F%E8%83%BD%E5%8E%9F%E5%88%99
// 违反面向对象设计原则的SCP原则，强烈建议改动，不要找到任何点去 填充大量逻辑代码

function succRequestHandle(config) {
  const accessToken = RequestHeaderUtil.getAccessTokenHeader(StorageKeyConst.ACCESS_TOKEN);
  if (accessToken) {
    Vue.axios.defaults.headers.common[StorageKeyConst.ACCESS_TOKEN] = accessToken;
  } else {
    delete Vue.axios.defaults.headers.common[StorageKeyConst.ACCESS_TOKEN];
  }

  return config;
}

function errRequestHandle(error) {
  return error;
}

export default {
  succRequestHandle,
  errRequestHandle,
};
