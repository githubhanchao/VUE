<template>
  <div class="batch-agentpay">
    <div class="batch-agentpay-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
      <el-button size="large" class="batch_apply_btn"
                 type="primary"
                 icon="el-icon-my-add"
                 v-permission="'batch-agentpay-apply'"
          @click="gotoBatchApplyPage">批量申请</el-button>
    </div>
    <div class="batch-agentpay-query-cond">
      <batch-agentpay-query-cond-comp ref="batchAgentpayQueryCond" :action="requestUrlPath"
                                      :curPageIndexProp="curPageIndex"
                                      :pageSizeProp="pageSize"
                                      @onSuccessEmit="onSuccess"
                                      @onFailEmit="onFail"
                                      @startQueryEmit="startQuery">
      </batch-agentpay-query-cond-comp>
    </div>
    <batch-agentpay-table-comp :loading="tableLoading" :dataSource="agentpayUnverifyData"
                               @handleSizeChangedEmit="handleSizeChanged" @showDetailEmit="showDetail"
                               @handleCurrentChangedEmit="handleCurrentChanged" :exportUrl="exportListUrl"
                               @deleteBatchAgentpayEmit="deleteBatchAgentpay"></batch-agentpay-table-comp>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState, mapActions } from 'vuex';
  import pageHeaderComp from '@components/page-header';
  import batchAgentpayQueryCondComp from '@components/batch-agentpay-query-cond';
  import batchAgentpayTableComp from '@components/batch-agentpay-table';
  import UrlConfig from '@/utils/UrlConfig';
  import queryString from 'query-string';
  import RequestHeaderUtil from '@/utils/RequestHeaderUtil';
  import router from '@/router';

  export default {
    name: 'batch-agentpay',
    components: {
      pageHeaderComp,
      batchAgentpayQueryCondComp,
      batchAgentpayTableComp,
    },
    data() {
      return {
        requestUrlPath: '',
        agentpayUnverifyData: null,
        tableLoading: false,
        curPageIndex: 1,
        pageSize: 20,
        exportListUrl: '',
        queryCond: null,
      };
    },
    created: function () {
      this.requestUrlPath = UrlConfig.AGENTPAY_UNVERIFY_PATH;
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
    },
    methods: {
      startQuery(val) {
        this.tableLoading = true;

        const params = {
          startDate: val.startDate,
          endDate: val.endDate,
          batchId: val.batchId,
          uploadFileName: val.uploadFileName,
          page: val.page,
          page_size: val.page_size,
          format: 'csv',
          'access-token': RequestHeaderUtil.getAccessTokenHeader(),
        };

        this.exportListUrl = `${window.appConfig.apiUrlPrefix}/v1` + UrlConfig.AGENTPAY_UNVERIFY_PATH + '?' + queryString.stringify(params);

      },

      onSuccess(data) {
        this.tableLoading = false;
        this.agentpayUnverifyData = data;
      },

      onFail(response) {
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

      gotoBatchApplyPage() {
        router.push('/home/batch-apply');
      },

      showDetail(val) {
        router.push({ path: '/home/batch-upload-detail', query: val });
      },

      // 删除批量代付
      deleteBatchAgentpay(batchId) {
        const condParams = {
          batch_id: batchId,
        };

        Vue.axios.delete(UrlConfig.DELETE_BATCH_AGENTPAY_PATH, { data: condParams })
          .then(() => {
            this.$message({
              showClose: true,
              message: '恭喜你，代付批次删除成功',
              type: 'success',
            });
            this.$refs["batchAgentpayQueryCond"].queryAgentpayUnverifyList();
          })
          .catch((error) => {
            this.$message({
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

  .batch-agentpay-title {
    /*margin-bottom: 20px;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .batch_apply_btn {
    padding-left: 15px;
    padding-right: 20px;
  }

  .batch-agentpay {
    margin-bottom: 20px;
  }

  .batch-agentpay-query-cond {
    margin-bottom: 20px;
  }

</style>
