<template>
  <div>
    <div class="textTip">
      <span id="card-title" class="card-title">{{ loginPwdOperate ? '修改' : '设置' }}登录密码</span>
      <span id="tip" class="tip">密码需要8位以上，由字母、数字、符号组成</span>
    </div>
    <el-form id="form" class="form" ref="formModel" :model="formModel" :rules="rules" onsubmit="return false;">
      <el-form-item prop="oldPwd" v-if="loginPwdOperate">
        <el-input id="oldPwd" class="oldPwd" name="oldPwd" size="large" type="password" style="display: none;" disabled autocomplete="off"></el-input>
        <el-input id="oldPwd" class="oldPwd" name="oldPwd" size="large" type="password" v-model="formModel.oldPwd" autocomplete="off" placeholder="原密码..."></el-input>
      </el-form-item>
      <el-form-item prop="newPwd">
        <el-input id="newPwd" class="newPwd" size="large" type="password" v-model="formModel.newPwd" placeholder="新密码..."></el-input>
      </el-form-item>
      <el-form-item prop="newPwdAgain">
        <el-input id="newPwdAgain" class="newPwdAgain" size="large" type="password"
                  v-model="formModel.newPwdAgain" placeholder="再次输入..."
                  @keydown.enter.native="confirmBtnClicked"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 20px;">
        <el-button size="large" id="confirmBtn" class="confirmBtn" type="primary" @click="modifyBtnClicked" :loading="confirmBtnLoading" v-if="loginPwdOperate">确定修改</el-button>
        <el-button size="large" id="confirmBtn" :disabled="btnDisabled" class="confirmBtn" type="primary" @click="confirmBtnClicked" :loading="confirmBtnLoading" v-else>确 定</el-button>
      </el-form-item>
    </el-form>
    <div v-if="protocolVisible" style="margin-top: 40px;">
      <el-checkbox v-model="checked">
        <span>我已阅读并同意<i class="forget-password" @click="merchantProtocol">账户使用协议</i></span>
      </el-checkbox>
    </div>
  </div>
</template>

<script>

  import StringUtil from "@/utils/StringUtil";

  export default {
    name: 'retrieve-pwd-reset',
    props: {
      confirmBtnLoading: {
        type: Boolean,
        required: true,
      },
      loginPwdOperate: {
        type: Boolean,
      },
    },
    data() {
      const validateOldPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('原密码不能为空'));
          return;
        }
        callback();
      };
      
      const validateNewPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('新密码不能为空'));
          return;
        }
        if (value.length < 8) {
          callback(new Error('密码需要8位以上'));
          return;
        }
        if (!(StringUtil.validateLoginPwdFormat(value))) {
          callback(new Error('密码必须由字母、数字、符号组成'));
          return;
        }

        callback();
      };

      const validateNewPwdAgain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必须再次输入密码'));
          return;
        }
        if (value.length < 8) {
          callback(new Error('密码需要8位以上'));
          return;
        }
        if (!(StringUtil.validateLoginPwdFormat(value))) {
          callback(new Error('密码必须由字母、数字、符号组成'));
          return;
        }
        if (value !== this.formModel.newPwd) {
          callback(new Error('两次密码必须一致'));
          return;
        }

        callback();
      };

      return {
        formModel: {
          oldPwd: '',
          newPwd: '',
          newPwdAgain: '',
        },
        checked: false,
        protocolVisible: false,
        rules: {
          oldPwd: [
            { validator: validateOldPwd, trigger: 'blur' },
          ],
          newPwd: [
            { validator: validateNewPwd, trigger: 'blur' },
          ],
          newPwdAgain: [
            { validator: validateNewPwdAgain, trigger: 'blur' },
          ],
        },
      };
    },
    created() {
      if (this.$route.query.skipBindPhone) {
        this.protocolVisible = true;
      }
    },
    computed: {
      btnDisabled() {
        if (this.protocolVisible) {
          if (this.checked) {
            return false;
          }
          return true;
        }
        return false;
      },
    },
    methods: {
      merchantProtocol() {
        window.open('/assets/merchant-protocol.html');
      },
      confirmBtnClicked() {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.$emit('confirmBtnClickedEmit', {
              newPwd: this.formModel.newPwd,
            });
          }
        });
      },
      resetComp() {
        this.formModel.oldPwd = '';
        this.formModel.newPwd = '';
        this.formModel.newPwdAgain = '';
        this.resetForm();
      },
      modifyBtnClicked() {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.$emit('modifyBtnClickedEmit', {
              oldPwd: this.formModel.oldPwd,
              newPwd: this.formModel.newPwd,
            });
          }
        });
      },
      resetForm() {
        this.$refs['formModel'].resetFields();
      },
    },
  };
</script>

<style scoped>
  .set-login-pwd-card {
    width: 400px;
    height: 380px;
    margin: 0 auto;
  }
  .el-card__body {
    padding: 30px;
  }

  .textTip {
    text-align: left;
  }
  span.card-title,span.tip {
    margin-left: 0;
  }
  .card-title {
    font-size: 20px;
    display: block;
  }

  .tip {
    margin-top: 10px;
    display: block;
  }

  .newPwd, .oldPwd {
    margin-top: 20px;
    box-sizing: border-box;
  }

  .newPwdAgain {
    margin-top: 20px;
    box-sizing: border-box;
  }

  .confirmBtn {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .forget-password {
    cursor: pointer;
    color: #409EFF;
  }
</style>
