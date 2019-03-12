import Vue from 'vue';
import UrlConfig from '@/utils/UrlConfig';

export function loadAccountBalance({ commit }, data) {
  return Vue.axios.get(UrlConfig.LOAD_ACCOUNT_BALANCE_PATH, data)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}

export function loadBankList() {
  return Vue.axios.get(UrlConfig.BANK_LIST_PATH)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}
