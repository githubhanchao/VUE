<template>
  <div class="pay-service-detail-card">
    <h2 class="title">查看详情</h2>
    <table class="infoTable">
      <tr>
        <td>合同号:</td>
        <td>{{ formInfo.contract_no }}</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>服务类型:</td>
        <td>{{ formInfo.service_code }}</td>
        <td>服务状态:</td>
        <td>{{ formInfo.enable }}</td>
      </tr>
      <tr>
        <td>生效时间:</td>
        <td>{{ formInfo.start_time }}</td>
        <td>到期时间:</td>
        <td>{{ formInfo.end_time }}</td>
      </tr>
      <tr>
        <td>服务参数:</td>
        <td>{{ formInfo.service_params }}</td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    props: {
      formInfo: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
      
      };
    },
    methods: {
    
    },
  }
</script>
<style scoped>
  .pay-service-detail-card .el-dialog__body {
    padding-top: 0;
  }
  .pay-service-detail-card h2.title {
    line-height: 20px;
    margin-top: 0;
  }
  .infoTable {
    width: 100%;
    border-collapse:collapse;
  }
  .infoTable td {
    min-width: 120px;
    padding-left: 20px;
    border: 1px solid #edeff1;
  }
  .infoTable tr td:nth-child(odd) {
    width: 100px;
    height: 40px;
  }
  .infoTable tr td:nth-child(even) {
    width: 33%;
  }
</style>
