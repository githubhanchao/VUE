
<template>
  <div id="login" class="login" v-if="visible">
    <span id="card-title" class="card-title">请登录</span>
    <div class="err-tip" :class="{ 'el-icon-my-gantanhao1': loginErrIcon }"><span class="loginErrStr">{{ loginErrStr }}</span></div>
    <el-form id="form" class="form">
      <el-form-item>
        <el-input size="large" id="accountName" class="accountName" v-model="accountName" placeholder="账户..."></el-input>
      </el-form-item>
      <el-form-item>
        <el-input id="password" class="password" size="large"
                  type="password" v-model="password" placeholder="密码..."></el-input>
      </el-form-item>
      <el-form-item id="captcha-item" class="captcha-item">
        <el-input id="imgValidCode" class="imgValidCode" size="large" v-model="imgCaptCha" placeholder="图片验证码..."
                  @keydown.enter.native="keyDownClicked" ref="imgCaptCha" :maxlength="captchaMaxLength"></el-input>
        <!--<img :src="imgCaptChaStr" id="captChaImg" alt="看不清换一种" @click="imgCaptchaClicked"/>-->
        <img-captcha-comp :action="imgAction" ref="imgCaptcha"
                          @imgCaptchaFinishEmit="imgCaptchaFinishEvent"
                          @imgCaptchaFailEmit="imgCaptchaFailEvent"></img-captcha-comp>
      </el-form-item>
      <el-form-item>
        <el-button size="large" id="loginButton" class="loginButton"
                   type="primary" @click="loginBtnClicked" :disabled="loginBtnLoading"
                   :loading="loginBtnLoading">{{ loginBtnTitle }}</el-button>
      </el-form-item>
    </el-form>
    <div class="merchant-opreator">
      <span class="merchant-register" @click="merchantRegister" v-if="featureRegist">商户账号注册 ></span>
      <span v-else></span>
      <span class="forget-password" @click="retrieveLoginPwd">忘记密码？</span>
    </div>

  </div>
</template>

<script>
  import router from '@/router';
  import imgCaptchaComp from '@components/img-captcha';
  import UrlConfig from '@/utils/UrlConfig';
  import StringUtil from '@/utils/StringUtil';
  import LoginNameUtil from '@/utils/LoginNameUtil';

  export default {
    name: 'login',
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      imgCaptChaStr: {
        type: String,
      },
      loginErrStr: {
        type: String,
      },
      loginBtnLoading: {
        type: Boolean,
        required: true,
      },
      loginBtnTitle: {
        type: String,
      },
    },
    data() {
      return {
        accountName: LoginNameUtil.getOperatorName() || '',
        password: '',
        imgCaptCha: '',
        captchaMaxLength: 4,
      };
    },
    computed: {
      loginErrIcon() {
        return !!(this.loginErrStr);
      },
      featureRegist() {
        return this.$store.state.meta.appMeta.ui.featureRegist;
      },
      imgAction() {
//        return `${window.appConfig.apiUrlPrefix}/v1${UrlConfig.IMG_CAPTCHA_PATH}`;
        return UrlConfig.IMG_CAPTCHA_PATH;
      },
    },
    methods: {

      loginBtnClicked() {
        const temp = this.password;
        this.$emit('loginEmit', {
          accountName: this.accountName,
          password: StringUtil.userSensitiveDataEncode(this.password),
          imgCaptCha: this.imgCaptCha,
        });
        this.imgCaptCha = '';
      },
      keyDownClicked() {
        this.$emit('keyDownEmit', {
          accountName: this.accountName,
          password: StringUtil.userSensitiveDataEncode(this.password),
          imgCaptCha: this.imgCaptCha,
        });
      },
      // 取回登录密码
      retrieveLoginPwd() {
        router.push('/retrieve-pwd-check');
      },
      merchantRegister() {
        this.$router.push('/merchant-register');
      },
      imgCaptchaFinishEvent(val) {
        this.$emit('loginImgCaptchaFinishEmit', val);
      },

      imgCaptchaFailEvent(val) {
        this.$emit('loginImgCaptchaFailEmit', val);
      },
    },
    components: {
      imgCaptchaComp,
    },
  };
</script>

<style scoped>
  .login {
    position: relative;
  }
  .err-tip {
    position: absolute;
    left: 0;
    text-align: left;
    margin-top: 10px;
    color: #ff4949;
  }
  .card-title {
    font-size: 20px;
  }
  .accountName {
    margin-top: 40px;
  }
  .password {
    margin-top: 0;
  }

  .loginButton {
    /*margin-top: 40px;*/
    width: 100%;
  }
  .el-input--large .el-input__inner {
    border-radius: 2px !important;
    border-color: #bfbfbf !important;
  }
  .forget-password {
    font-size: 14px;
    cursor: pointer;
  }

  .el-form {
    /*margin: 20px auto;*/
    padding: 0 0;
    /*margin-top: 20px;*/
  }

  .captChaImg {
    width: 90px;
    height: 34px;
    position: absolute;
    right: 4px;
    top: 4px;
    font-size: 12px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  .loginErrStr {
    margin-left: 5px;
  }
  .merchant-opreator {
    display: flex;
    justify-content: space-between;
  }
  .merchant-register {
    cursor: pointer;
    font-size: 16px;
    color: #0099ff;
  }
</style>
