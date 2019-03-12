<template>
  <div id="verify-secret" class="verify-secret">
    <div id="verify-title" class="verify-title">验证密钥</div>
    <el-form ref="formModel" :model="formModel" :rules="rules" label-width="120px"
             label-position="left" onsubmit="return false;">
      <el-form-item prop="originSecretStr" label="加签前原始串">
        <el-input size="large" v-model="formModel.originSecretStr" type="textarea" :rows="inputRows" resize="none"
                  :maxlength="secretMaxLength"></el-input>
      </el-form-item>
      <el-form-item prop="signSecretStr" label="验签">
        <el-input size="large" v-model="formModel.signSecretStr" type="textarea" :rows="inputRows" resize="none"
                  :maxlength="secretMaxLength"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="primary" @click="verifyBtnClicked" :loading="verifyLoading" class="verify-button">验 证</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'verify-secret',
    props: {

    },
    data() {

      const validateOriginSecret = (rule, value, callback) => {
        if (value === null || value === '') {
          callback(new Error('密钥串不能为空'));
          return;
        }

        callback();
      };

      const validateSignSecret = (rule, value, callback) => {
        if (value === null || value === '') {
          callback(new Error('密钥串不能为空'));
          return;
        }

        callback();
      };

      return {
        verifyLoading: false,
        secretMaxLength: 250,
        inputRows: 3,
        formModel: {
          originSecretStr: '',
          signSecretStr: '',
        },
        rules: {
          originSecretStr: [
            { validator: validateOriginSecret, trigger: 'blur' },
          ],
          signSecretStr: [
            { validator: validateSignSecret, trigger: 'blur' },
          ],
        },
      };
    },
    created() {

    },
    computed: {

    },
    methods: {

      verifyBtnClicked() {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.verifySecret();
          }
        });
      },

      verifySecret() {
        this.verifyLoading = true;
        Vue.axios.post(UrlConfig.SECRET_CHECK_SIGN_PATH, {
          row_chars: this.formModel.originSecretStr,
          sign: this.formModel.signSecretStr,
        })
        .then(() => {
          this.verifyLoading = false;
          this.$message({
            showClose: true,
            message: '密钥验证成功',
            type: 'error',
          });
        })
        .catch((error) => {
          this.verifyLoading = false;
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
  .verify-title {
    font-size: 20px;
    margin-bottom: 50px;
  }

  .verify-button {
    width: 100px;
    height: 42px;
    box-sizing: border-box;
  }

</style>
