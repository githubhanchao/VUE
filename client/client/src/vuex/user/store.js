
import * as actions from './actions';
import * as mutations from './mutations';
import security from './security/store';

const state = {
  authStep: '',               // 身份验证步骤

  // 登录后获取的信息
  authInfo: {
    auth_token: '',
    auth_next_step: '',
    customer_no: '',
    operator_id: '',
    operator_name: '',
    role_id: '',
  },

  lastLoginTime: '',
  userInfo: {},
  permissions: {},          // 用户权限
  securityList: [],         // 安全清单
  bindPhoneStatus: true,      // 判断用户是否绑定了手机号
};

const getters = {
  authInfo: stateObj => stateObj.authInfo,
  isLogin: stateObj => {
    if (stateObj.userInfo !== null && stateObj.userInfo !== undefined) {
      return true;
    }
    return false;
  },
  allPermissionName: stateObj => {
    const names = [];
    if (stateObj.permissions === undefined ||
      stateObj.permissions.children === undefined) {
      return name;
    }
    stateObj.permissions.children.forEach((item) => {
      if (item.children && item.children.length > 0) {
        item.children.forEach((childItem) => {
          names.push(childItem.name);
        });
      } else {
        names.push(item.name);
      }
    });
    return names;
  },
};

const user = {
  state,
  actions,
  mutations,
  getters,
  modules: {
    security,
  },
};

export default user;
