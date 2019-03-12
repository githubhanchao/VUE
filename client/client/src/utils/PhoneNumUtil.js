const type = 'bind_mobile';

function stringfyPhoneNum(phoneNum) {
  if (phoneNum) {
    return phoneNum.substr(0, 3) + '****' + phoneNum.substr(7, 4);
  } else {
    return '';
  }
}

export default {
  type,
  stringfyPhoneNum,
}
