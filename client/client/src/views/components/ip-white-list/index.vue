
<template>
  <el-card id="ip-manager-table" class="ip-manager-table" :data="ipInfo" v-loading="tableLoading" style="min-height: 200px;">
    <div v-if="showIpList">
      <div v-if="ipInfo.length > 0" class="ip-body">
        <el-col v-if="ipInfo.length > 0">
          <el-input class="input" placeholder="请输入内容" v-for="(item, index) in ipInfo" v-if="index <= 9" :key="index" v-model="ipInfo[index]"  disabled>
            <template slot="prepend" class="el-input-group__prepend">IP {{index+1}}:</template>
          </el-input>
        </el-col>
      </div>
      <div v-if="ipInfo.length > 9" class="ip-body2" >
        <el-col v-if="ipInfo.length > 9">
          <el-input class="input" placeholder="请输入内容" v-for="(item, index) in ipInfo" :key="index" v-if="index > 9" v-model="ipInfo[index]"  disabled>
            <template slot="prepend" class="el-input-group__prepend">IP {{index+1}}:</template>
          </el-input>
        </el-col>
      </div>
    </div>
    <div v-if="ipInfo.length <= 0" class="el-table__empty-block1">
      <i class="el-icon-my-ip-peizhi" style="font-size: 55px"></i>
        <span class="el-table__empty-text1">暂未配置IP白名单</span>
    </div>
    <div v-if="ipInfo.length > 0">
    <el-button type="primary" @click="showAuthCapychaDialog" v-if="!showIpList" v-permission="'ip-white-list'">查看</el-button>
    </div>
  </el-card>
</template>

<script>

  import Vue from 'vue';
  import base64 from 'js-base64';
  import ActionTypeName from '@/utils/ActionTypeName';
  import router from '@/router';
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {
      ElCol,
      ElInput },
    name: 'ip-manager-table',
    props: {
      action: {
        type: String,
        required: true,
      },
      showIpList: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        tableLoading: false,
        ipInfo: [],
        curPageIndex: 1,
        pageSize: 20,
        pageSizes: [10, 20, 30, 40],
        hasIpInfo: false,
      };
    },
    created: function () {
      this.loadRoleInfo();
      this.getCustomerIp();
    },
    methods: {
      showAuthCapychaDialog() {
        this.$emit('showAuthCapychaDialog');
      },
      loadRoleInfo() {
        this.tableLoading = true;
        Vue.axios.get(this.action)
          .then((response) => {
            this.tableLoading = false;
            const ipInfo = response.data.map((value) => {
              return base64.Base64.decode(value);
            });
            this.ipInfo = ipInfo;
          })
          .catch((error) => {
            this.tableLoading = false;
            console.log(error);
          });
      },
      getCustomerIp() {
        this.$store.dispatch(ActionTypeName.GETCUSTOMERIP)
          .then((response) => {
            const ipInfo = response.data.map((value) => {
              return base64.Base64.decode(value);
            });
            this.ipInfo = ipInfo;
          })
          .catch((error) => {
            Vue.prototype.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
    },
  };
</script>

<style>

  .ip-manager-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }
  .el-table__empty-text1{
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%,-50%);
    color: #909399;
  }
  .el-table__empty-block1{
    position: relative;
    min-height: 90px;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .el-table__empty-block{
    display: none;
  }
  .ip-body{
    width: 50%;
    float: left;
    margin-bottom: 20px;
  }
  .ip-body2{
    width: 50%;
    float: right;
    margin-bottom: 20px;
  }
  .input{
    width: 70%;
    margin-top: 30px;
    margin-left: 10%;
  }

  .el-input-group__prepend{
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border-radius: 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
    border: 0px;
    background-color: white;
  }

  .el-icon-my-ip-peizhi {
    color: #909399;
  }

</style>
