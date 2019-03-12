
<template>
  <div id="set-trade-pwd" class="set-trade-pwd">
    <div class="textTip">
      <span id="card-title" class="card-title">设置支付密码</span>
      <span id="tip" class="tip">支付密码需要8位以上，由字母、数字、符号组成并且不能与登录密码相同</span>
    </div>
    <el-form id="form" class="form" ref="formModel" :model="formModel" :rules="rules" onsubmit="return false;">
      <el-form-item prop="tradePwd">
        <el-input size="large" id="tradePwd" class="tradePwd" v-model="formModel.tradePwd" type="password"
                  placeholder="支付密码..." @keydown.enter.native="confirmBtnClicked"></el-input>
      </el-form-item>
      <el-form-item prop="tradePwdAgain">
        <el-input id="tradePwdAgain" class="tradePwdAgain" size="large" v-model="formModel.tradePwdAgain" type="password"
                  placeholder="再次输入支付密码..." @keydown.enter.native="confirmBtnClicked"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="large" id="confirmBtn" class="confirmBtn" type="primary" @click="confirmBtnClicked" :loading="confirmBtnLoading">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import { mapState } from 'vuex';
  import store from '@/vuex/store';
  import ActionTypeName from '@/utils/ActionTypeName';
  import ResponeUtil from '@/utils/ResponeUtil';
  import FlowControlConst from '@/utils/FlowControlConst';
  import ServiceAuthTypeConst from '@/utils/ServiceAuthTypeConst';
  import StringUtil from "@/utils/StringUtil";

  export default {
    name: 'retrieve-pwd-reset',
    props: {
      confirmBtnLoading: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      const validateTradePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'));
          return;
        }

        if (!(StringUtil.validateLoginPwdFormat(value))) {
          callback(new Error('密码必须由字母、数字、符号组成'));
          return;
        }

        callback();
      };

      const validateTradePwdAgain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不能为空'));
          return;
        }

        if (value !== this.formModel.tradePwd) {
          callback(new Error('请确认两次密码输入一致'));
          return;
        }

        if (!(StringUtil.validateLoginPwdFormat(value))) {
          callback(new Error('密码必须由字母、数字、符号组成'));
          return;
        }

        callback();
      };

      return {
        formModel: {
          tradePwd: '',
          tradePwdAgain: '',
        },
        rules: {
          tradePwd: [
            { validator: validateTradePwd, trigger: 'blur' },
          ],
          tradePwdAgain: [
            { validator: validateTradePwdAgain, trigger: 'blur' },
          ],
        },
      };
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
            if (this.$route.query.auth_token) {
              this.$emit('setPayPwd', this.formModel.tradePwd);
              return;
            }
            this.setTradePwd();
          }
        });
      },

      resetForm() {
        this.$refs['formModel'].resetFields();
      },

      resetComp() {
        this.resetForm();
        this.formModel.tradePwd = '';
        this.formModel.tradePwdAgain = '';
      },

      setTradePwd() {
        store.dispatch(ActionTypeName.SET_TRADE_PWD, {
          auth_token: this.authInfo.auth_token,
          password: this.formModel.tradePwd,
        })
        .then(() => {
          this.$emit('setTradePwdFinishEmit');
          this.$message({
            showClose: true,
            message: '支付密码设置成功',
            type: 'success',
          });
          this.$store.dispatch(ActionTypeName.LOAD_SECURITY_LIST);
        })
        .catch((error) => {
          this.$emit('setTradePwdFailEmit');
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
          });
        });
      },
    },
  };
</script>

<style>
  .set-trade-pwd {
    width: 320px;
    height: 300px;
    margin: 0 auto;
    background-color: white;
  }

  .textTip {
    text-align: left;
  }

  .card-title {
    font-size: 20px;
    display: block;
  }

  .tip {
    margin-top: 20px;
    display: block;
  }

  .tradePwd {
    margin-top: 30px;
    box-sizing: border-box;
  }

  .tradePwdAgain {
    margin-top: 20px;
    box-sizing: border-box;
  }

  .confirmBtn {
    width: 100%;
    height: 42px;
    margin-top: 17px;
    box-sizing: border-box;
  }

  .el-form {
    padding: 0 0;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
</style>
