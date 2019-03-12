
<template>
  <el-card class="overview-chart" :loading="loading">
    <div class="chart-title-content">
      <div>
        <span class="chart-title">收入支出</span>
        <div class="chart-desc-content">
          <span class="chart-desc">今日收入 ￥{{ credit }}</span>
          <span class="chart-desc">今日支出 ￥{{ debt }}</span>
        </div>
      </div>
      <el-radio-group v-model="chartDayType" size="mini" @change="radioGroupChanged">
        <el-radio-button :label="daySeven">7天</el-radio-button>
        <el-radio-button :label="dayFifteen">15天</el-radio-button>
        <el-radio-button :label="dayThirty">30天</el-radio-button>
      </el-radio-group>
    </div>
    <account-line-chart-comp :width="580" :height="510"
                             :chart-data="reportData"></account-line-chart-comp>
  </el-card>
</template>

<script>

  import Vue from 'vue';
  import accountLineChartComp from './accountChart';
  import UrlConfig from '@/utils/UrlConfig';
  import Router from 'vue-router';

  export default {
    name: 'overview-chart',
    components: {
      accountLineChartComp,
    },
    data() {
      return {
        reportData: {},
        chartDayType: 7,
        daySeven: 7,
        dayFifteen: 15,
        dayThirty: 30,
        loading: false,
        credit: '--',
        debt: '--',
      };
    },
    created() {
      this.queryAccountDetailReport();
    },
    methods: {
      // 查询数据
      queryAccountDetailReport() {
        const condParams = {
          days: this.chartDayType,
        };

        this.loading = true;
        Vue.axios.get(UrlConfig.ACCOUNT_DETAIL_REPORT_PATH, { params: condParams })
          .then((response) => {
            this.loading = false;
            console.log(response);
            this.showReportData(response.data.list);
            const lastItem = response.data.list.length - 1;
            this.credit = response.data.list[lastItem].creditAmount;
            this.debt = -response.data.list[lastItem].debtAmount;
          })
          .catch((error) => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      showReportData(accountReport) {
        const datePoints = accountReport.map((item) => {
          return item.date;
        });
        const creditAmountPoints = accountReport.map((item) => {
          return item.creditAmount;
        });
        const debtAmountPoints = accountReport.map((item) => {
          return item.debtAmount;
        });

        this.reportData = {
          labels: datePoints,
          datasets: [
            {
              label: '收入',
              backgroundColor: 'rgba(137, 201, 114, 0.1)',
              borderColor: '#89c972',
              borderWidth: 1,
              pointBorderWidth: 3,
              pointRadius: 1,
              pointHoverRadius: 2,
              pointHoverBorderWidth: 4,
              lineTension: 0,
              data: creditAmountPoints,
            },
            {
              label: '支出',
              backgroundColor: 'rgba(250, 117, 161, 0.1)',
              borderColor: '#fa75a1',
              borderWidth: 1,
              pointBorderWidth: 3,
              pointRadius: 1,
              pointHoverRadius: 2,
              pointHoverBorderWidth: 4,
              lineTension: 0,
              data: debtAmountPoints,
            },
          ],
        };
      },

      radioGroupChanged(val) {
        this.chartDayType = val;
        this.queryAccountDetailReport();
      },
    },
  };
</script>

<style scoped>

  .chart-title {
    font-size: 16px;
  }
  .chart-desc {
    font-size: 12px;
    margin-right: 10px;
  }
  .chart-title-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .chart-desc-content {
    margin-top: 5px;
  }
  .overview-chart {
    /*max-width: 1000px;*/
    height: 620px;
  }

</style>
