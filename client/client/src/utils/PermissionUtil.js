import VuePermission from '@/plugins/vue-permission';
import store from '@/vuex/store';

const permission = new VuePermission({
  permissions: store.user.allPermissionName,
});

export default permission;
