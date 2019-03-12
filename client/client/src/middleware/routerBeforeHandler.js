/**
 * Created by alex on 2017/9/24.
 */
import store from '../vuex/store';
import ActionTypeName from '../utils/ActionTypeName';
import Vue from 'vue';

let appConfigLoaded = false;

// https://zh.wikipedia.org/wiki/%E5%8D%95%E4%B8%80%E5%8A%9F%E8%83%BD%E5%8E%9F%E5%88%99
// 违反面向对象设计原则的SCP原则，强烈建议改动，不要找到任何点去 填充大量逻辑代码

export default (to, from, next) => {
  console.info('route before enter', to);

  (appConfigLoaded ? Promise.resolve() : store.dispatch(ActionTypeName.LOAD_APP_META))
    .then(() => {
      if (!appConfigLoaded) {
        // the first app-meta loaded.
        appConfigLoaded = true;
      }

      return store.dispatch(ActionTypeName.LOAD_PAGE_META, {
        page_name: to.name,
      });
    })
    .then(() => {
      next();
    })
    .catch((error) => {
      Vue.prototype.$message({
        showClose: true,
        message: error.respMessage,
        type: 'error',
      });
    });
};
