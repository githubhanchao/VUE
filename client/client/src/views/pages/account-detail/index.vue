<template>
  <div class="account-detail">
    <div>
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <div class="account-detail-query-cond">
      <account-detail-query-cond-comp :action="payTradeUrl" @accountDetailsOnSuccessEmit="accountDetailsOnSuccess"
                                      @accountDetailsOnFailEmit="accountDetailsOnFail"
                                      :fundFlowDirections="fundFlowDirections" :accountTypes="accountTypes"
                                      @startQueryEmit="startQuery" :curPageIndexProp="curPageIndex"
                                      :pageSizeProp="pageSize"></account-detail-query-cond-comp>
    </div>
    <account-detail-table-comp :loading="tableLoading" :dataSource="accountDetailData"
                               @handleSizeChangedEmit="handleSizeChanged"
                               @handleCurrentChangedEmit="handleCurrentChanged" :exportUrl="exportListUrl"></account-detail-table-comp>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import accountDetailQueryCondComp from '@components/account-detail-query-cond';
  import accountDetailTableComp from '@components/account-detail-table';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import queryString from 'query-string';
  import RequestHeaderUtil from '@/utils/RequestHeaderUtil';

  export default {
    name: 'account-detail',
    components: {
      accountDetailQueryCondComp,
      accountDetailTableComp,
      pageHeaderComp,
    },
    data() {
      return {
        payTradeUrl: '',
        accountDetailData: null,
        tableLoading: false,
        curPageIndex: 1,
        pageSize: 20,
        exportListUrl: '',
      };
    },
    created: function () {
      this.payTradeUrl = UrlConfig.ACCOUNT_DETAILS_PATH;
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),

      fundFlowDirections() {
        return this.appMeta.ui.fundFlowDirections;
      },

      accountTypes() {
        return this.appMeta.ui.accountTypes;
      },
    },
    methods: {

      startQuery(val) {
        this.tableLoading = true;

        const params = {
          start_time: val.start_time,
          end_time: val.end_time,
          direction: val.direction,
          account_type: val.account_type,
          page: val.page,
          page_size: val.page_size,
          format: 'csv',
          'access-token': RequestHeaderUtil.getAccessTokenHeader(),
        };
        this.exportListUrl = `${window.appConfig.apiUrlPrefix}/v1` + UrlConfig.ACCOUNT_DETAILS_PATH + '?' + queryString.stringify(params);

      },

      accountDetailsOnSuccess(data) {
        this.tableLoading = false;
        this.accountDetailData = data;
      },

      accountDetailsOnFail(error) {
        this.tableLoading = false;
        if (error.respCode === 'F400' && error.respMessage) {
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
          });
        }
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

  .page-header-title {
    margin-bottom: 20px;
  }

  .account-detail-query-cond {
    margin-bottom: 20px;
  }

  .title-txt-tip {
    margin-top: -15px;
    color: #777777;
  }

</style>
