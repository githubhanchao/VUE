
<template>
  <el-card id="login-log-table" class="login-log-table" v-loading="loading">
    <el-select v-model="operatorName" placeholder="按姓名筛选" :clearable="true" @change="operatorChanged" class="name-select">
      <el-option
        v-for="item in operatorList"
        :key="item.id"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
    <el-table :data="loginLogList" class="loginlog">
      <el-table-column min-width="100" label="操作时间" prop="date_created"></el-table-column>
      <el-table-column min-width="100" label="操作员名称" prop="operator_name"></el-table-column>
      <el-table-column min-width="100" label="操作员账号" prop="account"></el-table-column>
      <el-table-column label="IP地址" prop="ip"></el-table-column>
      <el-table-column label="操作名称" prop="names"></el-table-column>
      <el-table-column label="操作结果" prop="opResult"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChanged"
        @current-change="handleCurrentChanged"
        :current-page="curPageIndex"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="logPageCount">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
  import { mapState } from 'vuex';
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'login-log-table',
    props: {
    },
    data() {
      return {
        loading: true,
        operatorList: [],
        loginLogList: [],
//        operatorId: '',
        operatorName: '',
        curPageIndex: 1,
        pageSize: 20,
        pageSizes: [10, 20, 30, 40],
        logPageCount: 0,
      };
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
      }),
    },
    created() {
      this.loadOperatorList();
      this.loadLoginLog();
    },
    methods: {
      loadOperatorList() {
        Vue.axios.get(UrlConfig.OPERATOR_LIST_PATH)
          .then((response) => {
            this.operatorList = response.data;
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      loadLoginLog() {
        const condParams = {
          operator_name: this.operatorName,
          page: this.curPageIndex,
          page_size: this.pageSize,
        };

        this.loading = true;
        Vue.axios.get(UrlConfig.LOGIN_LOG_LIST_PATH, { params: condParams })
          .then((response) => {
            this.loading = false;
            this.loginLogList = response.data.list;
            this.logPageCount = response.data.count;
          })
          .catch((error) => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      operatorChanged(val) {
        this.operatorName = val;
        this.loadLoginLog();
      },

      handleSizeChanged(val) {
        this.pageSize = val;
        this.loadLoginLog();
      },

      handleCurrentChanged(val) {
        this.curPageIndex = val;
        this.loadLoginLog();
      },
    },
  };
</script>

<style scoped>
  .login-log-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }
  .name-select {
    margin-bottom: 20px;
  }
  .loginlog .el-button+.el-button {
    margin-left: 0;
  }
</style>
