
<template>
  <el-card id="account-detail-table" class="account-detail-table" v-loading="loading">
    <div class="account-detail-head" style="margin-bottom: 10px;">
      <span style="font-size: 16px; font-weight: 700;">账务记录</span>
      <a style="color: #409EFF; cursor: pointer; font-weight: 700;" class="el-icon-download"
         download="账务记录.csv" @click="exportAccountDetailList"
         v-permission="'account-detail-exports'">导出列表</a>
    </div>
    <el-table :data="accountDetailList" style="width: 100%">
      <el-table-column min-width="155" label="创建时间" prop="dateCreated"></el-table-column>
      <el-table-column min-width="155" label="交易流水号" prop="tradeNo"></el-table-column>
      <el-table-column min-width="155" label="外部订单号" prop="outTradeNo"></el-table-column>
      <el-table-column label="类型" prop="transferType"></el-table-column>
      <el-table-column label="收入(元)">
        <template slot-scope="scope">
          <span style="color: #00cc66">{{ scope.row.debitAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支出(元)">
        <template slot-scope="scope">
          <span style="color: #ff3366">{{ scope.row.creditAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="余额(元)" prop="balance"></el-table-column>
      <el-table-column label="摘要" prop="subject"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChanged"
        @current-change="handleCurrentChanged"
        :current-page="curPageIndex"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="accountDetailCount">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>

  export default {
    name: 'account-detail-table',
    props: {
      dataSource: {
        type: Object,
      },
      loading: {
        type: Boolean,
        required: true,
      },
      exportUrl: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        curPageIndex: 1,
        pageSize: 20,
        pageSizes: [10, 20, 30, 40],
      };
    },
    computed: {
      accountDetailCount() {
        if (this.dataSource === null || this.dataSource.count === undefined || this.dataSource.count === null) {
          return 0;
        }

        return this.dataSource.count;
      },

      accountDetailList() {
        if (this.dataSource && this.dataSource.list) {
          return this.dataSource.list;
        }

        return [];
      },
    },
    methods: {

      exportAccountDetailList() {
        window.open(this.exportUrl);
      },

      handleSizeChanged(val) {
        this.$emit('handleSizeChangedEmit', val);
      },

      handleCurrentChanged(val) {
        this.$emit('handleCurrentChangedEmit', val);
      },
    },
  };
</script>

<style>

  .account-detail-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }

  .account-detail-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-form {
    padding: 0 0;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
