<template>
  <div>
    <h2>邮件已失效</h2>
    <span>该邮件中的激活链接已失效，如果您无法登录，可尝试在登录页取回密码。</span>
    <div style="text-align: right">
      <el-button @click="goLogin">前往登录页</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      goLogin() {
        this.$router.push('/login');
      },
    },
  }
</script>
<style>

</style>
