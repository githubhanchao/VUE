<template>
  <div>
    <div>
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <merchant-info-comp class="merchant-info" :merchantInfo="merchantInfo"></merchant-info-comp>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import MerchantInfoComp from '@components/merchant-info';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'merchant-info',
    components: {
      MerchantInfoComp,
      pageHeaderComp,
    },
    data() {
      return {
        merchantInfo: {},
      };
    },
    created() {
      this.getMerchantInfo();
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        userInfo: state => state.user.userInfo,
        pageMeta: state => state.meta.pageMeta,
        authInfo: state => state.user.authInfo,
      }),
    },
    methods: {
      getMerchantInfo() {
        Vue.axios.get(UrlConfig.MERCHANT_INFO_PATH)
          .then((response) => {
            this.merchantInfo = response.data;
          })
          .catch((error) => {
            Vue.prototype.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
    },
  };
</script>
<style>
  .merchant-info {
    background-color: #fff;
  }
</style>
