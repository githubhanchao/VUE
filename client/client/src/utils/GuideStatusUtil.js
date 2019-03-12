import StorageKeyConst from '@/utils/StorageKeyConst';

function setGuideStatus(status) {
  if (window.sessionStorage) {
    window.sessionStorage.setItem(StorageKeyConst.GUIDE_STATUS, status);
  }
}

function getGuideStatus() {
  if (window.sessionStorage) {
    const status = window.sessionStorage.getItem(StorageKeyConst.GUIDE_STATUS);
    if (status === 'true') {
      return  true;
    }
    return false;
  }
}

function removeGuideStatus() {
  return window.sessionStorage.removeItem(StorageKeyConst.GUIDE_STATUS);
}
export default {
  setGuideStatus,
  getGuideStatus,
  removeGuideStatus,
};
