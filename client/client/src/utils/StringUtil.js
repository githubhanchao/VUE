/**
 * Created by huangjason on 2017/9/25.
 */

import base64 from 'js-base64';

function isUndefinedOrNullOrEmptyStr(val) {
  if (val === undefined || val === null || val === '') {
    return true;
  }

  return false;
}

function validateLoginPwdFormat(val) {
  const regexp = new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[#@!~%^&*])[a-zA-Z\\d#@!~%^&*].{7,19}$');
  return regexp.test(val);
}

function userSensitiveDataEncode(val) {
  if (!val) {
    return '';
  }
  return base64.Base64.encode(val);
}

function userSensitiveDataDecode(val) {
  if (!val) {
    return '';
  }
  return base64.Base64.decode(val);
}


export default {
  isUndefinedOrNullOrEmptyStr,
  validateLoginPwdFormat,
  userSensitiveDataEncode,
  userSensitiveDataDecode,
};
