
<template>
  <el-card class="notification-query-cond">
    <el-form id="form" class="form" ref="formModel" :model="formModel" :rules="rules" onsubmit="return false;">
      <el-row :gutter="20">
        <el-col :span="8" class="col">
          <el-form-item prop="dateRange">
            <el-date-picker
              class="date-picker"
              v-model="formModel.dateRange"
              type="datetimerange"
              :clearable="false"
              :editable="false"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              @change="changeDate"
              :picker-options="datePickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-input size="large" v-model="formModel.orderNo" placeholder="订单号"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" style="margin-bottom: 0">
        <el-col :span="4" class="col_btn_bg">
          <el-button size="large" class="pay_trade_query_btn searchBtn" type="primary" style="width: 110px;"
                     :disabled="buttonDisabled" icon="el-icon-search" @click="searchBtnClicked">搜 索</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>

  import moment from 'moment';
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';
  import DateUtils from '@/utils/DateUtils';

  export default {
    name: 'notification-query-cond',
    props: {
      pageSizeProp: {
        type: Number,
        required: true,
      },
      curPageIndexProp: {
        type: Number,
        required: true,
      },
    },
    watch: {
      pageSizeProp (value) {
        console.log(`watch page size ${value}`);
        this.pageSize = value;
        this.queryReplacementOrderList();
      },
      curPageIndexProp (value) {
        console.log(`watch curPageIndex ${value}`);
        this.pageIndex = value;
        this.queryReplacementOrderList();
      },
    },
    data () {
      const validateDateRange = (rule, value, callback) => {
        if (value[0] === null || value[1] === null) {
          callback(new Error('时间区间不能为空'));
          return;
        }

        const days = moment(value[1]).diff(moment(value[0]), 'days');
        if (days > 90) {
          callback(new Error('单次查询时间范围不能超出90天'));
          return;
        }

        callback();
      };

      let nowDate = DateUtils.getDate();
      let nowDateStr = nowDate + ' 23:59:59'
      let endDate = DateUtils.dateToTime(nowDateStr)
      let lastMonthDateStr = nowDate + ' 00:00:00'
      let startDate = DateUtils.dateToTime(lastMonthDateStr);

      return {
        buttonDisabled: false,
        pageIndex: 1,
        pageSize: 20,
        formModel: {
          dateRange: [startDate, endDate],
          orderNo: '',
        },
        datePickerOptions: {
          disabledDate (time) {
            return time.getTime() >= Date.now();
          },
          shortcuts: [],
        },
        rules: {
          dateRange: [
            { validator: validateDateRange, trigger: 'blur' },
          ],
        },
      };
    },
    computed: {

    },
    created: function () {
      const startDate = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
      const endDate = moment().format('YYYY-MM-DD HH:mm:ss');
      this.datePickerOptions.shortcuts = this.shortcutArray;
      //      this.formModel.dateRange = [startDate, endDate];
      this.queryReplacementOrderList();
    },
    methods: {

      searchBtnClicked () {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.queryReplacementOrderList();
          }
        });
      },
      changeDate (value) {
        this.formModel.dateRange = this.dateChange(value);
      },
      queryReplacementOrderList () {
        const dateRange = this.formModel.dateRange;
        const stateDate = moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss');

        this.buttonDisabled = true;
        const condParams = {
          order_num: this.formModel.orderNo,
          start_time: stateDate,
          end_time: endDate,
          page: this.pageIndex,
          page_size: this.pageSize,
        };

        this.$emit('startQueryEmit', condParams);

        Vue.axios.get(UrlConfig.REPLACEMENT_ORDER_LIST_PATH, { params: condParams })
          .then((response) => {
            this.buttonDisabled = false;
            this.$emit('orderListOnSuccessEmit', response.data);
          })
          .catch((error) => {
            this.buttonDisabled = false;
            this.$emit('orderListOnFailEmit', error);
          });
      },
    },
  };
</script>

<style>
.notification-query-cond {
  width: 100%;
  height: auto;
  margin: 0 auto;
  background-color: white;
}
.notification-query-cond .el-form {
  padding: 0 0;
}
.notification-query-cond .el-form-item {
  margin: 0px 0px;
  padding: 0 0;
}
.notification-query-cond .el-col {
  max-width: 340px;
}
</style>
