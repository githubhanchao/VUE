
<template>
  <div id="login-panel" class="login-panel">
    <el-card class="login-card">
      <transition name="login-fade">
        <login-comp :visible="!authStep" @loginEmit="login"
                    :imgCaptChaStr="imgCaptchaSvg" :loginErrStr="loginErrStr"
                    :loginBtnLoading="loginBtnLoading" :loginBtnTitle="loginBtnTitle"
                    ref="loginComp" @keyDownEmit="keyDown"
                    @loginImgCaptchaFinishEmit="loginImgCaptchaFinishEvent"
                    @loginImgCaptchaFailEmit="loginImgCaptchaFailEvent"></login-comp>
      </transition>
      <transition name="auth-captcha-fade">
        <auth-captcha-comp :visible="authStep === captcha" @backBtnEmit="backToLogin" ref="authCaptchaComp"
                            @sendCaptchaEmit="sendServiceCaptcha" @authCaptchaEmit="authCaptchaEvent"
                            :countStart="countStart" @countDownInAuthEmit="resetCountDown"
                            :sendCaptchaBtnDisabled="sendCaptchaBtnDisabled"
                            :servAuthWordVisible="servAuthWordVisible"
                            :servAuthSmsVisible="servAuthSmsVisible"
                            :authCaptchaBtnLoading="authCaptchaBtnLoading" :authCaptchaBtnTitle="authCaptchaBtnTitle"
                            @radioGroupChangedEmit="radioGroupChanged" :countDownDuration="captchaDuration"
                            :authCaptchaErrStr="authCaptchaErrStr" @validateCaptchaEmit="validateCaptcha"></auth-captcha-comp>
      </transition>
    </el-card>
  </div>
</template>

<script>
  import store from '@/vuex/store';
  import { mapActions, mapState } from 'vuex';

  import loginComp from '@components/login';
  import authCaptchaComp from '@components/auth-captcha-login';
  import FlowControlConst from '@/utils/FlowControlConst';

  import ActionTypeName from '@/utils/ActionTypeName';
  import StringUtil from '@/utils/StringUtil';
  import ServiceAuthTypeConst from '@/utils/ServiceAuthTypeConst';
  import LoginState from '@/utils/LoginState';
  import AuthValidateState from '@/utils/AuthValidateState';
  import ResponeUtil from '@/utils/ResponeUtil';
  import HintUtil from '@/utils/HintUtil';

  export default {
    name: 'login-panel',
    data() {
      return {
        captcha: FlowControlConst.CAPTCHA,
        countStart: false,
        serviceAuthType: ServiceAuthTypeConst.EMAIL,
        imgCaptchaSvg: '',
        imgCaptchaToken: '',
        loginErrStr: '',
        loginBtnLoading: false,
        keyDownControl: false,
        loginBtnTitle: '登 录',
        authCaptchaBtnLoading: false,
        authCaptchaBtnTitle: '继 续',
        authCaptchaErrStr: '',
        sendCaptchaBtnDisabled: false,
        servAuthWordVisible: false,
        servAuthSmsVisible: false,
        user_name: '',
      };
    },
    created() {

    },
    computed: {
      ...mapState({
        authInfo: state => state.user.authInfo,
        appMeta: state => state.meta.appMeta,
      }),

      authStep() {
        return (this.$store.state.user.authStep);
      },

      captchaDuration() {
        return this.appMeta.ui.captchaDuration;
      },
    },
    methods: {
      ...mapActions([ActionTypeName.LOGIN, ActionTypeName.GET_IMAGE_CARTCHA,
        ActionTypeName.AUTH_CARTCHA, ActionTypeName.SERVICE_CARTCHA,
        ActionTypeName.AUTH_TOKEN]),

      // 登录按钮是否为登录中
      loginBtnLoadingState(isLoading) {
        if (isLoading) {
          this.loginBtnLoading = true;
          this.loginBtnTitle = '登录中...';
        } else {
          this.loginBtnLoading = false;
          this.loginBtnTitle = '登 录';
        }
      },

      // 身份验证按钮状态
      authCaptchaBtnLoadingState(isLoading) {
        if (isLoading) {
          this.authCaptchaBtnLoading = true;
          this.authCaptchaBtnTitle = '验证中...';
        } else {
          this.authCaptchaBtnLoading = false;
          this.authCaptchaBtnTitle = '继 续';
        }
      },
      keyDown(val) {
        if (this.keyDownControl) {
          return;
        }
        this.keyDownControl = true;
        this.login(val);
      },
      // 登录
      login(val) {
        if (StringUtil.isUndefinedOrNullOrEmptyStr(val.accountName)) {
          this.loginErrStr = HintUtil.LOGIN_HINT.ACCOUNT_NOT_BE_NULL;
          return;
        }

        if (StringUtil.isUndefinedOrNullOrEmptyStr(val.password)) {
          this.loginErrStr = HintUtil.LOGIN_HINT.PASSWORD_NOT_BE_NULL;
          return;
        }

        if (StringUtil.isUndefinedOrNullOrEmptyStr(val.imgCaptCha)) {
          this.loginErrStr = HintUtil.LOGIN_HINT.CAPTCHA_NOT_BE_NULL;
          return;
        }

        this.loginErrStr = '';
        this.loginBtnLoadingState(true);
        this.user_name = val.accountName;

        this.userLogin({
          user_name: val.accountName,
          password: val.password,
          img_captcha: val.imgCaptCha,
          img_captcha_token: this.imgCaptchaToken,
        })
        .then((response) => {
          this.servAuthWordVisible = response.data.googleAuthen;
          this.servAuthSmsVisible = response.data.bindMobile;
          this.sendCaptchaBtnDisabled = false;
          if (response.data.auth_next_step === '') {
            this.authWithToken({
              auth_token: response.data.auth_token,
              // 记录日志需要
              user_name: val.accountName,
            }).catch((error) => Promise.reject(error));
          }
        })
        .catch((error) => {
          this.$refs["loginComp"].$refs["imgCaptcha"].changeImgCaptcha();
          this.loginBtnLoadingState(false);
          this.keyDownControl = false;
          this.loginErrStr = error.respMessage || ResponeUtil.RESP_MSG.SERVICE_EXP;
        });
      },

      // 返回登录视图
      backToLogin() {
        this.countStart = false;

        this.$store.commit('SET_AUTH_STEP', '');
        this.authCaptchaErrStr = '';
        this.loginBtnLoading = false;
        this.loginBtnTitle = '登 录';
        this.keyDownControl = false;
        this.sendCaptchaBtnDisabled = false;
      },

      // 发送验证码
      sendServiceCaptcha(val) {
        this.sendCaptchaBtnDisabled = true;
        this.authCaptchaErrStr = '';
        this.serviceAuthType = val.service_captcha_type;
        this.getServiceCaptCha({
          user_name: this.authInfo.operator_name,
          service_captcha_type: this.serviceAuthType,
        })
        .then((response) => {
          this.countStart = true;
        })
        .catch((error) => {
          this.sendCaptchaBtnDisabled = false;
          this.authCaptchaErrStr = error.respMessage;
        });
      },

      // 身份校验
      authCaptchaEvent(val) {
        this.authCaptchaErrStr = '';
        this.authCaptchaBtnLoadingState(true);

        this.authCaptcha({
          auth_token: this.authInfo.auth_token,
          service_captcha: val.captcha,
          service_captcha_type: val.service_captcha_type,
          user_name: this.user_name,
        })
        .then((response) => {
          this.countStart = false;
//          this.authCaptchaBtnLoadingState(false);
          this.loginBtnLoadingState(false);
        })
        .catch((error) => {
          this.authCaptchaBtnLoadingState(false);
          this.loginBtnLoadingState(false);
          if (error.respCode === ResponeUtil.RESP_CODES.TOKEN_EXPIRED) {
            this.$message.error(ResponeUtil.RESP_MSG.PAGE_EXPIRED);
            this.$store.commit('SET_AUTH_STEP', '');
            this.$refs['authCaptchaComp']._data.ruleFormModel.captcha = '';
            this.countStart = false;
          } else {
            this.authCaptchaErrStr = error.respMessage;
          }
        });
      },

      // 重置倒计时状态
      resetCountDown() {
        this.countStart = false;
        this.sendCaptchaBtnDisabled = false;
      },

      // 切换验证码发送方式
      radioGroupChanged(val) {
        this.authCaptchaErrStr = '';
        this.serviceAuthType = val.service_captcha_type;
        if (val.service_captcha_type === ServiceAuthTypeConst.WORD) {
          this.sendCaptchaBtnDisabled = true;
        }
      },

      // 表单校验时，清空服务端返回的错误信息
      validateCaptcha() {
        this.authCaptchaErrStr = '';
      },

      // 登录获取图片验证码成功
      loginImgCaptchaFinishEvent(val) {
        this.imgCaptchaToken = val;
      },

      // 登录获取图片验证码失败
      loginImgCaptchaFailEvent(val) {
        this.loginErrStr = val;
      },
    },
    components: {
      loginComp,
      authCaptchaComp,
    },
  };
</script>

<style>

  .el-card__body {
    padding: 30px;
  }

  .login-card {
    width: 400px;
    /*height: 410px;*/
    /*padding: 0 auto;*/
  }

  .login-fade-enter-active {
    transition: all .3s ease;
  }
  .login-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .login-fade-enter {
    transform: translateX(-400px);
    opacity: 1;
  }
  .login-fade-leave-to {
    transform: translateX(400px);
    opacity: 0;
  }
  .auth-captcha-fade-enter-active {
    transition: all .3s ease;
  }
  .auth-captcha-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .auth-captcha-fade-enter {
    transform: translateX(400px);
    opacity: 1;
  }
  .auth-captcha-fade-leave-to {
    transform: translateX(-400px);
    opacity: 0;
  }
</style>
