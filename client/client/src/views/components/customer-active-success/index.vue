
<template>
  <div class="active-success">
    <div class="active-success-card">
      <div class="textTip">
        <span class="card-title">恭喜！激活成功</span>
        <span class="tip1">邮箱已激活，请继续</span>
        <span class="tip2">绑定手机并设置登录密码，即可登录系统</span>
      </div>
      <el-form id="form" ref="phoneFormModel" :model="formModel" :rules="rules" onsubmit="return false;">
        <el-form-item prop="phone_no">
          <el-input size="large" class="accountName" v-model="formModel.phone_no" placeholder="手机号码..."></el-input>
        </el-form-item>
        <el-form-item class="captcha-item" prop="service_captcha">
          <el-input class="password" size="large" v-model="formModel.service_captcha" placeholder="手机验证码..." :maxlength="captchaMaxLength"></el-input>
          <div class="err-tip">{{ authCaptchaErrStr }}</div>
          <count-down-button class="sendCaptcha" :start='countStart' @countDown="countDownInAuth" :buttonDisabled="sendCaptchaBtnDisabled"
                             @click.native="sendCaptchaBtnClicked"></count-down-button>
        </el-form-item>
        <el-form-item>
          <el-button class="nextButton" :disabled="!checked" size="large" type="primary" @click="bindPhone">下一步</el-button>
        </el-form-item>
      </el-form>
      <div style="display: flex; justify-content: space-between;">
        <el-checkbox v-model="checked">
          <span>我已阅读并同意<i class="forget-password" @click="merchantProtocol">账户使用协议</i></span>
        </el-checkbox>
        <!--<el-button :disabled="!checked" class="skip" @click="skipOver">跳过这一步</el-button>-->
      </div>
      
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState, mapActions } from 'vuex';
  import countDownButton from '../count-down-button';
  import ActionTypeName from '@/utils/ActionTypeName';
  import ServiceAuthTypeConst from '@/utils/ServiceAuthTypeConst';
  import UrlConfig from '@/utils/UrlConfig';
  import ActiveNextStep from '@/utils/ActiveNextStep';

  export default {
    components: {
      countDownButton,
    },
    props: {
      user_name: {
        type: String,
        required: true,
      },
    },
    data() {
      const validatePhoneNo = (rule, value, callback) => {
        this.authCaptchaErrStr = '';
        if (value === '') {
          callback(new Error('请输入手机号'));
          return;
        }
        if (value.length !== 11 && !(/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test())) {
          callback(new Error('手机号码输入有误'));
          return;
        }
        callback();
      };
      const validatePhoneValidateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
          return;
        }
        callback();
      };
      return {
        formModel: {
          phone_no: '',
          service_captcha: '',
        },
        countStart: false,
        captchaMaxLength: 6,
        sendCaptchaBtnDisabled: false,
        authCaptchaErrStr: '',
        checked: false,
        rules: {
          phone_no: [
            { validator: validatePhoneNo, trigger: 'blur' },
          ],
          service_captcha: [
            { validator: validatePhoneValidateCode, trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      ...mapActions([ActionTypeName.AUTH_CARTCHA, ActionTypeName.SERVICE_CARTCHA]),
      merchantProtocol() {
        window.open('/assets/merchant-protocol.html');
      },
      skipOver() {
        Vue.axios.post(UrlConfig.CUSTOMER_ACTIVE_SKIP_BIND_PHONE_NO_PATH, {
          auth_token: this.authInfo.auth_token,
        })
          .then((response) => {
            this.$store.commit('SET_AUTH_INFO', response.data);
            if (response.data.auth_next_step === ActiveNextStep.ACTIVE_LOGIN_PWD) {
              this.skipTo();
            }
          })
          .catch((error) => {
            Vue.prototype.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
      countDownInAuth() {
        this.countStart = false;
        this.sendCaptchaBtnDisabled = false;
      },
      skipTo() {
        this.$router.push({
          path: '/retrieve-pwd-reset',
          query: {
            auth_token: this.authInfo.auth_token,
            is_active: 'active',
          },
        });
      },
      sendCaptchaBtnClicked() {
        this.$refs['phoneFormModel'].validateField('phone_no', (valid) => {
          if (!valid) {
            this.sendCaptchaBtnDisabled = true;
            this.authCaptchaErrStr = '';
            this.getServiceCaptCha({
              user_name: this.user_name,
              service_captcha_type: ServiceAuthTypeConst.SMS,
              phone_no: this.formModel.phone_no,
            })
              .then(() => {
                this.countStart = true;
              })
              .catch((error) => {
                this.countStart = false;
                this.sendCaptchaBtnDisabled = false;
                this.authCaptchaErrStr = error.respMessage;
              });
          }
        });
      },
      bindPhone() {
        this.$refs['phoneFormModel'].validate((valid) => {
          if (valid) {
            this.authCaptchaErrStr = '';
            Vue.axios.post(UrlConfig.CUSTOMER_ACTIVE_BIND_PHONE_NO_PATH, {
              phone_no: this.formModel.phone_no,
              auth_token: this.authInfo.auth_token,
              service_captcha: this.formModel.service_captcha,
            })
              .then((response) => {
                this.$store.commit('SET_AUTH_INFO', response.data);
                if (response.data.auth_next_step === ActiveNextStep.ACTIVE_LOGIN_PWD) {
                  this.skipTo();
                }
              })
              .catch((error) => {
                this.countStart = false;
                this.authCaptchaErrStr = error.respMessage;
              });
          }
        });
      },
    },
    computed: {
      authInfo() {
        return this.$store.state.user.authInfo;
      },
    },
  }
</script>

<style scoped>
  .el-card__body {
    padding: 30px;
  }
  .textTip {
    text-align: left;
  }
  .card-title {
    font-size: 20px;
    display: block;
  }
  .tip1 {
    margin-top: 20px;
    display: block;
    color: #666666;
  }
  .tip2 {
    /*margin-top: 3px;*/
    display: block;
    color: #666666;
  }
  .password {
    box-sizing: border-box;
    width: 224px;
  }
  .sendCaptcha {
    box-sizing: border-box;
    width: 100px;
    margin-left: 10px;
    display: inline-block;
  }
  .nextButton {
    width: 100%;
    height: 42px;
    box-sizing: border-box;
  }
  .el-button--large {
    padding: 12px 11px;
  }
  .forget-password {
    cursor: pointer;
    color: #409EFF;
  }
  .err-tip {
    position: absolute;
    text-align: left;
    font-size: 10px;
    padding-left: 0px;
    color: red;
    margin-top: -8px;
  }
  .skip {
    border: none;
    padding: 0;
  }
</style>
<style>
  .active-success .el-form-item {
    margin-top: 30px;
  }
  .active-success .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #5a5e66;
  }
  .active-success .el-button.el-button--default:hover {
    background-color: #fff;
  }
</style>
