<template>

  <el-card class="query-result">
    <div class="table-title" style="margin-bottom: 10px;">
      <span class="record">充值记录</span>
    </div>
    <el-table :data="data" v-loading="loading" fit style="width: 100%;text-align: center;">
      <el-table-column  label="创建时间" min-width="160" prop="createdate"></el-table-column>
      <el-table-column  label="订单号" min-width="180" prop="ordernum"></el-table-column>
      <el-table-column  label="开户行" min-width="180" prop="acquireBank"></el-table-column>
      <el-table-column  label="户名" min-width="80" prop="acquireAccountName"></el-table-column>
      <el-table-column  label="银行账户" min-width="180" prop="acquireCardNo"></el-table-column>
      <el-table-column  label="充值金额(元)" min-width="120" prop="amount"></el-table-column>
      <el-table-column  label="手续费(元)" min-width="120" prop="amount">
        <template slot-scope="scope">
          <span style="color: #00cc66;">{{(scope.row.serviceFee || scope.row.serviceFee === 0) ? scope.row.serviceFee : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="实际到账(元)" min-width="120" prop="amount">
        <template slot-scope="scope">
          <span style="color: #ff3366">{{ scope.row.serviceFee ? ( scope.row.amount - scope.row.serviceFee).toFixed(2) : scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="备注" min-width="80" prop="acquireNote"></el-table-column>
      <el-table-column  label="状态" min-width="80" prop="ordersts">
        <template slot-scope="scope">
          <span>{{scope.row.ordersts || ''}}</span>
          <!--<span v-if="scope.row.ordersts">{{scope.row.ordersts}}</span>-->
          <!--<span v-else>订单失败</span>-->
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="审核备注" min-width="80" prop="reviewNote"></el-table-column>
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
    data () {
      return {
        queryCond: {
          page_size: 20,
          page: 1,
        },
      };
    },
    props: {
      loading: {
        type: Boolean,
        required: true,
      },
      data: {
        type: Array,
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
    },
    computed: {},
    created () { },
    methods: {
      handleSizeChange (val) {
        this.queryCond.page_size = val;
        this.responseData();
      },
      handleCurrentChange (val) {
        this.queryCond.page = val;
        this.responseData();
      },
      responseData () {
        this.$emit('changeTableEmit', this.queryCond);
      },
      itemFormatTimestamp (timestamp, formatStr) {
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
.query-result .el-form-item {
  width: 100%;
}
.block {
  margin-top: 20px;
  text-align: right;
}
</style>
<style>
.query-result table tbody tr td:nth-child(5) {
  color: #ff3366;
}
.query-result .el-table__header-wrapper .el-table__header tr th {
  text-align: center;
}
</style>
