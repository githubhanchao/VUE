<template>
  <div id="verify-trade-pwd" class="verify-trade-pwd">
    <div class="auth-title">
      <span id="card-title">支付密码</span>
    </div>
    <div class="textTip">
      <span id="tip1">涉及资金的敏感操作，需验证支付密码</span>
    </div>
    <el-form class="trade_pwd_form" ref="formModel" :model="formModel" :rules="rules" onsubmit="return false;">
      <el-form-item prop="tradePwd">
        <el-input id="tradePwd" class="tradePwd" size="large" type="password" v-model="formModel.tradePwd" placeholder="输入支付密码..."
                  @keydown.enter.native="confirmBtnClicked"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="confirm_btn" size="large" type="primary" @click="confirmBtnClicked" :loading="btnLoading">确 定</el-button>
      </el-form-item>
    </el-form>
    <el-button class="forgot_trade_pwd_btn" size="large" type="text" @click="forget">忘记或未设置支付密码？</el-button>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import StringUtil from '@/utils/StringUtil';
  import ActionTypeName from  '@/utils/ActionTypeName';

  export default {
    name: 'verify-trade-pwd',
    data() {
      const validateTradePwd = (rule, value, callback) => {
        this.authCaptchaErrStr = '';
        if (value === '') {
          callback(new Error('支付密码不能为空'));
          return;
        }
        callback();
      };

      return {
        btnLoading: false,
        formModel: {
          tradePwd: '',
        },
        rules: {
          tradePwd: [
            { validator: validateTradePwd, trigger: 'blur' },
          ],
        },
      };
    },
    created() {

    },
    computed: {
      ...mapState({
        authInfo: state => state.user.authInfo,
      }),
    },
    methods: {
      confirmBtnClicked() {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.authCheckTradePwd();
          }
        });
      },

      authCheckTradePwd() {
        this.btnLoading = true;
        this.$store.dispatch(ActionTypeName.AUTH_CHECK_TRADE_PWD_PATH, {
          auth_token: this.authInfo.auth_token,
          pay_password: StringUtil.userSensitiveDataEncode(this.formModel.tradePwd),
        })
          .then((data) => {
            console.log(data);
            this.btnLoading = false;
            this.$emit('authTradePwdFinishEmit', data);
          })
          .catch((error) => {
            this.btnLoading = false;
            console.log(error);
            this.$emit('authTradePwdFailEmit');
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      forget() {
        this.$router.push('/home/security-center');
      },
    },
  };
</script>

<style scoped>
  .verify-trade-pwd {
    width: 320px;
    height: 250px;
    margin: 0 auto;
    background-color: white;
  }
  .auth-title {
    position: relative;
  }

  .card-title {
    font-size: 20px;
  }

  .textTip {
    text-align: left;
  }

  .tip1 {
    font-size: 14px;
    /*margin-left: 10px;*/
    margin-top: 10px;
    display: block;
    color: #666666;
  }

  .confirm_btn {
    width: 100%;
    height: 42px;
    margin-top: 20px;
    box-sizing: border-box;
  }

  .trade_pwd_form {
    /*padding: 0 auto;*/
  }

  .forgot_trade_pwd_btn {
    width: 160px;
    margin-left: 0px;
    margin-top: 20px;
    padding: 0px;
  }
</style>
<style>
  .verify-trade-pwd .el-dialog__body {
    padding: 0 40px 60px 40px;
  }
</style>
