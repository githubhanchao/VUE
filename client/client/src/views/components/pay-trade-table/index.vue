
<template>
  <el-card id="pay-trade-table" class="pay-trade-table" v-loading="loading">
    <div class="pay-trade-head" style="margin-bottom: 10px;">
      <div>
        <span>总交易笔数: </span><span class="head-data_text">{{ tradeCount }}笔</span>
        <span>总交易金额: </span><span class="head-data_text">{{ sumAmount }}元  </span>
        <span>总手续费: </span><span class="head-data_text">{{ sumFee }}元  </span>
      </div>
      <a style="color: #409EFF; cursor: pointer; font-weight: 700;" class="el-icon-download"
         download="支付交易记录.csv" @click="exportPayTradeList"
         v-permission="'pay-trade-exports'">导出列表</a>
    </div>
    <el-table :data="tradeList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商户订单号：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.ordernum }}</span>
            </el-form-item>
            <el-form-item label="平台交易号：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.subject }}</span>
            </el-form-item>
            <el-form-item label="买家姓名：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.buyerName }}</span>
            </el-form-item>
            <el-form-item label="商品描述：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.bodys }}</span>
            </el-form-item>
            <el-form-item label="备注：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.note }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="165"
        prop="createdate">
      </el-table-column>
      <el-table-column
        label="商户订单号"
        width="225"
        prop="ordernum">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="subject">
      </el-table-column>
      <el-table-column
        label="支付方式"
        prop="preference">
      </el-table-column>
      <el-table-column
        label="金额(元)"
        prop="amount">
      </el-table-column>
      <el-table-column
        label="手续费(元)"
        min-width="90"
        prop="preFee">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="ordersts">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChanged"
        @current-change="handleCurrentChanged"
        :current-page="curPageIndex"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tradeCount">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>

  import moment from 'moment';

  export default {
    name: 'pay-trade-table',
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
      tradeCount() {
        if (this.dataSource === null || this.dataSource.count === undefined || this.dataSource.count === null) {
          return 0;
        }

        return this.dataSource.count;
      },

      sumAmount() {
        if (this.dataSource === null || this.dataSource.sum_amount === undefined || this.dataSource.sum_amount === null) {
          return 0.00;
        }

        return this.dataSource.sum_amount;
      },

      sumFee() {
        if (this.dataSource === null || this.dataSource.sum_fee === undefined || this.dataSource.sum_fee === null) {
          return 0.00;
        }

        return this.dataSource.sum_fee;
      },

      tradeList() {
        if (this.dataSource === null || this.dataSource.list === undefined || this.dataSource.list === null) {
          return [];
        }

        return this.dataSource.list;
      },
    },
    methods: {

      exportPayTradeList() {
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

  .pay-trade-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }

  .pay-trade-head {
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

  .block {
    margin-top: 20px;
    text-align: right;
  }
  .pay-trade-table table tbody tr td:nth-child(6) {
    color: #ff3366;
  }
  .pay-trade-table table tbody tr td:nth-child(7) {
    color: #ff3366;
  }
</style>
