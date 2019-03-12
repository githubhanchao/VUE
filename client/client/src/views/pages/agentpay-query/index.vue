<template>
  <div>
    <div>
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <div class="account-detail-query-cond">
      <agentpay-query-cond-comp :action="agentpayUrl" @onSuccessEmit="onSuccess"
                                      @onFailEmit="onFail"
                                      :agentpayStatus="agentpayStatus"
                                      @startQueryEmit="startQuery" :curPageIndexProp="curPageIndex"
                                      :pageSizeProp="pageSize"></agentpay-query-cond-comp>
    </div>
    <agentpay-batch-detail-table-comp :loading="tableLoading" :dataSource="agentpayData"
                               @handleSizeChangedEmit="handleSizeChanged" @showDetailEmit="showDetail"
                               @handleCurrentChangedEmit="handleCurrentChanged" :exportUrl="exportListUrl">
    </agentpay-batch-detail-table-comp>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import agentpayQueryCondComp from '@components/agentpay-query-cond';
  import agentpayBatchDetailTableComp from '@components/agentpay-query-table';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import queryString from 'query-string';
  import RequestHeaderUtil from '@/utils/RequestHeaderUtil';
  import router from '@/router';

  export default {
    name: 'agentpay-query',
    components: {
      agentpayQueryCondComp,
      agentpayBatchDetailTableComp,
      pageHeaderComp,
    },
    data() {
      return {
        agentpayUrl: '',
        agentpayData: null,
        tableLoading: false,
        curPageIndex: 1,
        pageSize: 20,
        exportListUrl: '',
      };
    },
    created: function () {
      this.agentpayUrl = UrlConfig.AGENTPAY_QUERY_PATH;
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),

      agentpayStatus() {
        return this.appMeta.ui.agentpayStatus;
      },
    },
    methods: {

      startQuery(val) {
        this.tableLoading = true;

        const params = {
          startDate: val.startDate,
          endDate: val.endDate,
          batchId: val.batchId,
          tradeStatus: val.tradeStatus,
          page: val.page,
          page_size: val.page_size,
          format: 'csv',
          'access-token': RequestHeaderUtil.getAccessTokenHeader(),
        };

        this.exportListUrl = `${window.appConfig.apiUrlPrefix}/v1` + UrlConfig.AGENTPAY_QUERY_PATH + '?' + queryString.stringify(params);

      },

      onSuccess(data) {
        this.tableLoading = false;
        this.agentpayData = data;
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

      showDetail(val) {
        router.push({ path: '/home/agentpay-batch-detail', query: { batchId: val.batchId }});
      },
    },
  };
</script>

<style scoped="agentpay-query">

  .page-header-title {
    margin-bottom: 20px;
  }

  .account-detail-query-cond {
    margin-bottom: 20px;
  }

</style>
