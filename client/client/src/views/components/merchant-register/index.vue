<template>
  <div class="retrieve-login-pwd-check register">
    <el-card class="retrieve-login-pwd-check-card">
      <div class="textTip">
        <span id="card-title" class="card-title">账号注册</span>
        <span id="tip" class="tip">请填写以下信息，邮箱用于您的登录帐号</span>
      </div>
      <!--<div class="err-tip"  :class="{ 'el-icon-my-gantanhao1': loginErrIcon }"><span>{{ registerErrStr }}</span></div>-->
      <el-form class="form" ref="formModel" :model="formModel" :rules="rules" onsubmit="return false;">
        <el-form-item prop="accountName">
          <el-input size="large" class="accountName" v-model="formModel.accountName" style="margin-top: 30px;"
                    :maxlength="32" placeholder="邮箱..."></el-input>
        </el-form-item>
        <el-form-item prop="operatorName">
          <el-input size="large" class="accountName" v-model="formModel.operatorName"
                    :maxlength="32" placeholder="管理员姓名..."></el-input>
        </el-form-item>
        <el-form-item prop="smsNumber">
          <el-input size="large" class="accountName" v-model="formModel.smsNumber"
                    :maxlength="11" placeholder="手机号..."></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input class="captCha" size="large" v-model="formModel.captcha"
                    placeholder="验证码..." :maxlength="captchaMaxLength"
                    @keydown.enter.native="nextBtnClicked"></el-input>
          <count-down-button class="sendCaptcha" :start='countStart' @countDown="countDownInAuth"
                             :buttonType="buttonType"
                             :buttonDisabled="sendCaptchaBtnDisabled" :countDownDuration="countDownDuration"
                             @click.native="sendCaptchaBtnClicked"></count-down-button>
        </el-form-item>
        <el-form-item>
          <el-button size="large" id="nextBtn" class="nextBtn" type="primary" @click="nextBtnClicked" :loading="nextBtnLoading">{{ registerBtnContent }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import countDownButton from '../count-down-button';
  import ServiceAuthTypeConst from '@/utils/ServiceAuthTypeConst';
  
  export default {
    name: 'merchant-register-comp',
    components: {
      countDownButton,
    },
    props: {
      nextBtnLoading: {
        type: Boolean,
        required: true,
      },
      registerBtnContent: {
        type: String,
        required: true,
      },
      countDownDuration: {
        type: Number,
        default: 60,
      },
      sendCaptchaBtnDisabled: {
        type: Boolean,
        default: false,
      },
      countStart: {
        type: Boolean,
        required: true,
      },
//      registerErrStr: {
//        type: String,
//      },
    },
    data() {
      const validateAccountName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('邮箱不能为空'));
          return;
        }
        if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
          callback(new Error('请输入正确的邮箱'));
          return;
        }
        callback();
      };
      const validateOperatorName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('管理员姓名不能为空'));
          return;
        }
        callback();
      };
      const validateSmsNumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
          return;
        }
        if (!(/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) && value) {
          callback(new Error('手机号码输入有误'));
          return;
        }
        callback();
      };
      const validateCaptcha = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不能为空'));
          return;
        }
        callback();
      };
      return {
        formModel: {
          accountName: '',
          operatorName: '',
          smsNumber: '',
          captcha: '',
        },
        buttonType: 'primary',
        captchaMaxLength: 6,
        registerCountDown: false,
        rules: {
          accountName: [
            { validator: validateAccountName, trigger: 'blur' },
          ],
          operatorName: [
            { validator: validateOperatorName, trigger: 'blur' },
          ],
          smsNumber: [
            { validator: validateSmsNumber, trigger: 'blur' },
          ],
          captcha: [
            { validator: validateCaptcha, trigger: 'blur' },
          ],
        },
      }
    },
    watch: {
      'formModel.smsNumber': function (value) {
        if (!value) {
          this.registerCountDown = true;
          this.$emit('changeBtnDisabled', true, this.registerCountDown);
        }
        if (value) {
          this.$emit('changeBtnDisabled', false, this.registerCountDown);
          return;
        }
      },
    },
    computed: {
//      loginErrIcon() {
//        return (!!this.registerErrStr);
//      },
    },
    methods: {
      nextBtnClicked() {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.$emit('nextEmit', {
              user_name: this.formModel.accountName,
              operator_name: this.formModel.operatorName,
              default_mobile: this.formModel.smsNumber,
              verify_code: this.formModel.captcha,
            });
          }
        });
      },
      countDownInAuth() {
        this.$emit('countDownInAuthEmit');
      },
      sendCaptchaBtnClicked() {
        this.registerCountDown = true;
        this.$refs['formModel'].validateField('accountName', (valid) => {
          if (!valid) {
            this.$refs['formModel'].validateField('smsNumber', (valid) => {
              if (!valid) {
                this.$emit('sendCaptchaEmit', {
                  accountName: this.formModel.accountName,
                  operatorName: this.formModel.operatorName,
                  smsNumber: this.formModel.smsNumber,
                  service_captcha_type: ServiceAuthTypeConst.SMS,
                });
              }
            });
          }
        });
      },
    },
  }
</script>
<style scoped>
  .retrieve-login-pwd-check-card {
    width: 400px;
    height: 470px;
    margin: 0 auto;
  }
  
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
  
  .tip {
    margin-top: 10px;
    display: block;
  }
  
  .accountName {
    margin-top: 20px;
    box-sizing: border-box;
  }
  
  .nextBtn {
    width: 100%;
    height: 42px;
    margin-top: 20px;
    box-sizing: border-box;
  }
  
  .el-form {
    padding: 0 0;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .sendCaptcha {
    box-sizing: border-box;
    width: 100px;
    margin-left: 10px;
    display: inline-block;
  }
  .captCha {
    box-sizing: border-box;
    width: 220px;
    margin-top: 20px;
  }
  .err-tip {
    position: absolute;
    left: 30px;
    text-align: left;
    margin-top: 4px;
    color: #ff4949;
  }
</style>
<style>
  .register .el-card__body {
    position: relative;
  }
</style>
