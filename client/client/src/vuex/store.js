import Vue from 'vue';
import Vuex from 'vuex';
import meta from './meta/store';
import user from './user/store';
import account from './account/store';
import notification from './user/notification/store';

Vue.use(Vuex);

const state = {

};

const store = new Vuex.Store({
  state,
  modules: {
    meta,
    user,
    account,
    notification,
  },
});

export default store;
