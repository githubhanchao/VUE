<template>
  <div class="agentpay-certificate-table">
    <el-card>
      <table>
        <tr>
          <td>证书类型</td>
          <td>上传时间</td>
        </tr>
        <tr v-if="!!certificateUploadTime">
          <td>代付证书</td>
          <td>{{ certificateUploadTime }}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      
      };
    },
    props: {
      certificateUploadTime: {
        type: String,
        required: true,
      },
    },
  };
</script>
<style>
  .agentpay-certificate-table table {
    width: 100%;
    border-collapse: collapse;
  }
  .agentpay-certificate-table table td {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    color: #666;
    border: 1px solid #e1e8f1;
  }
</style>
