<template>
  <div class="pay-trade">
    <div class="pay-trade-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <div class="pay-trade-query-cond">
      <pay-trade-query-cond-comp :action="payTradeUrl" @searchPayTradeOnSuccessEmit="searchPayTradeOnSuccess"
                                 @searchPayTradeOnFailEmit="searchPayTradeOnFail" :payWays="payWays"
                                 :payOrderStatus="payOrderStatus" @startQueryEmit="startQuery"
                                 :curPageIndexProp="curPageIndex" :pageSizeProp="pageSize"></pay-trade-query-cond-comp>
    </div>
    <pay-trade-table-comp :dataSource="payTradeData" :loading="tableLoading" :exportUrl="exportListUrl"
                  @handleSizeChangedEmit="handleSizeChanged" @handleCurrentChangedEmit="handleCurrentChanged"></pay-trade-table-comp>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import payTradeQueryCondComp from '@components/pay-trade-query-cond';
  import payTradeTableComp from '@components/pay-trade-table';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import queryString from 'query-string';
  import RequestHeaderUtil from '@/utils/RequestHeaderUtil';

  export default {
    name: 'pay-trade',
    components: {
      payTradeQueryCondComp,
      payTradeTableComp,
      pageHeaderComp,
    },
    data() {
      return {
        payTradeUrl: '',
        payTradeData: null,
        tableLoading: false,
        curPageIndex: 1,
        pageSize: 20,
        exportListUrl: '',
        queryCond: null,
      };
    },
    created: function () {
      this.payTradeUrl = UrlConfig.LOAD_PAY_TRADE_PATH;
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),

      payWays() {
        return this.appMeta.ui.payWays;
      },

      payOrderStatus() {
        return this.appMeta.ui.payOrderStatus;
      },
    },
    methods: {
      startQuery(val) {
        this.tableLoading = true;

        const params = {
          start_time: val.start_time,
          end_time: val.end_time,
          pay_way: val.pay_way,
          order_state: val.order_state,
          goods_name: val.goods_name,
          trade_no: val.trade_no,
          min_amount: val.min_amount,
          max_amount: val.max_amount,
          order_no: val.order_no,
          remark: val.remark,
          page: val.page,
          page_size: val.page_size,
          format: 'csv',
          'access-token': RequestHeaderUtil.getAccessTokenHeader(),
        };

        this.exportListUrl = `${window.appConfig.apiUrlPrefix}/v1` + UrlConfig.LOAD_PAY_TRADE_PATH + '?' + queryString.stringify(params);

      },

      searchPayTradeOnSuccess(data) {
        this.tableLoading = false;
        this.payTradeData = data;
      },

      searchPayTradeOnFail(response) {
        console.log(response);
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

<style>

  .pay-trade-title {
    margin-bottom: 20px;
  }

  .pay-trade-query-cond {
    margin-bottom: 20px;
  }

</style>
