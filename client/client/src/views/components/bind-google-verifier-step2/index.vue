<template>
  <div class="bind-google-verifier-step2">
    <div class="dialog-div-title">
      <span class="dialog-span-title">验证动态口令码</span>
    </div>
    <div class="textTip">
      <span id="tip1"  class="tip1">请输入动态口令APP中显示的6位密码</span>
      <span id="tip2"  class="tip2">提示：若绑定多个账号，请注意区分</span>
    </div>
    <el-form class="form" ref="googleVerifyForm" :model="formModel" :rules="rules" onsubmit="return false;">
      <el-form-item class="verifier-pwd-item" prop="googleAuthen">
        <el-input class="verifier-pwd" size="large" v-model="formModel.googleAuthen" placeholder="输入6位动态口令码"
                  @keydown.enter.native="verifyBtnClicked" :maxlength="maxLength"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="verifyBtn" size="large" type="primary" @click="verifyBtnClicked">立即验证</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 10px;">
      <span class="back" @click="back">返回上一步</span>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'bind-google-verifier-step2',
    props: {
      wordToken: {
        type: String,
        required: true,
      },
    },
    data() {
      const checkGoogleAuthen = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('身份验证器密码不能为空'));
        }

        const regPattern = new RegExp(/^\d{6}$/);
        if (!regPattern.test(value)) {
          callback(new Error('身份验证器密码必须是6位整数数字'));
        }

        callback();
      };

      return {
        maxLength: 6,
        formModel: {
          googleAuthen: '',
        },
        rules: {
          googleAuthen: [
            { validator: checkGoogleAuthen, trigger: 'blur' },
          ],
        },
      };
    },
    created() {

    },
    methods: {
      verifyBtnClicked() {
        this.$refs['googleVerifyForm'].validate((valid) => {
          if (valid) {
            this.bindGoogleAuthen();
          }
        });
      },
      back() {
        this.$emit('back');
      },
      bindGoogleAuthen() {
        const condParams = {
          word_token: this.wordToken,
          word: this.formModel.googleAuthen,
        };
        Vue.axios.put(UrlConfig.VERIFY_BIND_WORD_PATH, condParams)
          .then((response) => {
            this.$emit('googleAuthenBindSuccEmit');
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
    },
    components: {

    },
  };
</script>
<style scoped>
  .bind-google-verifier-step2 {
    width: 320px;
    height: 300px;
    margin: 0 auto;
    background-color: white;
  }

  .dialog-span-title {
    font-size: 20px;
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

  .verifyBtn {
    width: 100%;
    height: 42px;
    margin-top: 20px;
    box-sizing: border-box;
  }

  .dialog-div-title {
    position: relative;
  }

  .verifier-pwd-item {
    margin-top: 40px;
  }
  .back {
    font-size: 14px;
    cursor: pointer;
  }
</style>
<style>
  .el-radio__input.is-checked+.el-radio__label {
    font-weight: 700;
  }
</style>
