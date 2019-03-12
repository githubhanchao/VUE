<template>
  <div class="notification">
    <div>
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <div class="notification-query-cond">
      <notification-query-cond-comp @orderListOnSuccessEmit="orderListOnSuccess"
                                    @orderListOnFailEmit="orderListOnFail"
                                    @startQueryEmit="startQuery" :curPageIndexProp="curPageIndex"
                                    :pageSizeProp="pageSize"></notification-query-cond-comp>
    </div>
    <notification-table-comp :loading="tableLoading" :dataSource="replacementOrderData"
                               @handleSizeChangedEmit="handleSizeChanged"
                               @handleCurrentChangedEmit="handleCurrentChanged"></notification-table-comp>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import notificationQueryCondComp from '@components/notification-query-cond';
  import notificationTableComp from '@components/notification-table';
  import pageHeaderComp from '@components/page-header';

  export default {
    name: 'notification',
    components: {
      notificationQueryCondComp,
      notificationTableComp,
      pageHeaderComp,
    },
    data() {
      return {
        replacementOrderData: null,
        tableLoading: false,
        curPageIndex: 1,
        pageSize: 20,
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

      startQuery() {
        this.tableLoading = true;
      },

      orderListOnSuccess(data) {
        this.tableLoading = false;
        this.replacementOrderData = data;
      },

      orderListOnFail(error) {
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

  .notification-query-cond {
    margin-bottom: 20px;
  }


</style>
