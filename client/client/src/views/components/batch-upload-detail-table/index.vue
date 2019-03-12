
<template>
  <el-card id="batch-upload-detail-table" class="batch-upload-detail-table" v-loading="loading">
    <div class="batch-upload-detail-head" style="margin-bottom: 10px;">
      <div>
        <span>总笔数: </span><span class="head-data_text">{{ agentpayCount }}笔</span>
        <span>总金额: </span><span class="head-data_text">{{ sumAmount }}元  </span>
        <span>上传文件名: </span><span class="head-data_text">{{ fileName }}</span>
      </div>
    </div>
    <el-table :data="agentpayList" style="width: 100%" class="batch-upload-detail">
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
              <span>{{ props.row.trade_province_label === 'null' ? '' : props.row.trade_province_label }}</span>
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
      <el-table-column label="收款方户名" prop="trade_cardname" width="95"></el-table-column>
      <el-table-column label="收款账号" prop="trade_cardnum_label"></el-table-column>
      <el-table-column label="账户类型" prop="trade_accounttype" width="85"></el-table-column>
      <el-table-column label="金额(元)">
        <template slot-scope="scope">
          <span style="color: #ff3366">{{ scope.row.trade_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商户订单号" prop="trade_custorder" min-width="90"></el-table-column>
      <el-table-column label="备注" prop="trade_remark"></el-table-column>
      <el-table-column label="检验结果" prop="err_msg"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editAgentpay(agentpayList[scope.$index])">编辑</el-button>
          <el-button size="mini" @click="deleteBatchDetail(agentpayList[scope.$index])">删除</el-button>
        </template>
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
        :total="agentpayCount">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>

  export default {
    name: 'batch-upload-detail-table',
    props: {
      dataSource: {
        type: Object,
      },
      loading: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        expandItemLabelWidth: '120px',
        curPageIndex: 1,
        pageSize: 20,
        pageSizes: [10, 20, 30, 40],
        fileName: '',
      };
    },
    created() {
      this.fileName = this.$route.query.batchFilename || 'XXXX.xlsx';
    },
    computed: {
      agentpayCount() {
        if (this.dataSource && this.dataSource.count !== undefined) {
          return this.dataSource.count;
        }

        return 0;
      },

      agentpayList() {
        if (this.dataSource && this.dataSource.list !== undefined) {
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

      editAgentpay(agentpayDetail) {
        agentpayDetail.batchId = this.$route.query.batchId;
        agentpayDetail.batchFilename = this.$route.query.batchFilename;
        this.$emit('editAgentpayEmit', agentpayDetail);
      },

      // 删除批次明细
      deleteBatchDetail(agentpayDetail) {
        this.$confirm('确定要删除该记录吗？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$emit('deleteBatchDetailEmit', {
            tradeId: agentpayDetail.trade_id,
            leftCount: this.agentpayList.length,
          });
        }).catch(() => {
          console.log('已取消删除');
        });
      },
    },
  };
</script>

<style scoped="agentpay-query-table">

  .batch-upload-detail-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }

  .batch-upload-detail-head {
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
  .batch-upload-detail .el-button+.el-button {
    margin-left: 0;
  }
</style>
