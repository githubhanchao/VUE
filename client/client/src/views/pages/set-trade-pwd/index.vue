<template>
  <div id="set-login-pwd-container" class="set-login-pwd-container">
    <top-bar class="topBar"></top-bar>
    <div id="set-login-pwd" class="set-login-pwd">
      <el-card class="set-login-pwd-card">
        <set-trade-pwd-comp :confirmBtnLoading="confirmSetTradePwdBtnLoading"
                            ref="setTradePwdComp"
                            @setPayPwd="setTradePwdFinishEvent"></set-trade-pwd-comp>
      </el-card>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import store from '@/vuex/store';
  import { mapActions, mapState } from 'vuex';
  import setTradePwdComp from '@components/set-trade-pwd';
  import ActionTypeName from '@/utils/ActionTypeName';
  import StringUtil from '@/utils/StringUtil';
  import ResponeUtil from '@/utils/ResponeUtil';
  import HintUtil from '@/utils/HintUtil';
  import topBar from '@components/top-bar';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'retrieve-pwd-reset',
    data() {
      return {
        authToken: '',
        confirmSetTradePwdBtnLoading: false,
      };
    },
    created: function () {
      this.authToken = this.$route.query.auth_token;
    },
    computed: {
      ...mapState({
        authInfo: state => state.user.authInfo,
        authCaptchaErrStr: state => state.user.authCaptchaErrStr,
      }),
    },
    methods: {
      setTradePwdFinishEvent(val) {
        Vue.axios.post(UrlConfig.CUSTOMER_ACTIVE_PAY_PWD_PATH, {
            auth_token: this.authToken,
            pay_password: val,
          })
          .then((response) => {
            this.$message({
              showClose: true,
              message: '设置完成！请重新登录',
              type: 'success',
            });
            this.$router.push('/login');
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
    },
    components: {
      topBar,
      setTradePwdComp,
    },
  };
</script>

<style>

  .set-login-pwd-container {
    background-color: #eee;
    height: 100%;
  }
  .set-login-pwd {
    background-color: #eee;
    height: 100%;
  }
  .set-login-pwd-card {
    width: 400px;
    height: 380px;
    margin: 10% auto;
  }
  .el-card__body {
    padding: 30px;
  }

  .textTip {
    text-align: left;
  }
  span.card-title,span.tip {
    margin-left: 0;
  }
  .card-title {
    font-size: 20px;
    display: block;
  }

  .tip {
    margin-top: 10px;
    display: block;
  }

  .newPwd {
    margin-top: 40px;
    box-sizing: border-box;
  }

  .newPwdAgain {
    margin-top: 20px;
    box-sizing: border-box;
  }

  .confirmBtn {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
</style>
