<template>
  <div id="auth-captcha-login" class="auth-captcha-login" v-if="visible">
    <div class="auth-title">
      <el-button id="backBtn" class='el-icon-my-Arrow-Left backBtn' type="text" @click="backBtnClicked"></el-button>
      <span id="card-title" class="card-title">身份验证</span>
    </div>
    <div class="textTip">
      <span id="tip1" class="tip1">为了提高您账户的安全性，请输入验证码</span>
      <span id="tip2" class="tip2">若当前验证遇到问题，请尝试更换其它验证方式。</span>
    </div>
    <el-form id="form" class="form" ref="ruleForm2" :model="ruleFormModel" :rules="rules2" onsubmit="return false;" v-if="authBtnVisible">
      <el-form-item class="validate-type">
        <el-radio-group v-model="verifyMode" @change="radioGroupChanged">
          <el-radio :label="servAuthWord" v-if="servAuthWordVisible">动态口令码</el-radio>
          <el-radio :label="servAuthSms" v-if="servAuthSmsVisible">手机验证</el-radio>
          <!--<el-radio class="servAuthEmail" :label="servAuthEmail">邮箱验证</el-radio>-->
          <el-tooltip class="item servAuthEmail" effect="dark" content="" placement="top">
            <div slot="content" style="width: 300px;">
              <span>重要提示：基于安全及可用性的考量，系统不再推荐使用邮箱验证，并将逐步停止该验证方式。</span>
            </div>
            <el-radio v-show="authByEmail" :label="servAuthEmail">邮箱验证</el-radio>
          </el-tooltip>
        </el-radio-group>
      </el-form-item>
      <el-form-item id="captcha-item" class="captcha-item" prop="captcha">
        <el-input id="captCha" class="captCha" size="large" v-model="ruleFormModel.captcha"
                  placeholder="验证码..." v-if="sendCaptchaBtnVisible"
                  @keydown.enter.native="authCaptchaBtnClicked" :maxlength="captchaMaxLength"></el-input>
        <el-input class="wordCaptCha" size="large" v-model="ruleFormModel.captcha" placeholder="动态口令码..."
                  @keydown.enter.native="authCaptchaBtnClicked" :maxlength="captchaMaxLength" v-else></el-input>
        <div class="err-tip">{{ authCaptchaErrStr }}</div>
        <count-down-button id="sendCaptcha" class="sendCaptcha" :start='countStart' @countDown="countDownInAuth"
                           :buttonDisabled="sendCaptchaBtnDisabled" v-if="sendCaptchaBtnVisible"
                           @click.native="sendCaptchaBtnClicked" :countDownDuration="countDownDuration"></count-down-button>
      </el-form-item>
      <el-form-item>
        <el-button id="continueBtn" class="continueBtn" size="large" type="primary" @click="authCaptchaBtnClicked" :loading="authCaptchaBtnLoading">{{ authCaptchaBtnTitle }}</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 50px;" v-else>
      <span style="font-weight: 700; color: red;">邮件服务已经不支持，如需帮助，请联系管理员！</span>
    </div>
  </div>
</template>

<script>
  import countDownButton from '../count-down-button';
  import ServiceAuthTypeConst from '@/utils/ServiceAuthTypeConst';

  export default {
    name: 'auth-captcha-login',
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      countStart: {
        type: Boolean,
        required: true,
      },
      authCaptchaBtnLoading: {
        type: Boolean,
        required: true,
      },
      authCaptchaBtnTitle: {
        type: String,
      },
      countDownDuration: {
        type: Number,
        default: 60,
      },
      authCaptchaErrStr: {
        type: String,
      },
      sendCaptchaBtnDisabled: {
        type: Boolean,
        default: false,
      },
      servAuthWordVisible: {
        type: Boolean,
        default: false,
      },
      servAuthSmsVisible: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      servAuthWordVisible() {
        this.setVerifyMode();
      },

      servAuthSmsVisible() {
        this.setVerifyMode();
      },
    },
    computed: {
      authByEmail() {
        return this.$store.state.meta.appMeta.ui.featureAuthByEmail;
      },
      authBtnVisible() {
        if (!this.servAuthWordVisible && !this.servAuthSmsVisible) {
          if (!this.$store.state.meta.appMeta.ui.featureAuthByEmail) {
            return false;
          }
          return true;
        }
        return true;
      },
    },
    data() {
      const validateCaptcha = (rule, value, callback) => {
        this.$emit('validateCaptchaEmit');
        if (value === '') {
          callback(new Error('验证码不能为空'));
          return;
        }
        if (value.length < 6) {
          callback(new Error('验证码无效'));
          return;
        }

        callback();
      };

      return {
        servAuthSms: ServiceAuthTypeConst.SMS,
        servAuthEmail: ServiceAuthTypeConst.EMAIL,
        servAuthWord: ServiceAuthTypeConst.WORD,
        verifyMode: ServiceAuthTypeConst.EMAIL,
        captchaMaxLength: 6,
        sendCaptchaBtnVisible: true,

        ruleFormModel: {
          captcha: '',
        },
        rules2: {
          captcha: [
            { validator: validateCaptcha, trigger: 'blur' },
          ],
        },

      };
    },
    components: {
      countDownButton,
    },
    methods: {
      setVerifyMode() {
        if (this.servAuthWordVisible) {
          this.sendCaptchaBtnVisible = false;
          this.verifyMode = ServiceAuthTypeConst.WORD;
          return;
        }
        if (this.servAuthSmsVisible) {
          this.verifyMode = ServiceAuthTypeConst.SMS;
          return;
        }
        this.verifyMode = ServiceAuthTypeConst.EMAIL;
      },

      backBtnClicked() {
        this.ruleFormModel.captcha = '';
        this.$emit('backBtnEmit');
      },

      sendCaptchaBtnClicked() {
        this.resetForm();
        this.$emit('sendCaptchaEmit', {
          service_captcha_type: this.verifyMode,
        });
      },

      authCaptchaBtnClicked() {
        this.$refs['ruleForm2'].validate((valid) => {
          if (valid) {
            this.$emit('authCaptchaEmit', {
              captcha: this.ruleFormModel.captcha,
              service_captcha_type: this.verifyMode,
            });
          }
        });
      },

      countDownInAuth() {
        this.$emit('countDownInAuthEmit');
      },

      radioGroupChanged(val) {
        this.resetForm();
        this.verifyMode = val;
        this.ruleFormModel.captcha = '';
        this.sendCaptchaBtnVisible = this.verifyMode !== ServiceAuthTypeConst.WORD;
        this.$emit('radioGroupChangedEmit', {
          service_captcha_type: val,
        });
      },

      resetForm() {
        this.$refs['ruleForm2'].resetFields();
      },
    },
  };
</script>
<style scoped>
  .auth-captcha-card {
    width: 400px;
    height: 380px;
    margin: 0 auto;
  }

  .el-card__body {
    padding: 30px;
  }

  .card-title {
    font-size: 20px;
    text-align: center;
  }

  .backBtn {
    position: absolute;
    left: 0;
    text-align: left;
    /*margin-left: 10px;*/
    padding: 5px;
  }
  .el-icon-my-Arrow-Left {
    font-size: 20px !important;
    color: #2d2f33!important;
    font-weight: 700!important;
  }
  .textTip {
    text-align: left;
  }

  .tip1 {
    font-size: 14px;
    /*margin-left: 10px;*/
    margin-top: 20px;
    display: block;
    color: #666666;
  }

  .tip2 {
    font-size: 14px;
    /*margin-left: 10px;*/
    /*margin-top: 10px;*/
    display: block;
    color: #666666;
  }

  .captCha {
    box-sizing: border-box;
    width: 220px;
  }
  .wordCaptCha {
    box-sizing: border-box;
    width: 100%;
  }
  .sendCaptcha {
    box-sizing: border-box;
    width: 100px;
    margin-left: 10px;
    display: inline-block;
  }

  .continueBtn {
    width: 100%;
    height: 42px;
    margin-top: 20px;
    box-sizing: border-box;
  }

  .el-button--large {
    padding: 12px 11px;
  }

  .form {
    margin: 20px auto;
  }

  .auth-title {
    position: relative;
  }
  .validate-type {
    text-align: left;
  }

  .err-tip {
    position: absolute;
    text-align: left;
    font-size: 10px;
    padding-left: 0px;
    color: red;
    margin-top: -8px;
  }
  .servAuthEmail {
    color: #aaa;
  }
  .auth-captcha-login .el-radio+.el-radio {
    margin-left: 29px;
  }
</style>
