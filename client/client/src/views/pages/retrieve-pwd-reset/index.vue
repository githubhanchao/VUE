/**
 * Created by huangjason on 2017/9/11.
 */
<template>
  <div id="set-login-pwd-container" class="set-login-pwd-container">
    <top-bar class="topBar"></top-bar>
    <div id="set-login-pwd" class="set-login-pwd">
      <el-card class="set-login-pwd-card">
        <retrieve-pwd-reset-comp class="setLoginPwdComp" @confirmBtnClickedEmit="confirm"
                               :confirmBtnLoading="confirmBtnLoading"></retrieve-pwd-reset-comp>
      </el-card>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import store from '@/vuex/store';
  import { mapActions, mapState } from 'vuex';

  import ActionTypeName from '@/utils/ActionTypeName';
  import StringUtil from '@/utils/StringUtil';
  import ResponeUtil from '@/utils/ResponeUtil';
  import HintUtil from '@/utils/HintUtil';
  import UrlConfig from '@/utils/UrlConfig';
  import ActiveNextStep from '@/utils/ActiveNextStep';
  import topBar from '@components/top-bar';
  import retrievePwdResetComp from '@components/retrieve-pwd-reset';

  export default {
    name: 'retrieve-pwd-reset',
    data() {
      return {
        confirmBtnLoading: false,
        authToken: '',
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

      imgCaptchaSvg() {
        return `data:image/svg+xml;utf8,${this.$store.state.user.imgCaptchaSvg}`;
      },
    },
    methods: {
      ...mapActions([ActionTypeName.RETRIEVE_PWD_RESET]),

      confirm(val) {
        if (this.$route.query.is_active) {
          Vue.axios.post(UrlConfig.CUSTOMER_ACTIVE_LOGIN_PWD_PATH, {
              auth_token: this.authToken,
              password: val.newPwd,
            })
            .then((response) => {
              this.$store.commit('SET_AUTH_INFO', response.data);
              this.$router.push({
                path: '/set-trade-pwd',
                query: {
                  auth_token: this.authInfo.auth_token,
                },
              });
            })
            .catch((error) => {
              this.$message({
                showClose: true,
                message: error.respMessage,
                type: 'error',
              });
            });
          return;
        }
        this.confirmBtnLoading = true;
        this.retrievePwdReset({
          auth_token: this.authToken,
          password: val.newPwd,
        })
        .then((response) => {
          this.confirmBtnLoading = false;
          this.$message({
            showClose: true,
            message: '设置成功！请重新登录',
            type: 'success',
          });
        })
        .catch((error) => {
          this.confirmBtnLoading = false;
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
      retrievePwdResetComp,
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
