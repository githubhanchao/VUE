<template>
  <div id="page-not-found" class="page-not-found register-success">
    <el-card class="page-not-found-card">
      <img src="/assets/image/mail.png" alt="" style="width: 50px; height: 50px; display: inline-block; margin-right: 20px; margin-top: 20px;">
      <div style="margin-top: 20px;">
        <div class="textTip">
          <span id="card-title" class="card-title">邮件已发出</span>
          <span id="tip" class="tip" style="margin-top: 10px;">激活邮件已发至您的邮箱 {{ user_name }}，请查收</span>
          <span class="tip">若未收到，请稍等片刻刷新邮箱或检查垃圾邮件</span>
          <span class="tip">如果一直没有收到，请点击 <a href="javascript: void(0);" @click="retrievePwd" style="color: rgb(0, 153, 255); cursor: pointer;">取回密码</a>, 设置密码后即可登录。</span>
        </div>
        <el-button size="large" id="gotoLoginPage" class="gotoLoginPage" @click="gotoLogin">前往登录页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        user_name: '',
      };
    },
    created() {
      this.user_name = this.$route.query.user_name || 'xxx@xxx.com';
    },
    methods: {
      gotoLogin() {
        this.$router.push('/login');
      },
      retrievePwd() {
        this.$router.push('/retrieve-pwd-check');
      },
    },
  };
</script>

<style scoped>
  
  .page-not-found {
    background-color: #eee;
    height: 100%;
    padding-top: 10%;
  }
  
  .page-not-found-card {
    width: 600px;
    height: 270px;
    margin: 0px auto;
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
    font-weight: 700;
  }
  
  .tip {
    margin-top: 5px;
    display: block;
  }
  
  .gotoLoginPage {
    box-sizing: border-box;
    width: 100px;
    margin-left: 350px;
    margin-top: 40px;
    display: inline-block;
  }
  
  .el-button--large {
    padding: 11px 11px;
  }
</style>
<style>
  .register-success .el-card__body {
    display: flex;
  }
</style>
