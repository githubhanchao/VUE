<template>
  <div id="auth-captcha" class="auth-captcha">
    <div class="auth-title">
      <span id="card-title"  class="card-title">身份验证</span>
    </div>
    <div class="textTip">
      <span id="tip1"  class="tip1">为了提高您账户的安全性，请输入验证码</span>
      <span id="tip2"  class="tip2">若当前验证遇到问题，请尝试更换其它验证方式。</span>
    </div>
    <el-form id="form"  class="form" ref="ruleForm2" :model="ruleFormModel" :rules="rules2" onsubmit="return false;" v-if="authBtnVisible">
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
      <el-form-item id="captcha-item"  class="captcha-item" prop="captcha">
        <el-input id="captCha"  class="captCha" size="large" v-model="ruleFormModel.captcha"
                  placeholder="验证码..." v-if="sendCaptchaBtnVisible"
                  @keydown.enter.native="authCaptchaBtnClicked" :maxlength="captchaMaxLength"></el-input>
        <el-input class="wordCaptCha" size="large" v-model="ruleFormModel.captcha" placeholder="动态口令码..."
                  @keydown.enter.native="authCaptchaBtnClicked" :maxlength="captchaMaxLength" v-else></el-input>
        <div class="err-tip">{{ authCaptchaErrStr }}</div>
        <count-down-button id="sendCaptcha"  class="sendCaptcha" :start='countStart' @countDown="countDownInAuth"
                           :buttonDisabled="sendCaptchaBtnDisabled" v-if="sendCaptchaBtnVisible"
                           @click.native="sendCaptchaBtnClicked" :countDownDuration="captchaDuration"></count-down-button>
      </el-form-item>
      <el-form-item>
        <el-button id="continueBtn"  class="continueBtn" size="large" :disabled="authCaptchaReqLoading" type="primary" @click="authCaptchaBtnClicked" :loading="authCaptchaReqLoading">{{ authCaptchaReqLoading ? '验证中...':'继 续' }}</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 50px;" v-else>
      <span style="font-weight: 700; color: red;">邮件服务已经不支持，如需帮助，请联系管理员！</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';
  import { mapState, mapActions } from 'vuex';
  import countDownButton from '../count-down-button';
  import ActionTypeName from '@/utils/ActionTypeName';
  import ResponeUtil from '@/utils/ResponeUtil';
  import FlowControlConst from '@/utils/FlowControlConst';
  import ServiceAuthTypeConst from '@/utils/ServiceAuthTypeConst';
  import SecurityOptConst from '@/utils/SecurityOptConst';

  export default {
    name: 'auth-captcha',
    props: {
      auth_token: {
        type: String,
        required: true,
      },
      accountNo: {
        type: String,
      },
      verifyModeProp: {
        type: Boolean,
        default: true,
      },
      servAuthSmsVisibleProp: {
        type: Boolean,
        default: false,
      },
      servAuthWordVisibleProp: {
        type: Boolean,
        default: false,
      },
      noSecurityList: {
        type: Boolean,
        default: false,
      },
      isNewCustomer: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      const validateCaptcha = (rule, value, callback) => {
        this.authCaptchaErrStr = '';
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
        servAuthWordVisible: false,
        servAuthSmsVisible: false,
        servAuthSms: ServiceAuthTypeConst.SMS,
        servAuthEmail: ServiceAuthTypeConst.EMAIL,
        servAuthWord: ServiceAuthTypeConst.WORD,
        captchaMaxLength: 6,
        authCaptchaReqLoading: false,
        captcha: FlowControlConst.CAPTCHA,
        countStart: false,
        authCaptchaErrStr: '',
        verifyMode: ServiceAuthTypeConst.EMAIL,
        sendCaptchaBtnDisabled: false,
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
    created() {
//      this.servAuthSmsVisible = this.bindPhoneStatus;

      if (this.noSecurityList) {
        this.servAuthWordVisible = this.servAuthWordVisibleProp;
        this.servAuthSmsVisible = this.servAuthSmsVisibleProp;
        this.setVerifyMode();
      } else {
        this.loadSecurityLevel();
      }
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
      }),
      captchaDuration() {
        return this.appMeta.ui.captchaDuration;
      },
      bindPhoneStatus() {
        return this.$store.state.user.bindPhoneStatus;
      },
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
    methods: {
      ...mapActions([ActionTypeName.AUTH_CARTCHA, ActionTypeName.SERVICE_CARTCHA]),

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

      // 发送验证码
      sendCaptchaBtnClicked() {
        this.sendCaptchaBtnDisabled = true;
        this.resetForm();
        this.authCaptchaErrStr = '';
        this.getServiceCaptCha({
          user_name: this.accountNo,
          service_captcha_type: this.verifyMode,
        })
        .then(() => {
          this.countStart = true;
        })
        .catch((error) => {
          this.sendCaptchaBtnDisabled = false;
          this.authCaptchaErrStr = error.respMessage;
        });
      },

      // 身份校验
      authCaptchaEvent(captcha) {
        this.authCaptchaErrStr = '';
        this.authCaptchaReqLoading = true;
        this.authCaptcha({
          auth_token: this.auth_token,
          service_captcha: captcha,
          service_captcha_type: this.verifyMode,
          is_new_customer: this.isNewCustomer,
        })
        .then((response) => {
          this.countStart = false;
          this.$emit('authCaptchaFinishEmit', response);
        })
        .catch((error) => {
          this.countStart = false;
          this.authCaptchaReqLoading = false;
          this.$emit('authCaptchaFailEmit');
          if (error.respCode === ResponeUtil.RESP_CODES.TOKEN_EXPIRED) {
            this.$message({
              showClose: true,
              message: '页面长时间未进行操作，请重新发起',
              type: 'error',
            });
            this.countStart = false;
          } else {
            this.authCaptchaErrStr = error.respMessage;
          }
        });
      },

      authCaptchaBtnClicked() {
        this.$refs['ruleForm2'].validate((valid) => {
          if (valid) {
            this.authCaptchaEvent(this.ruleFormModel.captcha);
          }
        });
      },

      countDownInAuth() {
        this.countStart = false;
        this.sendCaptchaBtnDisabled = false;
      },

      radioGroupChanged(val) {
        this.resetForm();
        this.ruleFormModel.captcha = '';
        this.authCaptchaErrStr = '';
        this.verifyMode = val;
//        this.sendCaptchaBtnDisabled = this.verifyMode === ServiceAuthTypeConst.WORD;
        this.sendCaptchaBtnVisible = this.verifyMode !== ServiceAuthTypeConst.WORD;
      },

      resetForm() {
        this.$refs['ruleForm2'].resetFields();
      },

      resetComp() {
        this.resetForm();
        this.ruleFormModel.captcha = '';
        this.authCaptchaErrStr = '';
        this.verifyMode = this.servAuthSms;
      },

      loadSecurityLevel() {
        Vue.axios.get(UrlConfig.LOAD_SECURITY_LIST_PATH)
          .then((response) => {
            response.data.forEach((value, key, arr) => {
              if (value.name === SecurityOptConst.IDENTITY_WORD) {
                this.servAuthWordVisible = value.status;
              }
              if (value.name === SecurityOptConst.BIND_MOBILE) {
                this.servAuthSmsVisible = value.status;
              }

              this.setVerifyMode();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    components: {
      countDownButton,
    },
  };
</script>
<style scoped>
  .auth-captcha {
    width: 320px;
    height: 300px;
    margin: 0 auto;
    background-color: white;
  }

  .card-title {
    font-size: 20px;
  }

  .el-icon-my-Arrow-Left {
    font-size: 20px !important;
    color: #20a0ff!important;
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
    width: 200px;
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
</style>
<style>
  .auth-captcha .el-radio__input.is-checked+.el-radio__label {
    font-weight: 700;
  }
  .auth-captcha .el-radio+.el-radio {
    margin-left: 29px;
  }
</style>
