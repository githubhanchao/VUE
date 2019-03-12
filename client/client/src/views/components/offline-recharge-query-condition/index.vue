<template>
  <div>
    <el-card class="condition query">
      <el-form :inline="true" :model="queryForm" ref="queryForm" class="demo-form-inline" :rules="rules" onsubmit="return false;">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="date">
              <el-date-picker v-model="queryForm.date" class="datePicker"
                              type="datetimerange" range-separator="至"
                              :clearable="editable" :editable="editable"
                              :picker-options="datePickerOptions"
                              @change="changeDate"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-input v-model="queryForm.trade_no" @keydown.enter.native="querySearch" placeholder="订单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="money-range-col">
            <el-form-item prop="moneyRange">
              <span>
                <el-input v-model="queryForm.min_amount" class="money_range_input" @keydown.enter.native="querySearch" placeholder="金额(元)"></el-input>
              </span>
              <span>至</span>
              <span>
                <el-input v-model="queryForm.max_amount" class="money_range_input" @keydown.enter.native="querySearch" placeholder="金额(元)"></el-input>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 0;">
          <el-col :span="8">
            <el-form-item>
              <el-input v-model="queryForm.transfer_card_no" @keydown.enter.native="querySearch" placeholder="银行账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button size="large" type="primary" style="width: 110px;" icon="el-icon-search" @click="querySearch">搜 索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import moment from 'moment';
  import DateUtils from '@/utils/DateUtils';

  export default {
    data () {
      const validateMoneyRange = (rule, value, callback) => {
        if (isNaN(this.queryForm.min_amount)) {
          callback(new Error('金额下限必须是数字'));
          return;
        }

        if (isNaN(this.queryForm.max_amount)) {
          callback(new Error('金额上限必须是数字'));
          return;
        }

        if (this.queryForm.min_amount && this.queryForm.max_amount) {
          const moneyMin = Number.parseFloat(this.queryForm.min_amount);
          const moneyMax = Number.parseFloat(this.queryForm.max_amount);
          if (moneyMin > moneyMax) {
            callback(new Error('金额下限不能大于上限'));
            return;
          }
        }

        callback();
      };

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
      let startDate = DateUtils.dateToTime(lastMonthDateStr) - 31 * 24 * 60 * 60 * 1000;

      return {
        queryForm: {
          min_amount: '',
          max_amount: '',
          transfer_card_no: '',
          trade_no: '',
          date: [startDate, endDate],
        },
        editable: false,
        datePickerOptions: {
          disabledDate (time) {
            const disabledStart = Date.now() - 3600 * 1000 * 24 * 90;
            return time.getTime() >= Date.now();
          },
          shortcuts: [],
        },
        rules: {
          moneyRange: [
            { validator: validateMoneyRange, trigger: 'blur' },
          ],
          date: [
            { validator: validateDateRange, trigger: 'blur' },
          ],
        },
      };
    },
    created () {
      this.datePickerOptions.shortcuts = this.shortcutArray;
    },
    props: {
      pageInfo: {
        type: Object,
        required: true,
      },
    },
    methods: {
      querySearch () {
        this.$refs['queryForm'].validate((valid) => {
          if (valid) {
            this.$emit('searchEmit', this.queryForm);
          }
        });
      },
      changeDate (value) {
        this.queryForm.date = this.dateChange(value);
      },
    },
  };
</script>
<style scoped>
.money_range_input {
  width: 100px;
}
.money-range-col {
  height: 40px;
}
</style>
<style>
.query .el-form--inline .el-form-item {
  width: 100%;
  margin-bottom: 0;
}
.query .el-form--inline .el-form-item__content {
  width: 100%;
}
.query .el-range-editor.el-input__inner {
  width: 100%;
}
/*.query .el-icon-search {*/
/*-webkit-font-smoothing: subpixel-antialiased;*/
/*-moz-osx-font-smoothing: subpixel-antialiased;*/
/*}*/
.el-picker-panel__footer .el-button--text {
  display: none;
}
.query .el-col {
  max-width: 340px;
}
td.available:hover span {
  background-color: #edf2fc;
}
td.available.start-date:hover span,
td.available.end-date:hover span {
  background-color: #409eff;
}
</style>
