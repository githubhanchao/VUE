import StorageKeyConst from '@/utils/StorageKeyConst';

function setSearchStatus(status) {
  if (window.sessionStorage) {
    window.sessionStorage.setItem(StorageKeyConst.SEARCH_STATUS, status);
  }
}

function getSearchStatus() {
  if (window.sessionStorage) {
    const status = window.sessionStorage.getItem(StorageKeyConst.SEARCH_STATUS);
    if (status === 'true') {
      return  true;
    }
    return false;
  }
}

export default {
  setSearchStatus,
  getSearchStatus,
};
