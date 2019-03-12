import Vue from 'vue';
import UrlConfig from '@/utils/UrlConfig';
import FlowControlConst from '@/utils/FlowControlConst';
import ResponeUtil from '@/utils/ResponeUtil';
import ActionTypeName from '@/utils/ActionTypeName';
import router from '@/router';
import SessionNameConst from '@/utils/SessionNameConst';
import RequestHeaderUtil from '@/utils/RequestHeaderUtil';
import LoginNameUtil from '@/utils/LoginNameUtil';
import ServiceAuthTypeConst from '@/utils/ServiceAuthTypeConst';

export function userLogin({ commit }, data) {
  return Vue.axios.post(UrlConfig.LOGIN_PATH, data)
    .then((response) => {
      commit('SET_AUTH_INFO', response.data);

      // if (response.data.auth_next_step === '') {
      //   return this.dispatch(ActionTypeName.AUTH_TOKEN, {
      //     auth_token: response.data.auth_token,
      //   })
      //   .catch((error) => Promise.reject(error));
      // }

      if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
        commit('SET_AUTH_STEP', response.data.auth_next_step);
      }

      return Promise.resolve(response);
    })
  .catch((error) => {
    this.dispatch(ActionTypeName.GET_IMAGE_CARTCHA);
    return Promise.reject(error);
  });
}

// 获取图片验证码
export function getImgCaptCha({ commit }, data) {
  return Vue.axios.post(UrlConfig.IMG_CAPTCHA_PATH, data).then((response) =>
     Promise.resolve(response.data))
  .catch((error) =>
     Promise.reject(error));
}

// 获取身份验证验证码
export function getServiceCaptCha({ commit }, data) {
  return Vue.axios.post(UrlConfig.SERVICE_CAPTCHA_PATH, data)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}

// 身份验证
export function authCaptcha({ commit }, data) {
  return Vue.axios.post(UrlConfig.AUTH_CAPTCHA_PATH, data).then((response) => {
    commit('SET_AUTH_INFO', response.data);
    if (response.data.auth_next_step === FlowControlConst.SECURITY_QUESTION) {
      router.push({ path: '/retrieve-pwd-assist-check',
        query: { auth_token: response.data.auth_token, customerNo: router.currentRoute.query.customerNo } });
      return Promise.resolve(response.data);
    }

    if (response.data.session_name === SessionNameConst.LOGIN) {
      this.dispatch(ActionTypeName.AUTH_TOKEN, {
        auth_token: response.data.auth_token,
        // 记录日志需要
        user_name: data.user_name,
      });
      return Promise.resolve(response.data);
    }

    if (response.data.session_name === SessionNameConst.RETRIEVE_PWD) {
      // router.push('/retrieve-pwd-reset');
      router.push({ path: '/retrieve-pwd-reset', query: { auth_token: response.data.auth_token } });
      return Promise.resolve(response.data);
    }

    if (response.data.session_name === SessionNameConst.TRADE_PASSWORD) {

    }

    return Promise.resolve(response.data);
  })
  .catch((error) =>
    // if (ResponeUtil.RESP_CODES.TOKEN_EXPIRED === error.respCode) {
    //   return Promise.reject(error);
    // }
     Promise.reject(error));
}

// 用户Token身份验证
export function authWithToken({ commit }, data) {
  return Vue.axios.post(UrlConfig.AUTH_TOKEN_LOGIN_PATH, data).then((response) => {
    console.log('用户Token身份验证成功了');

    commit('SET_AUTH_INFO', response.data);
    RequestHeaderUtil.saveAccessTokenHeader(response.data.auth_token);
    LoginNameUtil.saveOperatorName(response.data.operator_name);
    router.push('/home');
  })
  .catch((error) => {
    console.log('用户Token身份验证失败了');
    console.log(error);
    return Promise.reject(error);
  });
}

// 找回登录密码校验账户
export function retrievePwdCheck({ commit }, data) {
  return Vue.axios.post(UrlConfig.RETRIEVE_PWD_CHECK_PATH, data)
    .then((response) => {
      commit('SET_AUTH_INFO', response.data);

      // 请求业务不成功
      if (response.respCode !== ResponeUtil.RESP_CODES.SUCCESS) {
        return Promise.reject(response);
      }

      if (response.data.auth_next_step === '') {
        // router.push('/retrieve-pwd-reset');
        router.push({ path: '/retrieve-pwd-reset', query: { auth_token: response.data.auth_token } });
      }

      if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
        // router.push('/auth-captcha');
        router.push({ path: '/auth-captcha',
          query: {
            auth_token: response.data.auth_token,
            sms: response.data.bind_mobile,
            word: response.data.googleAuthen,
            customerNo: response.data.customerNo,
            nCustomer: response.data.isNewCustomer,
          },
        });
      }

      return Promise.resolve(response);
    })
  .catch((error) => {
      // 重新获取验证码
    this.dispatch(ActionTypeName.GET_IMAGE_CARTCHA);
    return Promise.reject(error);
  });
}

// 找回登录密码重设密码
export function retrievePwdReset({ commit }, data) {
  return Vue.axios.post(UrlConfig.RETRIEVE_PWD_RESET_PATH, data).then((response) => {
    if (response.respCode === ResponeUtil.RESP_CODES.SUCCESS) {
      router.push('/login');
      return Promise.resolve(response);
    }
  })
  .catch((error) => Promise.reject(error));
}

// 获取用户概要信息
export function loadUserSummary({ commit }) {
  return Vue.axios.get(UrlConfig.LOAD_USER_SUMMARY_PATH)
    .then((response) => {
      commit('SAVE_USERINFO_INFO', response.data);
      return Promise.resolve(response);
    })
    .catch((error) => {});
}

// 获取用户权限列表
export function loadUserPermissions({ commit }) {
  return Vue.axios.get(UrlConfig.LOAD_USER_PERSSIONS_PATH)
    .then((response) => {
      commit('SAVE_PERMISSION_INFO', response.data.resource_tree);
      Vue.permission.authorize(response.data.resource_hash);
      return Promise.resolve(response);
    })
    .catch((error) => Promise.reject(error));
}

// 用户登出
export function userLogout({ commit }, data) {
  return Vue.axios.post(UrlConfig.LOGOUT_PATH, data)
    .then((response) => Promise.resolve(response))
    .catch((error) =>
      Promise.reject(error));
}

// 获取用户安全清单
export function loadUserSecurityLists({ commit }) {
  return Vue.axios.get(UrlConfig.LOAD_SECURITY_LIST_PATH)
    .then((response) => {
      commit('SAVE_SECURITY_LIST_INFO', response.data);
      return Promise.resolve(response);
    })
    .catch((error) => Promise.reject(error));
}

// 支付密码身份验证
export function authCheckTradePwd({ commit }, data) {
  return Vue.axios.post(UrlConfig.TRADE_PWD_CHECK_PATH, data).then((response) => {
    commit('SET_AUTH_INFO', response.data);
    return Promise.resolve(response.data);
  })
  .catch((error) =>
    Promise.reject(error));
}

// 修改商户IP
export function updateCustomerIp({ commit }, data) {
  return Vue.axios.post(UrlConfig.IP_ADD, data).then((response) => {
    commit('SET_AUTH_INFO', response.data);
    return Promise.resolve(response.data);
  })
    .catch((error) =>
      Promise.reject(error));
}

// 获取商户IP
export function getCustomerIp({ commit }, data) {
  return Vue.axios.get(UrlConfig.IP_LIST_PATH, data)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}
