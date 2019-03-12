/**
 * Created by huangjason on 2017/9/11.
 */
import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from '../vuex/store';
import router from '../router';
import mixins from '@/mixins';
// import VuePermission from '@/plugins/vue-permission';

import axiosNormalResponse from 'axios-normal-response';
import Permission from 'vue-permission';
import '../assets/css/iconfont.css';

import(`../assets/theme/${window.appConfig.theme}/index.css`).then(() => {
  console.log(`theme ${window.appConfig.theme} loaded!`);
});

import standardRequestHandler from '../middleware/StandardRequestHandler';
import standardRespHandler from '../middleware/StandardRespHandler';


Vue.config.productionTip = process.NODE_ENV !== 'production';

Vue.use(Permission);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.mixin(mixins);
// Vue.use(VuePermission);

console.info('----------------------');
console.info(JSON.stringify(window.appConfig, null, '\t'));
console.info('----------------------');

axios.defaults.baseURL = `${window.appConfig.apiUrlPrefix}/v1`;
axios.defaults.timeout = 180000;

// 全局统一返回拦截器
axios.interceptors.response.use(axiosNormalResponse.succResponseHandle,
  axiosNormalResponse.errResponseHandle);

// 全局统一请求拦截器
axios.interceptors.request.use(standardRequestHandler.succRequestHandle,
  standardRequestHandler.errRequestHandle);

axios.interceptors.response.use(standardRespHandler.succResponseHandle,
  standardRespHandler.errResponseHandle);

window.appVM = new Vue({
  el: '#root',
  router,
  store,
});
