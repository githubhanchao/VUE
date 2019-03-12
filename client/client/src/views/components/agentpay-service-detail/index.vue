<template>
  <div class="agentpay-service-detail-card">
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
        <td>单笔对私手续费:</td>
        <td>{{ formInfo.single_pri_fee_label}}</td>
        <td>单笔对公手续费:</td>
        <td>{{ formInfo.single_pub_fee_label}}</td>
      </tr>
      <tr>
        <td>批量对私手续费:</td>
        <td>{{ formInfo.batch_pri_fee_label }}</td>
        <td>批量对公手续费:</td>
        <td>{{ formInfo.batch_pub_fee_label}}</td>
      </tr>
      <tr>
        <td>接口对私手续费:</td>
        <td>{{ formInfo.interface_pri_fee_label }}</td>
        <td>接口对公手续费:</td>
        <td>{{ formInfo.interface_pub_fee_label }}</td>
      </tr>
      <tr>
        <td>单笔限额 对私:</td>
        <td>{{ formInfo.pri_limit_money_label }}</td>
        <td>单笔限额 对公:</td>
        <td>{{ formInfo.pub_limit_money_label }}</td>
      </tr>
      <tr>
        <td>日限笔数:</td>
        <td>{{ formInfo.day_limit_trans }}</td>
        <td>日限额（金额）:</td>
        <td>{{ formInfo.day_limit_money_label }}</td>
      </tr>
      <tr>
        <td>月限笔数:</td>
        <td>{{ formInfo.month_limit_trans }}</td>
        <td>月限额（金额）:</td>
        <td>{{ formInfo.month_limit_money_label }}</td>
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
  .agentpay-service-detail-card .el-dialog__body {
    padding-top: 0;
  }
  .agentpay-service-detail-card h2.title {
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
