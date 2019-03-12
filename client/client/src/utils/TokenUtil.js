import StorageKeyConst from '@/utils/StorageKeyConst';

function saveAccessToken(accessToken) {
  window.sessionStorage.setItem(StorageKeyConst.ACCESS_TOKEN, accessToken);
}

function getAccessToken() {
  return window.sessionStorage.getItem(StorageKeyConst.ACCESS_TOKEN);
}

function removeAccessToken() {
  return window.sessionStorage.removeItem(StorageKeyConst.ACCESS_TOKEN);
}

export default {
  saveAccessToken,
  getAccessToken,
  removeAccessToken,
};
