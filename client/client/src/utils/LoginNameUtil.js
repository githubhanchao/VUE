import StorageKeyConst from '@/utils/StorageKeyConst';

function saveOperatorName(operatorName) {
  window.localStorage.setItem(StorageKeyConst.OPERATOR_NAME, operatorName);
}

function getOperatorName() {
  return window.localStorage.getItem(StorageKeyConst.OPERATOR_NAME);
}

export default {
  saveOperatorName,
  getOperatorName,
};
