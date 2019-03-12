
<template>
  <header class="header">
    <div class="type-page">
      <img :src="`${apiUrlPrefix}` + `${appMeta.ui.logoUrl}`" alt="" style="cursor: pointer;" @click="backToLogin">
      <span class="logo-line"></span>
      <span class="title">{{ appMeta.ui.displayName }}</span>
    </div>
    <slot></slot>
  </header>
</template>

<script>

  export default {
    name: 'top-bar',
    data() {
      return {
        apiUrlPrefix: window.appConfig.apiUrlPrefix,
        fixed: false,
      };
    },
    computed: {
    	appMeta() {
    		return this.$store.state.meta.appMeta;
      },
    },
    methods: {
      backToLogin() {
        this.$router.push('/login');
      },
    },
  };
</script>

<style scoped>
  .header {
    color: #000000;
    line-height: 60px;
    height: 60px;
    /*padding-left: 4%;*/
    text-align: left;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
  }
  .header img {
    vertical-align: middle;
    height: 40px;
    max-width: 200px ;
  }
  .title {
    font-size: 16px;
    color: #333333;
    vertical-align: middle;
  }
  .logo-line {
    display: inline-block;
    height: 16px;
    vertical-align: middle;
    border-left: 1px solid #ccc;
    margin-left: 10px;
    margin-right: 10px;
  }
  .type-page {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
</style>
