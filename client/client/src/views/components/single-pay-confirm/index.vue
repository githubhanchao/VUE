<template>
  <div id="single-pay-confirm-card" class="single-pay-confirm-card">
    <h2 class="title">确认信息</h2>
    <table class="infoTable">
      <tr>
        <td>收款方姓名</td>
        <td>{{ formInfo.card_name }}</td>
        <td>币种</td>
        <td>CNY</td>
      </tr>
      <tr>
        <td>银行账号</td>
        <td>{{ formInfo.card_no }}</td>
        <td>付款金额</td>
        <td>{{ formInfo.amount }}</td>
      </tr>
      <tr>
        <td>开户行</td>
        <td>{{ formInfo.card_bank_name }}</td>
        <td>商户订单号</td>
        <td>{{ formInfo.order_no }}</td>
      </tr>
      <tr>
        <td>分行</td>
        <td>{{ formInfo.bank_branch }}</td>
        <td>手机号</td>
        <td>{{ formInfo.mobile_phone_no }}</td>
      </tr>
      <tr>
        <td>支行</td>
        <td>{{ formInfo.bank_sub_branch }}</td>
        <td>证件类型</td>
        <td>{{ formInfo.certificate_type ? certificateType.find(function(item){ if(item.code === formInfo.certificate_type) return item; }).name : '' }}</td>
      </tr>
      <tr>
        <td>所在地</td>
        <td>{{ formInfo.bank_province }} {{ formInfo.bank_city }}</td>
        <td>证件号</td>
        <td>{{ formInfo.certificate_no }}</td>
      </tr>
      <tr>
        <td>账户类型</td>
        <td>{{ formInfo.account_type ? accountTypes.find(function(item){ if(item.code === formInfo.account_type) return item; }).name : '' }}</td>
        <td>备注</td>
        <td>{{ formInfo.remark }}</td>
      </tr>
    </table>
    <div class="btn">
      <el-button type="danger" @click="submit">确认提交</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>
<script>
  import AccountType from '@/utils/getAccountType';
  import CertificateType from '@/utils/getCertificateType';
  import BankName from '@/utils/getBankName';
  
  export default {
    name: 'single-pay-confirm-card',
    props: {
      formInfo: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        // 账户类型
        accountTypes: AccountType.allAccountType(),
        // 证件类型
        certificateType: CertificateType.allCertificateTypes(),
        // 银行名称
        bankName: BankName.queryBanks(),
      };
    },
    computed: {
    
    },
    methods: {
      submit() {
        this.$emit('submitEmit', this.formInfo);
      },
      back() {
        this.$emit('backEmit');
      },
    },
  };
</script>

<style scoped>
  .single-pay-confirm-card .el-dialog__body {
    padding-top: 0;
  }
  .single-pay-confirm-card h2.title {
    line-height: 20px;
    margin-top: 0;
  }
  .infoTable {
    width: 100%;
    border-collapse:collapse;
  }
  .infoTable td {
    min-width: 100px;
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
  .btn {
    margin-top: 20px;
    text-align: center;
  }
</style>
