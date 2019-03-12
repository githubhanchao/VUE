<template>
  <div class="transfer-accounts-query-container">
    <div>
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc" :btnShow="true"></page-header-comp>
    </div>
    <transfer-accounts-query-condition-comp :pageInfo="pageMeta"
                                            @transferSearchEmit="search"></transfer-accounts-query-condition-comp>
    <div style="height: 20px;"></div>
    <transfer-accounts-query-result-comp :transferAccountsList="transferList" :count="transferCount"
                                         @changeTableEmit="changeTable" :operator="operatorName"
                                         @exportListEmit="exportListHandle"
                                         :loading="load"></transfer-accounts-query-result-comp>
  </div>
</template>
<script>
  import Vue from 'vue';
  import queryString from 'query-string';
  import transferAccountsQueryResultComp from "@components/transfer-accounts-table";
  import transferAccountsQueryConditionComp from "@components/transfer-accounts-query-condition";
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import TokenUtil from '@/utils/TokenUtil';
  import moment from 'moment';
  import DateUtils from '@/utils/DateUtils';

  export default {
    name: 'transfer-accounts-query',
    components: {
      transferAccountsQueryResultComp,
      transferAccountsQueryConditionComp,
      pageHeaderComp,
    },
    data () {
      return {
        transferList: [],
        transferCount: 0,
        queryCond: {},
        load: false,
      };
    },
    created () {
      this.queryCond.start_time = moment(new Date(Date.now() - 31 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD 00:00:00');
      this.queryCond.end_time = moment(new Date()).format('YYYY-MM-DD 23:59:59');
      this.queryCond.page = 1;
      this.queryCond.page_size = 20;
      this.search(this.queryCond);
    },
    computed: {
      pageMeta () {
        return this.$store.state.meta.pageMeta;
      },
      operatorName () {
        return this.$store.state.user.userInfo.name;
      },
    },
    methods: {
      changeTable (queryCond) {
        this.queryCond.page = queryCond.page;
        this.queryCond.page_size = queryCond.page_size;
        this.search(this.queryCond);
      },
      exportListHandle (queryCond) {
        this.queryCond.page = queryCond.page;
        this.queryCond.page_size = queryCond.page_size;
        this.queryCond.format = 'csv';
        this.search(this.queryCond);
      },
      search (data) {
        this.queryCond.min_amount = data.min_amount ? data.min_amount : '';
        this.queryCond.max_amount = data.max_amount ? data.max_amount : '';
        this.queryCond.to_account = data.to_account ? data.to_account : '';
        this.queryCond.trade_no = data.trade_no ? data.trade_no : '';
        if (data.date) {
          this.queryCond.start_time = moment(data.date[0]).format('YYYY-MM-DD HH:mm:ss');
          this.queryCond.end_time = moment(data.date[1]).format('YYYY-MM-DD HH:mm:ss');
        }
        if (!this.queryCond.page) {
          this.queryCond.page = 1;
        }
        if (!this.queryCond.page_size) {
          this.queryCond.page_size = 20;
        }
        if (this.queryCond.min_amount === 0
          || this.queryCond.min_amount
          || this.queryCond.max_amount
          || this.queryCond.to_account
          || this.queryCond.trade_no) {
          this.queryCond.start_time = '';
          this.queryCond.end_time = '';
        }
        // 下载文件
        if (this.queryCond.format) {
          this.queryCond['access-token'] = TokenUtil.getAccessToken();
          const openUrl = `${window.appConfig.apiUrlPrefix}/v1` + UrlConfig.LOAD_TRANSFER_PATH + '?' + queryString.stringify(this.queryCond);
          window.open(openUrl);
          this.queryCond.format = '';
          this.queryCond['access-token'] = '';
          return;
        }
        this.load = true;
        Vue.axios.get(UrlConfig.LOAD_TRANSFER_PATH, { params: this.queryCond })
          .then((response) => {
            if (response) {
              this.load = false;
              this.transferList = response.data.list;
              this.transferCount = response.data.count;
            }
          })
          .catch((error) => {
            this.load = false;
          });
      },
    },
  };
</script>
<style scoped>
.transfer-accounts-query-container {
  /*background-color: #fff;*/
}
</style>
