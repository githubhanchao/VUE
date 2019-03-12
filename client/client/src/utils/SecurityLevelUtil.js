const low = '低';
const medium = '中';
const high = '高';
const LOGIN_PASS = 'login_pass';
const PAY_PASS = 'pay_pass';
const BIND_MOBILE = 'bind_mobile';
const GOOGLE_AUTHEN = 'google_authen';

function computeSecurityLevel(params) {
  const newSecurityList = [];
  const list = {
    name: 'auth_captch',
    status: false,
    children: [],
  };
  for (let i = 0; i < params.length; i++) {
    let result = params[i];
    if (result.name === LOGIN_PASS) {
      newSecurityList.push(result);
    }
    if (result.name === PAY_PASS) {
      newSecurityList.push(result);
    }
    if (result.name === BIND_MOBILE) {
      list.children.push(result);
    }
    if (result.name === GOOGLE_AUTHEN) {
      list.children.push(result);
    }
  }
  for (let i = 0; i < list.children.length; i++) {
    let result = list.children[i];
    if (result.status) {
      list.status = true;
      break;
    }
  }
  newSecurityList.push(list);
  let levelNum = 0;
  let total = newSecurityList.length;
  newSecurityList.forEach((value) => {
    if (value.status) {
      levelNum++;
    }
  });
  if (total < 3) {
    if (levelNum < 2) {
      return {
        level: low,
        percent: (levelNum / total * 100),
      };
    }
    if (levelNum === 2) {
      return {
        level: high,
        percent: (levelNum / total * 100),
      };
    }
  }
  if (total === 3) {
    if (levelNum === 1) {
      return {
        level: low,
        percent: (levelNum / total * 100),
      };
    }
    if (levelNum === 2) {
      return {
        level: medium,
        percent: (levelNum / total * 100),
      };
    }
    if (levelNum === 3) {
      return {
        level: high,
        percent: (levelNum / total * 100),
      };
    }
  }
  return {
    level: '',
    percent: '',
  };
}

export default {
  high,
  medium,
  low,
  computeSecurityLevel,
};
