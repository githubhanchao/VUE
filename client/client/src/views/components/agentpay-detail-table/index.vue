
<template>
  <el-card id="agentpay-detail-table" class="agentpay-detail-table" v-loading="loading">
    <div class="agentpay-detail-head" style="margin-bottom: 10px;">
      <div>
        <span>总笔数: </span><span class="head-data_text">{{ agentpayDetailCount }}笔</span>
        <span>总金额: </span><span class="head-data_text">{{ sumAmount }}元  </span>
      </div>
      <a style="color: #409EFF; cursor: pointer; font-weight: 700;" class="el-icon-download"
         download="代付明细记录.csv" @click="exportAgentpayDetailList"
         v-permission="'agentpay-batch-detail-exports'">导出列表</a>
    </div>
    <el-table :data="agentpayDetailList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="交易完成时间：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.tradeDonedate }}</span>
            </el-form-item>
            <el-form-item label="账户类型：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.tradeAccounttype }}</span>
            </el-form-item>
            <el-form-item label="所在地：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.location }}</span>
            </el-form-item>
            <el-form-item label="分行：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.tradeBranchbank }}</span>
            </el-form-item>
            <el-form-item label="证件类型：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.certificateType }}</span>
            </el-form-item>
            <el-form-item label="支行：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.tradeSubbranchbank }}</span>
            </el-form-item>
            <el-form-item label="手机号：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.tradeMobile }}</span>
            </el-form-item>
            <el-form-item label="币种：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.tradeAmounttype }}</span>
            </el-form-item>
            <el-form-item label="证件号：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.certificateNum }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="155" label="创建时间" prop="tradeSubdate"></el-table-column>
      <el-table-column min-width="165" label="交易号" prop="id"></el-table-column>
      <el-table-column min-width="165" label="批次号" prop="batchId"></el-table-column>
      <el-table-column label="收款方户名" prop="tradeCardname" min-width="90"></el-table-column>
      <el-table-column label="收款账号" prop="customerCardSummary"></el-table-column>
      <!--<el-table-column label="账户类型" prop="tradeAccounttype"></el-table-column>-->
      <el-table-column label="金额(元)">
        <template slot-scope="scope">
          <span style="color: #ff3366">{{ scope.row.tradeAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" prop="tradeStatus"></el-table-column>
      <el-table-column label="商户订单号" prop="tradeCustorder" min-width="90"></el-table-column>
      <el-table-column label="备注" prop="tradeRemark"></el-table-column>
      <el-table-column label="交易状态" prop="tradeFeedbackcode"></el-table-column>
      <el-table-column label="反馈原因" prop="showTradeReason"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChanged"
        @current-change="handleCurrentChanged"
        :current-page="curPageIndex"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="agentpayDetailCount">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>

  export default {
    name: 'agentpay-query-table',
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
        expandItemLabelWidth: '120px',
        curPageIndex: 1,
        pageSize: 20,
        pageSizes: [10, 20, 30, 40],
      };
    },
    computed: {
      agentpayDetailCount() {
        if (this.dataSource === null || this.dataSource.count === undefined || this.dataSource.count === null) {
          return 0;
        }

        return this.dataSource.count;
      },

      agentpayDetailList() {
        if (this.dataSource === null || this.dataSource.list === undefined || this.dataSource.list === null) {
          return [];
        }

        return this.dataSource.list;
      },

      sumAmount() {
        if (this.dataSource === null || this.dataSource.sum === undefined || this.dataSource.sum === null) {
          return 0.00;
        }

        return this.dataSource.sum;
      },
    },
    methods: {
      handleSizeChanged(val) {
        this.$emit('handleSizeChangedEmit', val);
      },

      handleCurrentChanged(val) {
        this.$emit('handleCurrentChangedEmit', val);
      },
      exportAgentpayDetailList() {
        window.open(this.exportUrl);
      },
    },
  };
</script>

<style scoped="agentpay-detail-table">

  .agentpay-detail-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }

  .agentpay-detail-head {
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
