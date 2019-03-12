import Vue from 'vue';
import UrlConfig from '@/utils/UrlConfig';

export function getWarningHints({ commit }, data) {
  return Vue.axios.get(UrlConfig.WARNING_HINTS, data)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}

export function loadBankList() {
  return Vue.axios.get(UrlConfig.BANK_LIST_PATH)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}

