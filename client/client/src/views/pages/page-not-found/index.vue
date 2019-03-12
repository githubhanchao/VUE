/**
 * Created by huangjason on 2017/9/11.
 */
<template>
  <div id="page-not-found" class="page-not-found">
    <el-card class="page-not-found-card">
      <div class="textTip">
        <span id="card-title" class="card-title">未找到页面 ：(</span>
        <span id="tip" class="tip">您访问的页面不存在，请检查链接是否正确，然后再试。</span>
      </div>
      <el-button size="large" id="gotoLoginPage" class="gotoLoginPage" @click="gotoLogin">前往登录页</el-button>
    </el-card>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      };
    },
    methods: {
      gotoLogin() {
        this.$router.push('/login');
      },
    },
  };
</script>

<style>

  .page-not-found {
    background-color: #eee;
    height: 100%;
    padding-top: 10%;
  }

  .page-not-found-card {
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
