/**
 * Created by huangjason on 2017/9/11.
 */
<template>
  <div id="login" class="theme-login-body login">
    <top-bar></top-bar>
    <div class="theme-login-content">
      <div class="theme-login-panel-container">
        <login-panel></login-panel>
      </div>
    </div>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  /* eslint-disable prefer-template */

  import topBar from '@components/top-bar';
  import bottomBar from '@components/bottom-bar';
  import loginPanel from '@components/login-panel';

  import store from '@/vuex/store';
  import { mapState } from 'vuex';

  export default {
    name: 'login',
    data() {
      return {
      };
    },
    created() {
      window.document.title = this.appMeta.ui.displayName || '';
    },
    computed: {
      ...mapState({
        pageMeta: state => state.meta.pageMeta,
        appMeta: state => state.meta.appMeta,
      }),
    },
    methods: {
    },
    components: {
      topBar,
      bottomBar,
      loginPanel,
    },
  };
</script>

<style scoped>
  .login {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
