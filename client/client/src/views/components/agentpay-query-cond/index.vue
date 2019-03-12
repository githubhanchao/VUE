
<template>
  <el-card id="agentpay-query-cond" class="agentpay-query-cond">
    <el-form id="form" ref="formModel" :model="formModel" :rules="rules" onsubmit="return false;">
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
          <el-input size="large" id="batchNo" v-model="formModel.batchNo" placeholder="批次号"></el-input>
        </el-col>
        <el-col :span="8">
          <el-select v-model="formModel.status" placeholder="状态" :clearable="true">
            <el-option
              v-for="item in agentpayStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" style="margin-bottom: 0">
        <el-col :span="4" class="col_btn_bg">
          <el-button size="large" class="agentpay_query_btn" id="searchBtn" type="primary" style="width: 110px;"
                     :disabled="buttonDisabled" icon="el-icon-search" @click="searchBtnClicked">搜 索</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>

  import StringUtil from "@/utils/StringUtil";
  import moment from 'moment';
  import Vue from 'vue';
  import DateUtils from '@/utils/DateUtils';

  export default {
    name: 'agentpay-query-cond',
    props: {
      action: {
        type: String,
      },
      agentpayStatus: {
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
        this.queryAgentpay();
      },
      curPageIndexProp (value) {
        console.log(`watch curPageIndex ${value}`);
        this.pageIndex = value;
        this.queryAgentpay();
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
          batchNo: '',
          status: '',
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
      const startDate = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
      const endDate = moment().format('YYYY-MM-DD HH:mm:ss');
      this.datePickerOptions.shortcuts = this.shortcutArray;
      //      this.formModel.dateRange = [startDate, endDate];
      this.queryAgentpay();
    },
    methods: {

      searchBtnClicked () {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.queryAgentpay();
          }
        });
      },
      changeDate (value) {
        this.formModel.dateRange = this.dateChange(value);
      },
      queryAgentpay () {

        const dateRange = this.formModel.dateRange;

        const startDate = moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss');

        this.buttonDisabled = true;
        const condParams = {
          startDate,
          endDate,
          batchId: this.formModel.batchNo,
          batchStatus: this.formModel.status,
          page: this.pageIndex,
          page_size: this.pageSize,
        };

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

<style scoped="agentpay-query-cond">
.agentpay-query-cond {
  width: 100%;
  height: auto;
  margin: 0 auto;
  background-color: white;
}
.agentpay_query_btn {
  width: 100%;
}
.agentpay-query-cond .el-form {
  padding: 0 0;
}
.agentpay-query-cond .el-form-item {
  margin: 0px 0px;
  padding: 0 0;
}
.agentpay-query-cond .el-col {
  max-width: 340px;
}
</style>
