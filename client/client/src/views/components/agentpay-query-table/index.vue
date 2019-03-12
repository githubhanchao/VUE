
<template>
  <el-card id="agentpay-query-table" class="agentpay-query-table" v-loading="loading">
    <div class="agentpay-head" style="margin-bottom: 10px;">
      <div>
        <span>总交易笔数: </span><span class="head-data_text">{{ agentpayCount }}笔</span>
        <span>总交易金额: </span><span class="head-data_text">{{ sumAmount }}元  </span>
        <span>总手续费: </span><span class="head-data_text">{{ sumFee }}元  </span>
      </div>
      <a style="color: #409EFF; cursor: pointer; font-weight: 700;" class="el-icon-download"
         download="代付交易记录.csv" @click="exportAgentpayList"
         v-permission="'agentpay-query-exports'">导出列表</a>
    </div>
    <el-table :data="agentpayList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="结算方式：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.batchFeetype }}</span>
            </el-form-item>
            <el-form-item label="备注：" :labelWidth="expandItemLabelWidth">
              <span>{{ props.row.subject }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="155" label="创建时间" prop="batchSysdate"></el-table-column>
      <el-table-column width="155" label="批次号" prop="batchId"></el-table-column>
      <el-table-column min-width="155" label="上传文件名" prop="batchFilename"></el-table-column>
      <!--<el-table-column label="笔数/失败" prop="transNum"></el-table-column>-->
      <el-table-column label="总金额(元)" min-width="90">
        <template slot-scope="scope">
          <span style="color: #ff3366">{{ scope.row.batchAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实付(元)">
        <template slot-scope="scope">
          <span style="color: #00cc66">{{ scope.row.batchAccamount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费(元)" min-width="90">
        <template slot-scope="scope">
          <span style="color: #ff3366">{{ scope.row.batchFee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="batchStatus"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDetail(agentpayList[scope.$index].batchId)">明细</el-button>
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
      agentpayCount() {
        if (this.dataSource === null || this.dataSource.count === undefined || this.dataSource.count === null) {
          return 0;
        }

        return this.dataSource.count;
      },

      agentpayList() {
        if (this.dataSource === null || this.dataSource.list === undefined || this.dataSource.list === null) {
          return [];
        }

        return this.dataSource.list;
      },

      sumAmount() {
        if (this.dataSource === null || this.dataSource.ACCAMOUNTSUM === undefined || this.dataSource.ACCAMOUNTSUM === null) {
          return 0.00;
        }

        return this.dataSource.ACCAMOUNTSUM;
      },

      sumFee() {
        if (this.dataSource === null || this.dataSource.BATCHFEESUM === undefined || this.dataSource.BATCHFEESUM === null) {
          return 0.00;
        }

        return this.dataSource.BATCHFEESUM;
      },
    },
    methods: {

      exportAgentpayList() {
        window.open(this.exportUrl);
      },

      handleSizeChanged(val) {
        this.$emit('handleSizeChangedEmit', val);
      },

      handleCurrentChanged(val) {
        this.$emit('handleCurrentChangedEmit', val);
      },

      showDetail(batchId) {
        this.$emit('showDetailEmit', { batchId });
      },
    },
  };
</script>

<style scoped="agentpay-query-table">

  .agentpay-query-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }

  .agentpay-head {
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
