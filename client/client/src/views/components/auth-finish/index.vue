<template>
  <div id="auth-finish">
    <el-card class="auth-finish">
      <span class="el-icon-my-suokai"></span>
      <span class="content">完成！请牢记新密码</span>
      <span class="content">建议您定期修改，保护账号安全</span>
      <br>
      <el-button size="large" class="login" type="primary">立即登录</el-button>
    </el-card>
  </div>
</template>

<script>

  export default {
    name: 'auth-finish',
    data() {
      return {

      };
    },
    methods: {

    },
  };
</script>
<style scoped>
  .el-card__body {
    padding: 30px;
  }
  .el-icon-my-suokai {
    font-size: 120px;
    color: #ccc;
    display: block;
    margin-top: 30px;
    margin-bottom: 40px;
  }
  .auth-finish {
    width: 400px;
    height: 410px;
    margin: 40px auto;
    text-align: center;
  }
  .content {
    margin-top: 10px;
    display: block;
  }
  .login {
    width: 100%;
    margin-top: 40px;
    height: 42px;
  }
</style>
