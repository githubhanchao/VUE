
<template>
  <el-card id="account-detail-query-cond" class="account-detail-query-cond">
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
          <el-select v-model="formModel.fundDirection" placeholder="资金流向" :clearable="true"
                     @change="fundDirectionChanged">
            <el-option
              v-for="item in fundFlowDirections"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="formModel.finType" placeholder="账务类型" :clearable="true">
            <el-option
              v-for="item in accountTypes"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" style="margin-bottom: 0">
        <el-col :span="8">
          <el-popover
            ref="popover1"
            placement="bottom-start"
            width="300"
            trigger="hover">
            <div slot>查询“支付”账务明细，请输入“平台交易号”<br/>查询“转账”账务明细，请输入转账的“交易号”<br/>查询“代付”账务明细，请输入代付“批次号”</div>
          </el-popover>
          <el-input v-popover:popover1 size="large" v-model="formModel.tradeNo" placeholder="交易流水号"></el-input>
        </el-col>
        <el-col :span="4" class="col_btn_bg">
          <el-button size="large" class="pay_trade_query_btn searchBtn" type="primary" style="width: 110px;"
                     :disabled="buttonDisabled" icon="el-icon-search" @click="searchBtnClicked">搜 索</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>

  import StringUtil from "@/utils/StringUtil";
  import AccountTypes from "@/utils/AccountTypes";
  import FundDirections from "@/utils/FundDirections";
  import moment from 'moment';
  import DateUtils from '@/utils/DateUtils';
  import Vue from 'vue';

  export default {
    name: 'account-detail-query-cond',
    props: {
      action: {
        type: String,
      },
      fundFlowDirections: {
        type: Array,
        required: true,
      },
      accountTypes: {
        type: Array,
        required: true,
      },
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
        this.queryAccountDetails();
      },
      curPageIndexProp (value) {
        console.log(`watch curPageIndex ${value}`);
        this.pageIndex = value;
        this.queryAccountDetails();
      },
    },
    data () {
      const validateDateRange = (rule, value, callback) => {
        if (value[0] === null || value[1] === null) {
          callback(new Error('时间区间不能为空'));
          return;
        }

        const days = moment(value[1]).diff(moment(value[0]), 'days');
        if (days > 7) {
          callback(new Error('单次查询时间范围不能超出7天'));
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
          fundDirection: '',
          finType: '',
          tradeNo: '',
        },
        datePickerOptions: {
          disabledDate (time) {
            //            const disabledStart = Date.now() - 3600 * 1000 * 24 * 90;
            //            return time.getTime() >= Date.now() || time.getTime() < disabledStart;
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
      this.datePickerOptions.shortcuts = [
        {
          text: '最近一天',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          },
        },
        {
          text: '最近三天',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
            picker.$emit('pick', [start, end]);
          },
        },
        {
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          },
        },
      ];
      //      this.formModel.dateRange = [startDate, endDate];
      this.queryAccountDetails();
    },
    methods: {

      searchBtnClicked () {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.queryAccountDetails();
          }
        });
      },
      changeDate (value) {
        this.formModel.dateRange = this.dateChange(value);
      },
      queryAccountDetails () {

        const dateRange = this.formModel.dateRange;

        const stateDate = moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss');

        this.buttonDisabled = true;
        const condParams = {
          start_time: stateDate,
          end_time: endDate,
          direction: this.formModel.fundDirection,
          account_type: this.formModel.finType,
          tradeNo: this.formModel.tradeNo,
          page: this.pageIndex,
          page_size: this.pageSize,
        };

        this.$emit('startQueryEmit', condParams);

        Vue.axios.get(this.action, { params: condParams })
          .then((response) => {
            this.buttonDisabled = false;
            this.$emit('accountDetailsOnSuccessEmit', response.data);
          })
          .catch((error) => {
            this.buttonDisabled = false;
            this.$emit('accountDetailsOnFailEmit', error);
            //            console.log(error);
          });
      },

      fundDirectionChanged (fundDirection) {
        this.accountTypes.map((item) => {
          if ((fundDirection === FundDirections.OUT && item.code === AccountTypes.CHARGE) ||
            (fundDirection === FundDirections.IN && item.code === AccountTypes.WITHDRAWN)) {
            item["disabled"] = true;
          } else {
            delete item["disabled"];
          }
        });
      },
    },
  };
</script>

<style>
.account-detail-query-cond {
  width: 100%;
  height: auto;
  background-color: white;
}
/*.pay_trade_query_btn {*/
/*width: 100%;*/
/*}*/
.account-detail-query-cond .el-form {
  padding: 0 0;
}
.account-detail-query-cond .el-form-item {
  margin: 0px 0px;
  padding: 0 0;
}
.account-detail-query-cond .el-col {
  max-width: 340px;
}
.account-detail-query-cond .el-select {
  width: 100%;
}
</style>
