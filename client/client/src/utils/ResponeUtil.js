/**
 * Created by huangjason on 2017/9/18.
 */

const RESP_CODES = {
  SUCCESS: 'S0001',

  UNAUTHORIZED: 'F401',
  FORBIDDEN_ACCESS: 'F403',
  NOT_FOUND: 'F404',
  OFTEN_REQUEST: 'F429',
  SVR_ERR: 'F500',

  // ERROR_IMAGE_CAPTCHA: 'F1001',
  // EXPIRE_IMAGE_CAPTCHA: 'F1002',
  // INVALID_IMAGE_CAPTCHA: 'F1003',
  // EXP_SEV_IMAGE_CAPTCHA: 'F1004',

  // Email
  EMAIL_FORMAT_ILLEGAL: 'F1001',

  // Captcha
  CAPTCHA_FORMAT_ERR: 'F1002',

  // Token
  TOKEN_FORMAT_ERR: 'F1007',
  TOKEN_EXPIRED: 'F1008',
  NETWORK_ERR: 'F9997',
  SVR_EXCEPTION: 'F9998',
  UNKNOWN_ERR: 'F9999',
};

const RESP_MSG = {
  SERVICE_EXP: '服务异常',
  PAGE_EXPIRED: '页面过期，请重新登录',
};


module.exports = {
  RESP_CODES,
  RESP_MSG,

  formatErrResp(code, msg) {
    return {
      respCode: code,
      respMessage: msg,
    };
  },
};
