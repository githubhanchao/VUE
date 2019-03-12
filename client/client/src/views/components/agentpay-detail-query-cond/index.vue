
<template>
  <el-card id="agentpay-detail-query-cond" class="agentpay-detail-query-cond">
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
          <el-input size="large" id="batchId" v-model="formModel.batchId" placeholder="批次号"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input size="large" id="tradeNo" v-model="formModel.tradeNo" placeholder="交易号"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="isAdvanceSearch">
        <el-col :span="8">
          <el-input size="large" id="customerOrderNo" v-model="formModel.tradeCustorder" placeholder="商户订单号"></el-input>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="tradeResult">
            <el-select v-model="formModel.tradeFeedbackcode" placeholder="交易状态" :clearable="true">
              <el-option
                v-for="item in agentpayResults"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="col">
          <el-form-item prop="status">
            <el-select v-model="formModel.tradeStatus" placeholder="状态" :clearable="true">
              <el-option
                v-for="item in agentpayStatus"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="isAdvanceSearch">
        <el-col :span="8" class="col">
          <el-form-item prop="payeeAccountName">
            <el-input size="large" id="payeeAccountName" v-model="formModel.tradeCardname" placeholder="收款方户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-input size="large" id="payeeAccountName" v-model="formModel.tradeAccountName" placeholder="开户行"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex">
        <el-col :span="4" class="col_btn_bg">
          <el-button size="large" class="agentpay_detail_query_btn" id="searchBtn" type="primary" style="width: 110px;"
                     icon="el-icon-search" @click="searchBtnClicked" :disabled="buttonDisabled">搜 索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button size="large" class="agentpay_detail_query_btn" id="advanceSearchBtn" type="text" style="width: 110px;"
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
  import SearchStatusUtil from '@/utils/SearchStatusUtil';
  import DateUtils from '@/utils/DateUtils';

  export default {
    name: 'agentpay-detail-query-cond',
    props: {
      action: {
        type: String,
      },
      agentpayStatus: {
        type: Array,
        required: true,
      },
      agentpayResults: {
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
      bankList: {
        type: Array,
        required: true,
      },
      batchIdProp: {
        type: String,
      },
    },
    watch: {
      pageSizeProp (value) {
        console.log(`watch page size ${value}`);
        this.pageSize = value;
        this.queryAgentpayDetails();
      },
      curPageIndexProp (value) {
        console.log(`watch curPageIndex ${value}`);
        this.pageIndex = value;
        this.queryAgentpayDetails();
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
        isAdvanceSearch: SearchStatusUtil.getSearchStatus(),
        adSearchIcon: SearchStatusUtil.getSearchStatus() ? 'el-icon-caret-top el-icon--right' : 'el-icon-caret-bottom el-icon--right',
        pageIndex: 1,
        pageSize: 20,
        formModel: {
          dateRange: [startDate, endDate],
          batchId: '',
          tradeNo: '',
          tradeCustorder: '',
          tradeFeedbackcode: '',
          tradeStatus: '',
          tradeCardname: '',
          tradeAccountName: '',
        },
        rules: {
          dateRange: [
            { validator: validateDateRange, trigger: 'blur' },
          ],
        },
        datePickerOptions: {
          disabledDate (time) {
            const disabledStart = Date.now() - 3600 * 1000 * 24 * 90;
            return time.getTime() >= Date.now();
          },
          shortcuts: [],
        },
      };
    },
    computed: {

    },
    created: function () {
      const startDate = moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss');
      const endDate = moment().format('YYYY-MM-DD HH:mm:ss');
      this.datePickerOptions.shortcuts = this.shortcutArray;
      //      this.formModel.dateRange = [startDate, endDate];
      this.formModel.batchId = this.batchIdProp;
      this.queryAgentpayDetails();
    },
    methods: {

      advanceSearchBtnClicked () {
        this.isAdvanceSearch = !this.isAdvanceSearch;
        SearchStatusUtil.setSearchStatus(this.isAdvanceSearch);
        this.adSearchIcon = this.isAdvanceSearch ? 'el-icon-caret-top el-icon--right'
          : 'el-icon-caret-bottom el-icon--right';
      },

      searchBtnClicked () {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.queryAgentpayDetails();
          }
        });
      },
      changeDate (value) {
        this.formModel.dateRange = this.dateChange(value);
      },
      queryAgentpayDetails () {

        const dateRange = this.formModel.dateRange;
        const startDate = moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss');

        this.buttonDisabled = true;
        const condParams = {
          startDate,
          endDate,
          batchId: this.formModel.batchId,
          tradeNo: this.formModel.tradeNo,
          tradeCustorder: this.formModel.tradeCustorder,
          tradeFeedbackcode: this.formModel.tradeFeedbackcode,
          tradeStatus: this.formModel.tradeStatus,
          tradeCardname: this.formModel.tradeCardname,
          tradeAccountName: this.formModel.tradeAccountName,
          page: this.pageIndex,
          page_size: this.pageSize,
        };
        if (this.$route.query.batchId) {
          if (condParams.batchId ||
            condParams.tradeNo ||
            condParams.tradeCustorder ||
            condParams.tradeFeedbackcode ||
            condParams.tradeStatus ||
            condParams.tradeCardname ||
            condParams.tradeAccountName) {
            condParams.startDate = '';
            condParams.endDate = '';
          }
        }
        this.$emit('startQueryEmit', condParams);
        Vue.axios.get(this.action, { params: condParams })
          .then((response) => {
            this.buttonDisabled = false;
            this.$emit('onSuccessEmit', response.data);
          })
          .catch((error) => {
            this.buttonDisabled = false;
            this.$emit('onFailEmit', error);
            console.log(error);
          });
      },

    },
  };
</script>

<style scoped="agentpay-detail-query-cond">
.agentpay-detail-query-cond {
  width: 100%;
  height: auto;
  margin: 0 auto;
  background-color: white;
}

.agentpay_detail_query_btn {
  width: 100%;
}

.agentpay-detail-query-cond .el-form {
  padding: 0 0;
}

.agentpay-detail-query-cond .el-form-item {
  margin: 0px 0px;
  padding: 0 0;
}
</style>
<style>
.agentpay-detail-query-cond .el-col {
  max-width: 340px;
}
</style>
