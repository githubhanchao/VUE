import UrlConfig from '@/utils/UrlConfig';
import Vue from 'vue';

export function loadAppMeta({ commit }) {
  return Vue.axios.get(UrlConfig.APP_META_PATH).then((response) => {
    // 打印server端控制端广告详细
    if (response.data.ads && navigator.userAgent.indexOf('Chrome') > 0) {
      response.data.ads
        .forEach(({ text, style }) => {
          console.info.call(console, `%c${text || ''}`, style);
        });
    }

    commit('SAVE_APP_META_INFO', response.data.ui);
  })
  .catch((error) => {
    console.log(error);
  });
}

export function loadPageMeta({ commit }, data) {
  return Vue.axios.get(UrlConfig.PAGE_META_PATH, { params: data })
  .then((response) => {
    commit('SAVE_PAGE_META_INFO', response.data);
  })
  .catch((error) => {
    console.log('Page Meta 加载失败');
  });
}
