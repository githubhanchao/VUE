import Vue from 'vue';
import UrlConfig from '@/utils/UrlConfig';
import FlowControlConst from '@/utils/FlowControlConst';
import ResponeUtil from '@/utils/ResponeUtil';
import ActionTypeName from '@/utils/ActionTypeName';
import router from '@/router';
import SessionNameConst from '@/utils/SessionNameConst';
import RequestHeaderUtil from '@/utils/RequestHeaderUtil';

// 申请修改登录密码会话
export function authLoginPwd({ commit }, data) {
  return Vue.axios.post(UrlConfig.AUTH_LOGIN_PWD_PATH, data)
    .then((response) => {
      commit('SET_AUTH_INFO', response.data);
      if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
        commit('SET_AUTH_STEP', response.data.auth_next_step);
      }
      return Promise.resolve(response);
    })
    .catch((error) => Promise.reject(error));
}

// 修改登录密码
export function modifyLoginPwd({ commit }, data) {
  return Vue.axios.post(UrlConfig.MODIFY_LOGIN_PWD_PATH, data)
    .then((response) =>
      // commit('SET_AUTH_INFO', response.data);
       Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}

// 申请设置支付密码会话
export function authTradePwd({ commit }, data) {
  return Vue.axios.post(UrlConfig.AUTH_TRADE_PWD_PATH, data)
    .then((response) => {
      commit('SET_AUTH_INFO', response.data);

      // todo !!!
      if (response.data.auth_next_step === '') {
      
      }

      if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
        commit('SET_AUTH_STEP', response.data.auth_next_step);
      }

      return Promise.resolve(response);
    })
    .catch((error) => Promise.reject(error));
}

// 设置支付密码
export function setTradePwd({ commit }, { auth_token, password }) {
  return Vue.axios.post(UrlConfig.SET_TRADE_PWD_PATH, { auth_token, password })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}

// 申请绑定手机号会话
export function authPhoneNo({ commit }, data) {
  return Vue.axios.post(UrlConfig.AUTH_BIND_PHONE_NO_PATH, data)
    .then((response) => {
      commit('SET_AUTH_INFO', response.data);
      if (response.data.auth_next_step === '') {
      
      }
      if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
        commit('SET_AUTH_STEP', response.data.auth_next_step);
      }

      return Promise.resolve(response);
    })
    .catch((error) => Promise.reject(error));
}

// 绑定手机号
export function bindPhoneNo({ commit }, data) {
  return Vue.axios.post(UrlConfig.BIND_PHONE_NO_PATH, data)
    .then((response) =>
      // commit('SET_AUTH_INFO', response.data);
       Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}

// 申请绑定谷歌身份验证会话
// export function authBindGoogleAuthen({ commit }, data) {
//   return Vue.axios.post(UrlConfig.AUTH_BIND_GOOGLE_AUTHEN_PATH, data)
//     .then((response) => {
//       commit('SET_AUTH_INFO', response.data);
//       if (response.data.auth_next_step === '') {
//         this.dispatch(ActionTypeName.AUTH_TOKEN, {
//           auth_token: response.data.auth_token,
//         });
//       }
//       if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
//         commit('SET_AUTH_STEP', response.data.auth_next_step);
//       }
//
//       return Promise.resolve(response);
//     })
//     .catch((error) => Promise.reject(error));
// }
//
// // 绑定谷歌身份验证
// export function bindGoogleAuthen({ commit }, data) {
//   return Vue.axios.post(UrlConfig.BIND_GOOGLE_AUTHEN_PATH, data)
//     .then((response) =>
//       Promise.resolve(response))
//     .catch((error) => Promise.reject(error));
// }
