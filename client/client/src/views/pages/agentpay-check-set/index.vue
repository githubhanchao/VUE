<template>
  <div>
    <div>
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <div>
      <agentpay-check-set-comp :actionUrl="actionUrl"></agentpay-check-set-comp>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import UrlConfig from '@/utils/UrlConfig';
  import pageHeaderComp from '@components/page-header';
  import agentpayCheckSetComp from '@components/agentpay-check-set';

  export default {
    components: {
      pageHeaderComp,
      agentpayCheckSetComp,
    },
    data() {
      return {
        status: 'normal',
        actionUrl: UrlConfig.AGENTPAY_CHECK_SET_PATH,
      };
    },
    methods: {
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
    },
  }
</script>
<style>

</style>
