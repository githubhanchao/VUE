/**
 * Created by huangjason on 2017/9/11.
 */
<template>
  <div id="auth-captcha" class="auth-captcha">
    <top-bar class="topBar"></top-bar>
    <el-card id="auth-captcha-card" class="auth-captcha-card">
      <auth-captcha-comp class="authCaptchaComp" :auth_token="authToken"
                         :noSecurityList="true"
                         :servAuthSmsVisibleProp="servAuthSmsVisible"
                         :servAuthWordVisibleProp="servAuthWordVisible"
                         :accountNo="operator_name"
                         :isNewCustomer="isNewCustomer">
      </auth-captcha-comp>
    </el-card>
  </div>
</template>

<script>
  import topBar from '@components/top-bar';
  import authCaptchaComp from '@components/auth-captcha';

  import { mapActions, mapState } from 'vuex';

  import FlowControlConst from '@/utils/FlowControlConst';

  import ActionTypeName from '@/utils/ActionTypeName';
  import ServiceAuthTypeConst from '@/utils/ServiceAuthTypeConst';
  import ResponeUtil from '@/utils/ResponeUtil';

  export default {
    name: 'auth-captcha',
    data() {
      return {
        optName: '',
        authToken: '',
        servAuthSmsVisible: false,
        servAuthWordVisible: false,
        isNewCustomer: false,
      };
    },
    created: function () {
      this.authToken = this.$route.query.auth_token;
      this.servAuthSmsVisible = this.$route.query.sms;
      this.servAuthWordVisible = this.$route.query.word;
      this.isNewCustomer = this.$route.query.nCustomer;
      if (!this.$store.state.user.authInfo.operator_name) {
        this.$message({
          showClose: true,
          message: '页面已刷新,请重新找回密码',
          type: 'error',
        });
        this.$router.push('/retrieve-pwd-check');
      }
    },
    computed: {
      ...mapState({
        authInfo: state => state.user.authInfo,
        appMeta: state => state.meta.appMeta,
        operator_name: state => state.user.authInfo.operator_name,
      }),
    },
    methods: {

    },
    components: {
      topBar,
      authCaptchaComp,
    },
  };
</script>

<style>
  .auth-captcha-card {
    width: 400px;
    height: 380px;
    margin: 0 auto;
    margin-top: 10%;
  }

 .auth-captcha {
   background-color: #eee;
   height: 100%;
 }

</style>
