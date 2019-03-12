<template>
  <div id="retrieve-login-pwd-check" class="retrieve-login-pwd-check">
    <el-card class="retrieve-login-pwd-check-card">
      <div class="textTip">
        <span id="card-title" class="card-title">取回密码</span>
        <span id="tip" class="tip">请输入账号</span>
      </div>
      <el-form id="form" class="form" ref="formModel" :model="formModel" :rules="rules" onsubmit="return false;">
        <el-form-item prop="accountName">
          <el-input size="large" id="accountName" class="accountName" v-model="formModel.accountName"
                    placeholder="账号..." @keydown.enter.native="nextBtnClicked"></el-input>
        </el-form-item>
        <el-form-item prop="imgCaptcha">
          <el-input id="password" class="password" size="large" v-model="formModel.imgCaptcha" placeholder="图片验证码..."
                    :maxlength="captchaMaxLength" @keydown.enter.native="nextBtnClicked"></el-input>
          <img :src="imgCaptChaStr" id="captchaImg" class="captchaImg" alt="看不清换一种" @click="imgCaptchaClicked"/>
        </el-form-item>
        <el-form-item>
          <el-button size="large" id="nextBtn" class="nextBtn" type="primary" @click="nextBtnClicked" :loading="nextBtnLoading">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

  export default {
    name: 'retrieve-pwd-check',
    props: {
      imgCaptChaStr: {
        type: String,
      },
      nextBtnLoading: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      const validateAccountName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('账户不能为空'));
          return;
        }

        callback();
      };

      const validateImgCaptcha = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不能为空'));
          return;
        }

        callback();
      };
      return {
        formModel: {
//          accountName: '402673978@qq.com',
          accountName: '',
          imgCaptcha: '',
        },
        captchaMaxLength: 4,
        rules: {
          accountName: [
            { validator: validateAccountName, trigger: 'blur' },
          ],
          imgCaptcha: [
            { validator: validateImgCaptcha, trigger: 'blur' },
          ],
        },
      };
    },
    methods: {

      nextBtnClicked() {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.$emit('nextEmit', {
              accountName: this.formModel.accountName,
              imgCaptcha: this.formModel.imgCaptcha,
            });
          }
        });
      },

      imgCaptchaClicked() {
        this.$emit('imgCaptchaEmit');
      },
    },
  };
</script>

<style scoped>
  .retrieve-login-pwd-check-card {
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

  .card-title {
    font-size: 20px;
    display: block;
  }

  .tip {
    margin-top: 10px;
    display: block;
  }

  .accountName {
    margin-top: 40px;
    box-sizing: border-box;
  }

  .password {
    margin-top: 20px;
    box-sizing: border-box;
  }

  .nextBtn {
    width: 100%;
    height: 42px;
    margin-top: 20px;
    box-sizing: border-box;
  }

  .captchaImg {
    width: 90px;
    height: 34px;
    position: absolute;
    right: 2px;
    bottom: 2px;
    margin-right: 4px;
    font-size: 12px;
  }

  .el-form {
    padding: 0 0;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
</style>
