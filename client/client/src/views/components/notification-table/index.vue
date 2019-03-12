
<template>
  <el-card class="notification-table" v-loading="loading">
    <el-table :data="notificationList" style="width: 100%">
      <el-table-column width="155" label="创建时间" prop="date_created"></el-table-column>
      <el-table-column width="200" label="订单号" prop="order_num"></el-table-column>
      <el-table-column label="总金额(元)" width="150">
        <template slot-scope="scope">
          <span style="color: #ff3366">{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通知方式" prop="notify_method_label"  width="150"></el-table-column>
      <el-table-column label="通知地址" prop="notify_address" min-width="300"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="sendNotification(notificationList[scope.$index].id)">发送通知</el-button>
          <el-button size="mini" @click="showNotificationDetail(notificationList[scope.$index].id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChanged"
        @current-change="handleCurrentChanged"
        :current-page="curPageIndex"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="notificationCount">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>

  import UrlConfig from '@/utils/UrlConfig';
  import Vue from 'vue';

  export default {
    name: 'notification-table',
    props: {
      dataSource: {
        type: Object,
      },
      loading: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        curPageIndex: 1,
        pageSize: 20,
        pageSizes: [10, 20, 30, 40],
      };
    },
    computed: {
      notificationCount() {
        if (this.dataSource === null || this.dataSource.count === undefined || this.dataSource.count === null) {
          return 0;
        }

        return this.dataSource.count;
      },

      notificationList() {
        if (this.dataSource === null || this.dataSource.list === undefined || this.dataSource.list === null) {
          return [];
        }

        return this.dataSource.list;
      },
    },
    methods: {

      handleSizeChanged(val) {
        this.$emit('handleSizeChangedEmit', val);
      },

      handleCurrentChanged(val) {
        this.$emit('handleCurrentChangedEmit', val);
      },

      // 发送通知
      sendNotification(notificationId) {
        if (notificationId === null || notificationId === undefined) {
          return;
        }

        Vue.axios.post(UrlConfig.REPLACEMENT_ORDER_NOTICE_PATH, {
          id: notificationId,
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '通知已发送',
          });
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
          });
        });
      },

      // 查看通知详情
      showNotificationDetail(notificationId) {
        this.$router.push({ path: '/home/notification-detail', query: { notificationId } });
      },
    },
  };
</script>

<style>

  .notification-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }
</style>
