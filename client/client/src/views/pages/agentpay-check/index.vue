<template>
  <div class="agentpay-check-detail">
    <div>
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <div class="agentpay-check-query-cond">
      <agentpay-check-query-cond-comp :action="agentpayCheckListUrl" @onSuccessEmit="onSuccess"
                                      @onFailEmit="onFail" @startQueryEmit="startQuery" :curPageIndexProp="curPageIndex"
                                      :pageSizeProp="pageSize"></agentpay-check-query-cond-comp>
    </div>
    <agentpay-check-table-comp :loading="tableLoading" :dataSource="agentpayCheckData"
                               @handleSizeChangedEmit="handleSizeChanged" @showDetailEmit="showDetail"
                               @handleCurrentChangedEmit="handleCurrentChanged" :exportUrl="exportListUrl">
    </agentpay-check-table-comp>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import agentpayCheckQueryCondComp from '@components/agentpay-check-query-cond';
  import agentpayCheckTableComp from '@components/agentpay-check-table';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import router from '@/router';

  export default {
    name: 'agentpay-check-detail',
    components: {
      agentpayCheckQueryCondComp,
      agentpayCheckTableComp,
      pageHeaderComp,
    },
    data() {
      return {
        agentpayCheckListUrl: '',
        agentpayCheckData: null,
        tableLoading: false,
        curPageIndex: 1,
        pageSize: 20,
        exportListUrl: '',
      };
    },
    created: function () {
      this.agentpayCheckListUrl = UrlConfig.AGENTPAY_CHECK_LIST_PATH;
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
    },
    methods: {

      startQuery() {
        this.tableLoading = true;
      },

      onSuccess(data) {
        this.tableLoading = false;
        this.agentpayCheckData = data;
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
        router.push({ path: '/home/agentpay-check-detail', query: { batchId: val.batchId }});
      },
    },
  };
</script>

<style scoped="agentpay-check">

  .page-header-title {
    margin-bottom: 20px;
  }

  .agentpay-check-query-cond {
    margin-bottom: 20px;
  }

</style>
