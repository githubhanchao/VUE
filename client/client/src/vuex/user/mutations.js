import SecurityOptConst from '@/utils/SecurityOptConst';

// 保存用户信息
export const SAVE_USERINFO_INFO = (state, data) => {
  state.lastLoginTime = data.lastLoginTime;
  state.userInfo = data.operator;
};

// 保存用户权限信息
export const SAVE_PERMISSION_INFO = (state, data) => {
  state.permissions = data;
};

// 设置登录组件和身份验证组件显示切换
export const SET_AUTH_STEP = (state, data) => {
  state.authStep = data;
};

// 设置登录后简要信息
export const SET_AUTH_INFO = (state, data) => {
  state.authInfo = data;
};

// 设置登录后简要信息
export const SAVE_SECURITY_LIST_INFO = (state, data) => {
  state.securityList = data;
  state.bindPhoneStatus = data.find(function(item) {  if (item.name === SecurityOptConst.BIND_MOBILE) { return item; } }).status;
};
