/**
 * Created by huangjason on 2017/9/11.
 */
<template>
  <div id="email-url-unwork" class="email-url-unwork">
    <el-card class="email-url-unwork-card">
      <div class="textTip">
        <span id="card-title" class="card-title">邮件已失效</span>
        <span id="tip" class="tip">该邮件中的激活链接已失效，如果您无法登录，可尝试在登录页取回密码。</span>
      </div>
      <el-button size="large" id="gotoLoginPage" class="gotoLoginPage">前往登录页</el-button>
    </el-card>
  </div>
</template>

<script>

  export default {
    name: 'email-url-unwork',
    data() {
      return {

      };
    },
  };
</script>

<style>

  .email-url-unwork {
    background-color: #eee;
    height: 100%;
    padding-top: 10%;
  }

  .email-url-unwork-card {
    width: 600px;
    height: 220px;
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
  }

  .tip {
    margin-top: 20px;
    display: block;
  }

  .gotoLoginPage {
    box-sizing: border-box;
    width: 100px;
    margin-left: 400px;
    margin-top: 20px;
    display: inline-block;
  }

  .el-button--large {
    padding: 11px 11px;
  }

</style>
