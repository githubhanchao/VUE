
<template>
  <el-card id="agentpay-check-detail-table" class="agentpay-check-detail-table" v-loading="loading">
    <div class="agentpay-check-detail-head" style="margin-bottom: 10px;">
      <div>
        <span>总笔数: </span><span class="head-data_text">{{ agentpayCheckDetailCount }}笔</span>
        <span>总金额: </span><span class="head-data_text">{{ sumAmount }}元  </span>
        <span>批次号: </span><span>{{ batchId }}  </span>
      </div>
    </div>
    <el-table :data="agentpayCheckDetailList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="分行：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.trade_branchbank === 'null' ? '' : props.row.trade_branchbank }}</span>
            </el-form-item>
            <el-form-item label="支行：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.trade_subbranchbank === 'null' ? '' : props.row.trade_subbranchbank }}</span>
            </el-form-item>
            <el-form-item label="所在地：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.trade_province === 'null' ? '' : props.row.trade_province }}</span>
            </el-form-item>
            <el-form-item label="币种：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.trade_amounttype === 'null' ? '' : props.row.trade_amounttype }}</span>
            </el-form-item>
            <el-form-item label="证件类型：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.certificate_type === 'null' ? '' : props.row.certificate_type }}</span>
            </el-form-item>
            <el-form-item label="证件号：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.certificate_num === 'null' ? '' : props.row.certificate_num }}</span>
            </el-form-item>
            <el-form-item label="手机号：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.trade_mobile === 'null' ? '' : props.row.trade_mobile }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="收款方户名" prop="trade_cardname"></el-table-column>
      <el-table-column label="收款账号" prop="trade_cardnum"></el-table-column>
      <el-table-column label="账户类型" prop="trade_accounttype"></el-table-column>
      <el-table-column label="金额(元)">
        <template slot-scope="scope">
          <span style="color: #ff3366">{{ scope.row.trade_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商户订单号" prop="trade_custorder"></el-table-column>
      <el-table-column label="备注" prop="trade_remark"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChanged"
        @current-change="handleCurrentChanged"
        :current-page="curPageIndex"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="agentpayCheckDetailCount">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>

  export default {
    name: 'agentpay-check-detail-table',
    props: {
      dataSource: {
        type: Object,
      },
      loading: {
        type: Boolean,
        required: true,
      },
      batchId: {
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
      agentpayCheckDetailCount() {
        if (this.dataSource === null || this.dataSource.count === undefined || this.dataSource.count === null) {
          return 0;
        }

        return this.dataSource.count;
      },

      agentpayCheckDetailList() {
        if (this.dataSource && this.dataSource.list) {
          return this.dataSource.list;
        }

        return [];
      },

      sumAmount() {
        if (this.dataSource && this.dataSource.AMOUNTSUM !== undefined) {
          return this.dataSource.AMOUNTSUM;
        }

        return 0.00;
      },
    },
    methods: {
      handleSizeChanged(val) {
        this.$emit('handleSizeChangedEmit', val);
      },

      handleCurrentChanged(val) {
        this.$emit('handleCurrentChangedEmit', val);
      },
    },
  };
</script>

<style scoped="agentpay-check-detail-table">

  .agentpay-check-detail-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }

  .agentpay-check-detail-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
