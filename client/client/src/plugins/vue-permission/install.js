
import store from '@/vuex/store';

export function install(Vue, options) {
  Vue.directive('hideByPermission', {

    update(el, binding) {
      let hasPermission = false;
      if (store.getters.allPermissionName &&
        store.getters.allPermissionName.length > 0) {
        hasPermission = store.getters.allPermissionName.indexOf(binding.value) > -1;
      }

      if (hasPermission) {
        el.hidden = true;
      }
    },

  });

  Vue.directive('disabledByPermission', {
    update(el, binding) {
      let hasPermission = false;
      if (store.getters.allPermissionName &&
        store.getters.allPermissionName.length > 0) {
        hasPermission = store.getters.allPermissionName.indexOf(binding.value) > -1;
      }

      if (hasPermission) {
        el.disabled = true;
      }
    },
  });

  Vue.prototype.$hasPermission = function (value) {
    if (store.getters.allPermissionName &&
      store.getters.allPermissionName.length > 0) {
      return store.getters.allPermissionName.indexOf(value) > -1;
    }

    return false;
  };
}
