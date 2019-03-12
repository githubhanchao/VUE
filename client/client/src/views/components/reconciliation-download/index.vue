
<template>
  <el-card id="reconciliation-download-card" class="reconciliation-download-card">
    <div class="reconciliation-download-content">
      <el-date-picker
        v-model="downloadDate"
        type="date"
        format="yyyy-MM-dd"
        :clearable="false"
        :editable="false"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button size="large" class="reconciliation_download_btn" type="primary"
                 v-permission="'reconciliation-download'"
                 @click="downloadBtnClicked">下载对账单</el-button>
    </div>
  </el-card>
</template>

<script>

  import Vue from 'vue';
  import moment from 'moment';
  import queryString from 'query-string';
  import RequestHeaderUtil from '@/utils/RequestHeaderUtil';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'reconciliation-download-card',
    props: {
      action: {
        type: String,
      },
    },
    data() {
      return {
        downloadDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      };
    },
    created: function () {

    },
    methods: {

      downloadBtnClicked() {
        const params = {
          date: moment(this.downloadDate).format('YYYYMMDD'),
          'access-token': RequestHeaderUtil.getAccessTokenHeader(),
        };
        const downloadUrl = `${window.appConfig.apiUrlPrefix}/v1` + this.action + '?' + queryString.stringify(params);
        window.open(downloadUrl);
      },
    },
  };
</script>

<style>

  .reconciliation-download-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  .reconciliation_download_btn {
    width: 120px;
    margin-left: 20px;
  }
</style>
