
<template>
  <el-card id="batch-agentpay-table" class="batch-agentpay-table" v-loading="loading">
    <div class="batch-agentpay-head" style="margin-bottom: 10px;">
      <span style="font-size: 16px; font-weight: 700;">待提交</span>
      <a style="color: #409EFF; cursor: pointer; font-weight: 700;" class="el-icon-download"
         download="批量代付记录.csv" @click="exportAgentpayList">导出列表</a>
    </div>
    <el-table :data="agentpayList" style="width: 100%">
      <el-table-column width="155" label="创建时间" prop="batchSysdate"></el-table-column>
      <el-table-column width="155" label="批次号" prop="batchId"></el-table-column>
      <el-table-column min-width="155" label="上传文件名" prop="batchFilename"></el-table-column>
      <el-table-column label="笔数" prop="batchCount"></el-table-column>
      <el-table-column label="总金额(元)" min-width="90">
        <template slot-scope="scope">
          <span style="color: #ff3366">{{ scope.row.batchAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" min-width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDetail(agentpayList[scope.$index])">查看</el-button>
          <el-button size="mini" @click="deleteBatchAgentpay(agentpayList[scope.$index].batchId)">删除</el-button>
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
    name: 'batch-agentpay-table',
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
        if (this.dataSource && this.dataSource.count !== undefined) {
          return this.dataSource.count;
        }

        return 0;
      },

      agentpayList() {
        if (this.dataSource && this.dataSource.list) {
          return this.dataSource.list;
        }

        return [];
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

      showDetail(val) {
        this.$emit('showDetailEmit', {
          batchId: val.batchId,
          batchFilename: val.batchFilename,
        });
      },

      // 删除代付批次
      deleteBatchAgentpay(batchId) {
        this.$confirm('确定要删除该记录吗？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$emit('deleteBatchAgentpayEmit', batchId);
        }).catch(() => {
          console.log('已取消删除');
        });
      },
    },
  };
</script>

<style scoped="agentpay-query-table">

  .batch-agentpay-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }

  .batch-agentpay-head {
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
