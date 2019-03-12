import TokenUtil from '@/utils/TokenUtil';

function saveAccessTokenHeader(accessToken) {
  TokenUtil.saveAccessToken(accessToken);
}

function getAccessTokenHeader() {
  return TokenUtil.getAccessToken();
}

function removeAccessTokenHeader() {
  return TokenUtil.removeAccessToken();
}

export default {
  saveAccessTokenHeader,
  getAccessTokenHeader,
  removeAccessTokenHeader,
};
