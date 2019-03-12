
<template>
  <div id="bind-phone-no" class="bind-phone-no">
    <div id="bind-phone-no-card" class="bind-phone-no-card">
      <div class="textTip">
        <span id="card-title" class="card-title">绑定手机</span>
        <span id="tip1" class="tip1">请输入要绑定的号码，点击获取验证码</span>
      </div>
      <el-form id="form" class="form" ref="phoneFormModel" :model="formModel" :rules="rules" onsubmit="return false;">
        <el-form-item prop="phone_no">
          <el-input size="large" id="accountName" v-model="formModel.phone_no" placeholder="手机号码..."></el-input>
        </el-form-item>
        <el-form-item id="captcha-item" class="captcha-item" prop="service_captcha">
          <el-input id="password" class="password" size="large" v-model="formModel.service_captcha"
                    @keydown.enter.native="bindPhone" placeholder="手机验证码..." :maxlength="captchaMaxLength"></el-input>
          <div class="err-tip">{{ authCaptchaErrStr }}</div>
          <count-down-button id="sendCaptcha" class="sendCaptcha" :start='countStart' @countDown="countDownInAuth" :buttonDisabled="sendCaptchaBtnDisabled"
                             @click.native="sendCaptchaBtnClicked" :countDownDuration="captchaDuration"></count-down-button>
        </el-form-item>
        <el-form-item>
          <el-button id="nextButton" class="nextButton" size="large" type="primary" @click="bindPhone">绑定</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import countDownButton from '../count-down-button';
  import ActionTypeName from '@/utils/ActionTypeName';
  import ServiceAuthTypeConst from '@/utils/ServiceAuthTypeConst';

  export default {
    name: 'bind-phone-no',
    components: {
      countDownButton,
    },
    data() {
      const validatePhoneNo = (rule, value, callback) => {
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
        this.authCaptchaErrStr = '';
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
        captchaMaxLength: 6,
        countStart: false,
        sendCaptchaBtnDisabled: false,
        authCaptchaErrStr: '',
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
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
      }),
      userInfo() {
        return this.$store.state.user.userInfo;
      },
      captchaDuration() {
        return this.appMeta.ui.captchaDuration;
      },
    },
    methods: {
      ...mapActions([ActionTypeName.AUTH_CARTCHA, ActionTypeName.SERVICE_CARTCHA]),
      countDownInAuth() {
        this.countStart = false;
        this.sendCaptchaBtnDisabled = false;
      },
      resetForm() {
        this.$refs['phoneFormModel'].resetFields();
      },
      sendCaptchaBtnClicked() {
        this.$refs['phoneFormModel'].validateField('phone_no', (valid) => {
          if (!valid) {
            this.sendCaptchaBtnDisabled = true;
            this.authCaptchaErrStr = '';
            this.getServiceCaptCha({
                user_name: this.userInfo.defaultEmail,
                service_captcha_type: ServiceAuthTypeConst.SMS,
                phone_no: this.formModel.phone_no,
              })
              .then(() => {
                this.countStart = true;
              })
              .catch((error) => {
                this.sendCaptchaBtnDisabled = false;
                this.authCaptchaErrStr = error.respMessage;
              });
          }
        });
      },
      bindPhone() {
        this.$refs['phoneFormModel'].validate((valid) => {
          if (valid) {
            this.$emit('bindPhoneNoEmit', {
              phone_no: this.formModel.phone_no,
              service_captcha: this.formModel.service_captcha,
            });
          }
        });
      },
    },
  };
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
    font-size: 12px;
    /*margin-left: 10px;*/
    margin-top: 20px;
    display: block;
    color: #666666;
  }

  .tip2 {
    font-size: 12px;
    /*margin-left: 10px;*/
    /*margin-top: 3px;*/
    display: block;
    color: #666666;
  }

  .password {
    box-sizing: border-box;
    width: 200px;
  }

  .sendCaptcha {
    box-sizing: border-box;
    width: 100px;
    margin-left: 12px;
    display: inline-block;
  }

  .nextButton {
    width: 100%;
    height: 42px;
    box-sizing: border-box;
  }

  .el-button--large {
    padding: 11px 11px;
  }
  .err-tip {
    position: absolute;
    text-align: left;
    font-size: 10px;
    padding-left: 0px;
    color: red;
    margin-top: -8px;
  }
</style>
<style scoped>
  .el-form-item {
    margin-top: 30px;
  }
</style>
