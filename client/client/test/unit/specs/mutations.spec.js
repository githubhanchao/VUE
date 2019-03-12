/**
 * Created by huangjason on 2017/9/27.
 */
import expect from 'chai';
import mutations from '@/vuex/user/mutations';
import store from '@/vuex/user/store';

const { SET_AUTH_CAPTCHA_ERR_INFO } = mutations;

describe('user mutations', () => {
  it('SET_AUTH_CAPTCHA_ERR_INFO', () => {
    // 模拟状态
    const data = 'Hello';
    // 应用 mutation
    SET_AUTH_CAPTCHA_ERR_INFO(store.state, data);
    // 断言结果
    expect(store.state.authCaptchaErrStr).to.equal('Hello');
  });
});
