
<template>
  <el-card class="notification-detail-card" v-loading="loading">
    <table class="notification-detail-table">
      <tr>
        <td>编号：</td>
        <td>{{ notificationDetail.id }}</td>
      </tr>
      <tr>
        <td>创建时间：</td>
        <td>{{ notificationDetail.date_created }}</td>
      </tr>
      <tr>
        <td>更新时间：</td>
        <td>{{ notificationDetail.last_updated }}</td>
      </tr>
      <tr>
        <td>业务表：</td>
        <td>{{ notificationDetail.record_table }}</td>
      </tr>
      <tr>
        <td>业务表主键：</td>
        <td>{{ notificationDetail.record_id }}</td>
      </tr>
      <tr>
        <td>签名类型：</td>
        <td>{{ notificationDetail.sign_type }}</td>
      </tr>
      <tr>
        <td>通知时间：</td>
        <td>{{ notificationDetail.notify_time }}</td>
      </tr>
      <tr>
        <td>通知ID：</td>
        <td>{{ notificationDetail.notify_id }}</td>
      </tr>
      <tr>
        <td>下次尝试时间：</td>
        <td>{{ notificationDetail.next_attemptTime }}</td>
      </tr>
      <tr>
        <td>通知状态：</td>
        <td>{{ notificationDetail.status_label }}</td>
      </tr>
      <tr>
        <td>尝试次数：</td>
        <td>{{ notificationDetail.attempts_count }}</td>
      </tr>
      <tr>
        <td>过期时间：</td>
        <td>{{ notificationDetail.time_expired }}</td>
      </tr>
      <tr>
        <td>是否已经读取验证：</td>
        <td>{{ notificationDetail.is_verify_lable }}</td>
      </tr>
      <tr>
        <td>字符集：</td>
        <td>{{ notificationDetail.output_charset }}</td>
      </tr>
      <tr>
        <td>通知地址：</td>
        <td>{{ notificationDetail.notify_address }}</td>
      </tr>
      <tr>
        <td>通知方式：</td>
        <td>{{ notificationDetail.notify_method_label }}</td>
      </tr>
      <tr>
        <td>通知内容：</td>
        <td>
          {{ notificationDetail.notify_contents }}
        </td>
      </tr>
    </table>
    <div class="back-button">
      <el-button @click="backButtonClicked">返 回</el-button>
    </div>
  </el-card>
</template>

<script>

  import UrlConfig from '@/utils/UrlConfig';
  import Vue from 'vue';

  export default {
    name: 'notification-detail-card',
    props: {
      notificationId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        notificationDetail: {},
      };
    },
    created: function () {
      this.queryNotificationDetail();
    },
    computed: {
    },
    methods: {
      backButtonClicked() {
        this.$emit('backButtonClickedEmit');
      },

      queryNotificationDetail() {
        const condParams = {
          id: this.notificationId,
        };

        Vue.axios.get(UrlConfig.REPLACEMENT_ORDER_DETAIL_PATH, { params: condParams })
          .then((response) => {
            this.notificationDetail = response.data.data;
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

  .notification-detail-card {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }

  .notification-detail-table {
    width: 100%;
    min-width: 300px;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    border-collapse:collapse;
    table-layout:fixed;
    margin-bottom: 20px;
  }

  .notification-detail-table td {
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid #edeff1;
    min-width: 150px;
  }

  .notification-detail-table tr {
    min-height: 40px;
    word-wrap: break-word;
  }

  .notification-detail-table tr td:nth-child(1) {
    width: 130px;
    min-width: 130px;
    max-width: 130px;
    height: 40px;
  }

  .back-button {
    display: flex;
    justify-content: center;
  }

</style>
