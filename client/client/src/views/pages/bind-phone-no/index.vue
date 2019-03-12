/**
 * Created by huangjason on 2017/9/11.
 */
<template>
  <div id="bind-phone-no" class="bind-phone-no">
    <top-bar class="topBar"></top-bar>
    <bind-phone-no-comp class="bindPhoneNoComp"></bind-phone-no-comp>
  </div>
</template>

<script>
  import topBar from '@components/top-bar';
  import bindPhoneNoComp from '@components/bind-phone-no';

  export default {
    name: 'bind-phone-no',
    data() {
      return {

      };
    },
    components: {
      topBar,
      bindPhoneNoComp,
    },
  };
</script>

<style>
  .bindPhoneNoComp {
    margin-top: 10%;
  }

  .bind-phone-no {
    background-color: #eee;
    height: 100%;
  }

</style>
