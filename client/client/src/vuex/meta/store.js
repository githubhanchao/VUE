
import * as actions from './actions';
import * as mutations from './mutations';

const state = {
  appMeta: {
    ui: {
      logoUrl: '',
      displayName: '',
      bakInfo: '',
      captchaDuration: 60,
      ads: [],
    },

  },
  pageMeta: {},
};

const config = {
  state,
  actions,
  mutations,
};

export default config;
