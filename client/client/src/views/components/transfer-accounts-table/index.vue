<template>
  <el-card class="transfer-query-result">
    <div class="table-title" style="margin-bottom: 10px;">
      <span class="record">转账记录</span>
      <a style="color: #409EFF; cursor: pointer; font-weight: 700;" class="el-icon-download" target="_blank"
         v-permission="'transfer-trade-exports'"
            download="转账记录.csv" @click="exportList">导出列表</a>
    </div>
    <el-table :data="transferAccountsList" v-loading="loading" style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="交易号:"><span>{{ scope.row.tradeNo }}</span></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="交易类型:"><span>{{ scope.row.tradeType }}</span></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="付款方:"><span>{{ scope.row.payerName }}</span></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收款方:"><span>{{ scope.row.payeeName }}</span></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="操作员:"><span>{{ operator }}</span></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="提交方式:">
                  <span>{{ scope.row.submitType }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注:"><span>{{ scope.row.note }}</span></el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" width="155" label="创建时间"  prop="dateCreated">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" width="145" label="交易号" prop="tradeNo"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" min-width="120" label="转入账号" prop="payeeCode"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="金额(元)" prop="amount">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="转账原因" prop="subject"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="审核状态" prop="checkStatus"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="转账状态" prop="status"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total, sizes, prev, pager, next, jumper"
                     :page-sizes="[10,20,30,40]" :page-size="queryCond.page_size"
                     :current-page="queryCond.page" :total="count">
      </el-pagination>
    </div>
  </el-card>
</template>
<script>
  import moment from 'moment';


  export default {
    data() {
      return {
        queryCond: {
          page_size: 20,
          page: 1,
        },
      };
    },
    props: {
      transferAccountsList: {
        type: Array,
        required: true,
      },
      loading: {
        type: Boolean,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      operator: {
        type: String,
        required: true,
      },
//      transferStatus: {
//        type: Array,
//        required: true,
//      },
//      checkStatus: {
//        type: Array,
//        required: true,
//      }
//      submitType: {
//        type: Array,
//        required: true,
//      },
    },
    computed: {

    },
    methods: {
      handleSizeChange(val) {
        this.queryCond.page_size = val;
        this.responseData();
      },
      handleCurrentChange(val) {
        this.queryCond.page = val;
        this.responseData();
      },
      responseData() {
        this.$emit('changeTableEmit', this.queryCond);
      },
      exportList() {
        this.$emit('exportListEmit', this.queryCond);
      },
      itemFormatTimestamp(timestamp, formatStr) {
        if (moment(timestamp).isValid()) {
          return moment(timestamp).format(formatStr);
        }
        return timestamp;
      },
    },
  };
</script>
<style scoped>
  .table-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .record {
    font-size: 16px;
    font-weight: 700;
  }
  /*.transfer-query-result {*/
    /*padding: 0 20px 40px 20px;*/
  /*}*/
  .transfer-query-result .el-form-item {
    width: 100%;
  }
  .block {
    margin-top: 20px;
    text-align: right;
  }
</style>
<style>
  .transfer-query-result table tbody tr td:nth-child(5) {
    color: #ff3366;
  }
</style>
