/**
 * Created by huangjason on 2017/9/11.
 */
<template>
  <div id="auth-finish" class="auth-finish">
    <top-bar class="topBar"></top-bar>
    <auth-finish-comp class="authFinishComp"></auth-finish-comp>
  </div>
</template>

<script>
  import topBar from '@components/top-bar';
  import authFinishComp from '@components/auth-finish';

  export default {
    name: 'auth-finish',
    data() {
      return {

      };
    },
    components: {
      topBar,
      authFinishComp,
    },
  };
</script>

<style>
  .authFinishComp {
    margin-top: 10%;
  }

  .auth-finish {
    background-color: #eee;
    height: 100%;
  }

</style>
