<template>
  <el-card class="merchant-info-comp">
    <table class="infoTable">
      <tr>
        <td>商户号:</td>
        <td>{{ merchantInfo.customer_no }}</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>营业执照编码:</td>
        <td>{{ merchantInfo.business_license_code }}</td>
        <td>法人:</td>
        <td>{{ merchantInfo.legal }}</td>
      </tr>
      <tr>
        <td>组织机构代码:</td>
        <td>{{ merchantInfo.organization_code }}</td>
        <td>公司人数:</td>
        <td>{{ merchantInfo.number_of_staff }}</td>
      </tr>
      <tr>
        <td>企业税号:</td>
        <td>{{ merchantInfo.tax_registration_no }}</td>
        <td>办公地址:</td>
        <td>{{ merchantInfo.office_location }}</td>
      </tr>
      <tr>
        <td>注册地:</td>
        <td>{{ merchantInfo.registered_place }}</td>
        <td>公司电话:</td>
        <td>{{ merchantInfo.company_phone }}</td>
      </tr>
      <tr>
        <td>执照有效期:</td>
        <td>{{ merchantInfo.license_expires }}</td>
        <td>邮编:</td>
        <td>{{ merchantInfo.zip_code }}</td>
      </tr>
      <tr>
        <td>联系人电话:</td>
        <td>{{ merchantInfo.biz_phone }}</td>
        <td>联系人:</td>
        <td>{{ merchantInfo.biz_man }}</td>
      </tr>
      <tr>
        <td>经营范围:</td>
        <td colspan="3">{{ merchantInfo.business_scope }}</td>
      </tr>
    </table>
  </el-card>
</template>
<script>
  export default {
    name: 'merchant-info',
    props: {
      merchantInfo: {
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
  };
</script>
<style>
  .infoTable {
    width: 100%;
    border-collapse:collapse;
  }
  .infoTable td {
    width: 20%;
    padding-left: 20px;
    height: 40px;
    border: 1px solid #edeff1;
  }
  .merchant-info-comp.el-card__body {
    padding-bottom: 50px;
  }
</style>
