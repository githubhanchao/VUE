
// 保存APP META信息
export const SAVE_APP_META_INFO = (state, data) => {
  state.appMeta.ui = data;
};

// 保存PAGE META信息
export const SAVE_PAGE_META_INFO = (state, data) => {
  state.pageMeta = data;
};
