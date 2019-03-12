
<template>
  <el-card id="agentpay-check-table" class="agentpay-check-table" v-loading="loading">
    <div class="agentpay-check-table-head" style="margin-bottom: 10px;">
      <div>
        <span>总笔数: </span><span class="head-data_text">{{ agentpayCheckCount }}笔</span>
        <span>总金额: </span><span class="head-data_text">{{ sumAmount }}元  </span>
      </div>
    </div>
    <el-table :data="agentpayCheckList" style="width: 100%">
      <el-table-column width="155" label="创建时间" prop="batchSysdate"></el-table-column>
      <el-table-column width="155" label="批次号" prop="batchId"></el-table-column>
      <el-table-column min-width="155" label="上传文件名" prop="batchFilename"></el-table-column>
      <el-table-column label="笔数" prop="batchCount"></el-table-column>
      <el-table-column label="总金额(元)"  min-width="90">
        <template slot-scope="scope">
          <span style="color: #ff3366">{{ scope.row.batchAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDetail(agentpayCheckList[scope.$index].batchId)">查看</el-button>
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
        :total="agentpayCheckCount">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>

  export default {
    name: 'agentpay-check-table',
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
      };
    },
    computed: {
      agentpayCheckCount() {
        if (this.dataSource === null || this.dataSource.count === undefined || this.dataSource.count === null) {
          return 0;
        }

        return this.dataSource.count;
      },

      agentpayCheckList() {
        if (this.dataSource === null || this.dataSource.list === undefined || this.dataSource.list === null) {
          return [];
        }

        return this.dataSource.list;
      },

      sumAmount() {
        if (this.dataSource === null || this.dataSource.total_amount === undefined || this.dataSource.total_amount === null) {
          return 0.00;
        }

        return this.dataSource.total_amount;
      },
    },
    methods: {
      handleSizeChanged(val) {
        this.$emit('handleSizeChangedEmit', val);
      },

      handleCurrentChanged(val) {
        this.$emit('handleCurrentChangedEmit', val);
      },

      showDetail(batchId) {
        console.log(batchId);
        this.$emit('showDetailEmit', { batchId });
      },
    },
  };
</script>

<style scoped="agentpay-check-table">

  .agentpay-check-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }

  .agentpay-check-table-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
