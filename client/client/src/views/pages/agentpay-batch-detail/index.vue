<template>
  <div class="agentpay-batch-detail">
    <div>
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <div class="account-detail-query-cond">
      <agentpay-detail-query-cond-comp :action="agentpayDetailUrl" @onSuccessEmit="onSuccess"
                                      @onFailEmit="onFail" :bankList="bankList"
                                      :agentpayStatus="agentpayDetailTradeStatus" :agentpayResults="agentpayResults"
                                      @startQueryEmit="startQuery" :curPageIndexProp="curPageIndex"
                                      :pageSizeProp="pageSize" :batchIdProp="batchId"></agentpay-detail-query-cond-comp>
    </div>
    <agentpay-detail-table-comp :loading="tableLoading" :dataSource="agentpayDetailData"
                               @handleSizeChangedEmit="handleSizeChanged" :exportUrl="exportListUrl"
                               @handleCurrentChangedEmit="handleCurrentChanged"></agentpay-detail-table-comp>
  </div>
</template>

<script>
  import { mapState, } from 'vuex';
  import agentpayDetailQueryCondComp from '@components/agentpay-detail-query-cond';
  import agentpayDetailTableComp from '@components/agentpay-detail-table';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import ActionTypeName from '@/utils/ActionTypeName';
  import queryString from 'query-string';
  import RequestHeaderUtil from '@/utils/RequestHeaderUtil';
  import Vue from 'vue';
  import store from '@/vuex/store';

  export default {
    name: 'agentpay-batch-detail',
    components: {
      agentpayDetailQueryCondComp,
      agentpayDetailTableComp,
      pageHeaderComp,
    },
    data() {
      return {
        agentpayDetailUrl: '',
        agentpayDetailData: null,
        tableLoading: false,
        curPageIndex: 1,
        pageSize: 20,
        batchId: '',
        bankList: [],
        exportListUrl: '',
      };
    },
    created: function () {
      this.agentpayDetailUrl = UrlConfig.AGENTPAY_DETAIL_BY_BATCHID_PATH;
      this.batchId = this.$route.query.batchId;
      this.loadBankList();
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
  
      agentpayDetailTradeStatus() {
        return this.appMeta.ui.agentpayDetailTradeStatus;
      },

      agentpayResults() {
        return this.appMeta.ui.agentpayResults;
      },
    },
    methods: {
      loadBankList() {
        this.$store.dispatch(ActionTypeName.LOAD_BANK_LIST)
          .then((response) => {
            this.bankList = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },

      startQuery(queryParams) {
        this.tableLoading = true;
        const params = {
          startDate: queryParams.startDate,
          endDate: queryParams.endDate,
          batchId: queryParams.batchId,
          tradeAccountName: queryParams.tradeAccountName,
          tradeCardname: queryParams.tradeCardname,
          tradeCustorder: queryParams.tradeCustorder,
          tradeFeedbackcode: queryParams.tradeFeedbackcode,
          tradeNo: queryParams.tradeNo,
          tradeStatus: queryParams.tradeStatus,
          page: queryParams.page,
          page_size: queryParams.page_size,
          format: 'csv',
          'access-token': RequestHeaderUtil.getAccessTokenHeader(),
        };
        this.exportListUrl = `${window.appConfig.apiUrlPrefix}/v1` + UrlConfig.AGENTPAY_DETAIL_BY_BATCHID_PATH + '?' + queryString.stringify(params);
      },

      onSuccess(data) {
        this.tableLoading = false;
        this.agentpayDetailData = data;
      },

      onFail() {
        this.tableLoading = false;
      },

      // 分页变量改变
      handleSizeChanged(val) {
        this.pageSize = val;
      },

      handleCurrentChanged(val) {
        this.curPageIndex = val;
      },
    },
  };
</script>

<style scoped="agentpay-batch-detail">

  .page-header-title {
    margin-bottom: 20px;
  }

  .account-detail-query-cond {
    margin-bottom: 20px;
  }

</style>
