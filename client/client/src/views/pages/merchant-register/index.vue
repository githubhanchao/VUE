<template>
  <div class="retrieve-pwd-assist-check">
    <top-bar class="topBar">
      <span style="margin-right: 40px; width: 300px; text-align: right;">已有商户账号？ <span style="color: #0099ff; cursor: pointer;" @click="toLogin">立即登录</span></span>
    </top-bar>
    <merchant-register-comp class="retrieveLoginPwdAssistCheckComp"
                            :nextBtnLoading="nextBtnLoading"
                            :registerBtnContent="registerBtnContent"
                            :sendCaptchaBtnDisabled="sendCaptchaBtnDisabled"
                            :countStart="countStart"
                            :registerErrStr="registerErrStr"
                            @changeBtnDisabled="changeBtnDisabledHandle"
                            @nextEmit="nextEmitHandle"
                            @countDownInAuthEmit="resetCountDown"
                            @sendCaptchaEmit="sendServiceCaptcha"></merchant-register-comp>
  </div>
</template>
<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';
  import topBar from '@components/top-bar';
  import merchantRegisterComp from '@components/merchant-register';
  
  
  export default {
    name: 'merchant-register',
    components: {
      topBar,
      merchantRegisterComp,
    },
    data() {
      return {
        nextBtnLoading: false,
        registerBtnContent: '发送激活邮件',
        sendCaptchaBtnDisabled: true,
        countStart: false,
        registerErrStr: '',
      };
    },
    created: function () {
    
    },
    computed: {
    
    },
    methods: {
      toLogin() {
        this.$router.push('/login');
      },
      resetCountDown() {
        this.countStart = false;
        this.sendCaptchaBtnDisabled = false;
      },
      sendServiceCaptcha(val) {
        this.sendCaptchaBtnDisabled = true;
        Vue.axios.post(UrlConfig.GET_SMS_CAPTCHA_PATH, {
          user_name: val.accountName,
          service_captcha_type: val.service_captcha_type,
          phone_no: val.smsNumber,
        })
        .then((response) => {
          this.countStart = true;
        })
        .catch((error) => {
          this.sendCaptchaBtnDisabled = false;
//          this.registerErrStr = error.respMessage;
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
            duration: 2500,
          });
        });
      },
      changeBtnDisabledHandle(value, registerCountDown) {
        if (!registerCountDown) {
          this.sendCaptchaBtnDisabled = value;
        }
      },
      nextEmitHandle(params) {
        this.nextBtnLoading = true;
        Vue.axios.post(UrlConfig.MERCHANT_REGISTER_PATH, params)
          .then((response) => {
            this.$router.push({ path: '/merchant-register-success', query: { user_name: params.user_name } });
          })
          .catch((error) => {
            this.nextBtnLoading = false;
            this.countStart = false;
//            this.registerErrStr = error.respMessage;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
              duration: 2500,
            });
          });
      },
    },
    beforeDestroy() {
      document.querySelector('.el-notification').style.display = 'none';
    },
  }
</script>
<style scoped>
  .retrieveLoginPwdAssistCheckComp {
    margin-top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 85%;
  }
  .retrieve-pwd-assist-check {
    background-color: #eee;
    height: 100%;
  }
</style>
