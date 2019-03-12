/**
 * Created by huangjason on 2017/9/11.
 */
<template>
  <div class="retrieve-pwd-assist-check">
    <top-bar class="topBar"></top-bar>
    <retrieve-pwd-assist-check class="retrieveLoginPwdAssistCheckComp" @authAssitSuccess="authAssitSuccess"></retrieve-pwd-assist-check>
  </div>
</template>

<script>
  import Vue from 'vue';
  
  import topBar from '@components/top-bar';
  import retrievePwdAssistCheck from '@components/assist-captcha';

  export default {
    name: 'retrieve-pwd-reset',
    data() {
      return {
        batchOrder: '',
        nextBtnLoading: false,
      };
    },
    computed: {
    
    },
    methods: {
      authAssitSuccess(res) {
        this.$router.push({ path: '/retrieve-pwd-reset', query: { auth_token: res.data.auth_token } });
      },
    },
    components: {
      topBar,
      retrievePwdAssistCheck,
    },
  };
</script>

<style>
 .retrieveLoginPwdAssistCheckComp {
   margin-top: 10%;
 }
 .retrieve-pwd-assist-check {
   background-color: #eee;
   height: 100%;
 }
</style>
