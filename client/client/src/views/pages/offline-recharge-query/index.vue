<template>
  <div class="query-container">
    <div>
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc" :btnOffShow="true"></page-header-comp>
    </div>
    <offline-recharge-query-condition-comp :pageInfo="pageMeta"
                                            @searchEmit="search"></offline-recharge-query-condition-comp>
    <div style="height: 20px;"></div>
    <offline-recharge-query-result-comp :data="listData" :count="listCount"
                                         @changeTableEmit="changeTable" :operator="operatorName"
                                         @exportListEmit="exportListHandle"
                                         :loading="load"></offline-recharge-query-result-comp>
  </div>
</template>
<script>
  import Vue from 'vue';
  import queryString from 'query-string';
  import moment from 'moment';
  import pageHeaderComp from '@components/page-header';
  import offlineRechargeQueryConditionComp from "@components/offline-recharge-query-condition";
  import offlineRechargeQueryResultComp from "@components/offline-recharge-table";
  import UrlConfig from '@/utils/UrlConfig';
  import TokenUtil from '@/utils/TokenUtil';

  export default {
    name: 'offline-recharge-query',
    components: {
      pageHeaderComp,
      offlineRechargeQueryConditionComp,
      offlineRechargeQueryResultComp,
    },
    data () {
      return {
        listData: [],
        listCount: 0,
        queryCond: {},
        load: false,
      };
    },
    created () {
      this.queryCond.start_time = moment().subtract(1, 'month').format('YYYY-MM-DD 00:00:00');
      this.queryCond.end_time = moment().format('YYYY-MM-DD 23:59:59');
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
        console.log(JSON.stringify(data, null, '\t'))
        this.queryCond.min_amount = data.min_amount ? data.min_amount : '';
        this.queryCond.max_amount = data.max_amount ? data.max_amount : '';
        this.queryCond.transfer_card_no = data.transfer_card_no ? data.transfer_card_no : '';
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
        this.load = true;
        console.log(JSON.stringify(this.queryCond, null, '\t'))
        Vue.axios.get(UrlConfig.LOAD_OFFLINE_RECHARGE, { params: this.queryCond })
          .then((response) => {
            if (response) {
              this.load = false;
              this.listData = response.data.list;
              this.listCount = response.data.count;
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
</style>
