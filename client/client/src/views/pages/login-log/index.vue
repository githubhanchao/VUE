<template>
  <div id="login-log" class="login-log">
    <div class="operator-manager-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <login-log-table-comp></login-log-table-comp>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import loginLogTableComp from '@components/login-log-table';
  import pageHeaderComp from '@components/page-header';

  export default {
    name: 'login-log',
    components: {
      pageHeaderComp,
      loginLogTableComp,
    },
    data() {
      return {
      };
    },
    created: function () {

    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
    },
    methods: {

    },
  };
</script>

<style>

  .operator-manager-title {
    /*margin-bottom: 20px;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
