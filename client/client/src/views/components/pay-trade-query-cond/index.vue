
<template>
  <el-card id="pay-trade-query-cond" class="pay-trade-query-cond">
    <el-form id="form" ref="formModel" :model="formModel" :rules="rules" onsubmit="return false;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="dateRange">
            <el-date-picker
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
          <el-select v-model="formModel.payWay" placeholder="支付方式" :clearable="true">
            <el-option
              v-for="item in payWays"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="formModel.orderState" placeholder="订单状态" :clearable="true">
            <el-option
              v-for="item in payOrderStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="isAdvanceSearch">
        <el-col :span="8">
          <el-input size="large" id="goodsName" v-model="formModel.goodsName" placeholder="商品名称" ></el-input>
        </el-col>
        <el-col :span="8">
          <el-input size="large" id="platformTradeum" v-model="formModel.tradeNo" placeholder="平台交易号" ></el-input>
        </el-col>
        <el-col :span="8" class="money-range-col">
          <el-form-item id="money-range-item" prop="moneyRange">
            <el-input size="large" id="moneyMin" class="money_range_input" v-model="formModel.minMoney" placeholder="金额(元)" ></el-input>
            <span>至</span>
            <el-input size="large" id="moneyMax" class="money_range_input" v-model="formModel.maxMoney" placeholder="金额(元)" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="isAdvanceSearch">
        <el-col :span="8">
          <el-input size="large" id="customerOrderNum" v-model="formModel.orderNo" placeholder="商户订单号" ></el-input>
        </el-col>
        <el-col :span="8">
          <el-input size="large" id="remark" v-model="formModel.remark" placeholder="备注" ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" style="margin-bottom: 0">
        <el-col :span="4" class="col_btn_bg">
          <el-button size="large" class="pay_trade_query_btn" id="searchBtn" type="primary" style="width: 110px"
                     icon="el-icon-search" @click="searchBtnClicked" :disabled="buttonDisabled">搜 索</el-button>
        </el-col>
        <el-col :span="20">
          <el-button size="large" class="pay_trade_query_btn" id="advanceSearchBtn" type="text"
                     @click="advanceSearchBtnClicked">高级搜索<i :class="adSearchIcon"></i></el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import Vue from 'vue';
  import StringUtil from "@/utils/StringUtil";
  import moment from 'moment';
  import SearchStatusUtil from '@/utils/SearchStatusUtil'
  import DateUtils from '@/utils/DateUtils';

  export default {
    name: 'pay-trade-query-cond',
    props: {
      action: {
        type: String,
      },
      payWays: {
        type: Array,
        required: true,
      },
      payOrderStatus: {
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
        this.searchPayTrade();
      },
      curPageIndexProp (value) {
        console.log(`watch curPageIndex ${value}`);
        this.pageIndex = value;
        this.searchPayTrade();
      },
    },
    data () {
      const validateMoneyRange = (rule, value, callback) => {
        if (isNaN(this.formModel.minMoney)) {
          callback(new Error('金额下限必须是数字'));
          return;
        }

        if (isNaN(this.formModel.maxMoney)) {
          callback(new Error('金额上限必须是数字'));
          return;
        }

        if (this.formModel.minMoney && this.formModel.maxMoney) {
          const moneyMin = Number.parseFloat(this.formModel.minMoney);
          const moneyMax = Number.parseFloat(this.formModel.maxMoney);
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
        isAdvanceSearch: SearchStatusUtil.getSearchStatus(),
        pageIndex: 1,
        pageSize: 20,
        adSearchIcon: SearchStatusUtil.getSearchStatus() ? 'el-icon-caret-top el-icon--right' : 'el-icon-caret-bottom el-icon--right',
        formModel: {
          dateRange: [startDate, endDate],
          payWay: '',
          orderState: '',
          goodsName: '',
          tradeNo: '',
          minMoney: '',
          maxMoney: '',
          orderNo: '',
          remark: '',
        },
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
      this.searchPayTrade();
    },
    methods: {

      searchBtnClicked () {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.searchPayTrade();
          }
        });
      },
      changeDate (value) {
        this.datePickerOptions
        this.formModel.dateRange = this.dateChange(value);
      },
      searchPayTrade () {
        this.buttonDisabled = true;
        const dateRange = this.formModel.dateRange;
        const stateDate = moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss');

        const condParams = {
          start_time: stateDate,
          end_time: endDate,
          pay_way: this.formModel.payWay,
          order_state: this.formModel.orderState,
          goods_name: this.formModel.goodsName,
          trade_no: this.formModel.tradeNo,
          min_amount: this.formModel.minMoney,
          max_amount: this.formModel.maxMoney,
          order_no: this.formModel.orderNo,
          remark: this.formModel.remark,
          page: this.pageIndex,
          page_size: this.pageSize,
        };

        this.$emit('startQueryEmit', condParams);

        Vue.axios.get(this.action, { params: condParams })
          .then((response) => {
            this.buttonDisabled = false;
            this.$emit('searchPayTradeOnSuccessEmit', response.data);
          })
          .catch((error) => {
            this.buttonDisabled = false;
            this.$emit('searchPayTradeOnFailEmit', error);
            console.log(error);
          });
      },

      advanceSearchBtnClicked () {
        this.isAdvanceSearch = !this.isAdvanceSearch;
        SearchStatusUtil.setSearchStatus(this.isAdvanceSearch);
        this.adSearchIcon = this.isAdvanceSearch ? 'el-icon-caret-top el-icon--right' : 'el-icon-caret-bottom el-icon--right';
      },

    },
  };
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.pay-trade-query-cond {
  width: 100%;
  height: auto;
  background-color: white;
}
/*.pay_trade_query_btn {*/
/*width: 100%;*/
/*}*/
.money_range_input {
  width: 100px;
}
.el-range-editor.el-input__inner {
  width: fit-content;
}
.el-form {
  padding: 0 0;
}
.pay-trade-query-cond .el-form-item {
  margin: 0 0;
  padding: 0 0;
  margin-bottom: 0;
}
.money-range-col {
  height: 40px;
}
.pay-trade-query-cond .el-select {
  width: 100%;
}
.pay-trade-query-cond .el-col {
  max-width: 340px;
}
.col_btn_bg {
  width: 110px;
}
</style>
