/**
 * Created by huangjason on 2017/9/11.
 */
<template>
  <div id="retrieve-login-pwd" class="retrieve-login-pwd">
    <top-bar class="topBar"></top-bar>
    <retrieve-login-pwd-check class="retrieveLoginPwdCheckComp"
                              :imgCaptChaStr="imgCaptchaSvg"
                              @nextEmit="next"
                              @imgCaptchaEmit="changeImgCaptcha"
                              :nextBtnLoading="nextBtnLoading">

    </retrieve-login-pwd-check>
  </div>
</template>

<script>
  import store from '@/vuex/store';
  import { mapActions, mapState } from 'vuex';

  import ActionTypeName from '@/utils/ActionTypeName';
  import StringUtil from '@/utils/StringUtil';
  import ResponeUtil from '@/utils/ResponeUtil';
  import HintUtil from '@/utils/HintUtil';

  import topBar from '@components/top-bar';
  import retrieveLoginPwdCheck from '@components/retrieve-pwd-check';

  export default {
    name: 'retrieve-pwd-check',
    data() {
      return {
        nextBtnLoading: false,
        imgCaptchaSvg: '',
        imgCaptchaToken: '',
        authCaptchaErrStr: '',
      };
    },
    created: function () {
      this.changeImgCaptcha();
    },
    computed: {

    },
    methods: {
      ...mapActions([ActionTypeName.GET_IMAGE_CARTCHA, ActionTypeName.RETRIEVE_PWD_CHECK]),

      next(val) {
        this.nextBtnLoading = true;
        this.retrievePwdCheck({
          user_name: val.accountName,
          img_captcha: val.imgCaptcha,
          img_captcha_token: this.imgCaptchaToken,
        })
        .then((response) => {
          this.nextBtnLoading = false;
        })
        .catch((error) => {
          this.nextBtnLoading = false;
          this.changeImgCaptcha();
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
            duration: 2000,
          });
        });
      },

      changeImgCaptcha() {
        this.getImgCaptCha()
          .then((data) => {
            if (!data.img_url) {
              this.imgCaptchaSvg = '';
            } else {
              this.imgCaptchaSvg = data.img_url.indexOf('http') === 0 ? data.img_url : window.appConfig.apiUrlPrefix + data.img_url;
            }
            this.imgCaptchaToken = data.img_captcha_token;
          })
          .catch((error) => {
            this.loginErrStr = error.respMessage || ResponeUtil.RESP_MSG.SERVICE_EXP;
          });
      },
    },
    components: {
      topBar,
      retrieveLoginPwdCheck,
    },
  };
</script>

<style>
 .retrieveLoginPwdCheckComp {
   margin-top: 10%;
 }

 .retrieve-login-pwd {
   background-color: #eee;
   height: 100%;
 }

</style>
