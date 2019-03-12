<template>
  <div class="service-info">
    <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    <service-info-comp :dataSource="serviceInfoList" @showDetailEmit="showDetail"></service-info-comp>
    <el-dialog  :visible.sync="payServiceDetailDialogVisible" v-if="payServiceDetailDialogVisible">
      <pay-service-detail-comp :formInfo="payServiceDetailInfo"></pay-service-detail-comp>
    </el-dialog>
    <el-dialog  :visible.sync="agentpayServiceDetailDialogVisible" v-if="agentpayServiceDetailDialogVisible">
      <agentpay-service-detail-comp :formInfo="agentpayServiceDetailInfo"></agentpay-service-detail-comp>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import serviceInfoComp from '@components/service-info';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import payServiceDetailComp from '@components/pay-service-detail';
  import agentpayServiceDetailComp from '@components/agentpay-service-detail';
  import serviceCode from '@/utils/ServiceCode';

  export default {
    data() {
      return {
        serviceInfoList: [],
        payServiceDetailDialogVisible: false,
        payServiceDetailInfo: {},
        agentpayServiceDetailDialogVisible: false,
        agentpayServiceDetailInfo: {},
      };
    },
    components: {
      serviceInfoComp,
      pageHeaderComp,
      payServiceDetailComp,
      agentpayServiceDetailComp,
    },
    created() {
      this.getServiceInfo();
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
    },
    methods: {
      showDetail(item) {
        if (item.service_code === serviceCode.AGENTPAY_CODE) {
          this.agentpayServiceDetailDialogVisible = true;
          this.agentpayServiceDetailInfo = item;
          return;
        }
        this.payServiceDetailDialogVisible = true;
        this.payServiceDetailInfo = item;
      },
      getServiceInfo() {
        Vue.axios.get(UrlConfig.SERVICE_INFO_PATH)
          .then((response) => {
            this.serviceInfoList = response.data.list;
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
  .service-info .el-dialog {
    width: 800px;
  }
</style>
