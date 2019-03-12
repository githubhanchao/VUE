<template>
  <div class="customer-certification-step2">
    <el-card class="body">
      <p :class="{ 'el-icon-my-shenhezhong': checkStatus === '审核中', 'el-icon-my-shenhetongguo': checkStatus === '审核通过', 'el-icon-my-shenhejujue1': checkStatus === '审核拒绝' }"></p>
      <p style="font-size: 16px;" :class="{ 'shenhezhong': checkStatus === '审核中', 'shenhetongguo': checkStatus === '审核通过', 'shenhejujue': checkStatus === '审核拒绝' }">{{ checkStatus }}</p>
      <p style="color: #333333;">{{ checkStatusStr1 }}</p>
      <p style="color: #333333;" v-if="checkRejectVisible">{{ '原因是:' + checkReject }}</p>
      <p style="color: #333333;" v-html="checkStatusStr2"></p>
    </el-card>
  </div>
</template>
<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';
  
  export default {
    name: 'customer-certification-step2',
    data() {
      return {
        checkRejectVisible: false,
        checkReject: '',
        checkStatus: '审核中',
        checkStatusStr1: '您的企业认证信息正在审核，请耐心等待。',
        checkStatusStr2: '审核结果将第一时间通知您，您也可以联系客服人员查询审核进度。',
      };
    },
    created() {
      Vue.axios.get(UrlConfig.GET_CUSTOMER_CHECK_STATUS_PATH, { params: { defaultEmail: this.$route.query.defaultEmail } })
        .then((response) => {
          if (response.data.aduit_status) {
            if (response.data.aduit_status === '1') {
              this.checkStatus = '审核通过';
              this.checkStatusStr1 = '恭喜！您的企业认证信息审核通过。';
              this.checkStatusStr2 = '工作人员会尽快与您联系，您也可以直接联系您对接工作人员。';
            }
            if (response.data.aduit_status === '2') {
              this.checkRejectVisible = true;
              this.checkStatus = '审核拒绝';
              this.checkStatusStr1 = '抱歉！您的企业认证信息未审核通过。';
              this.checkReject = response.data.refusal_reason;
              this.checkStatusStr2 = '点击 <span style="color: #1E8CFF; cursor: pointer;">这里</span> 重新修改信息，您可以直接联系您对接工作人员。';
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
//      document.querySelector('.modify').addEventListener('click', () => {
//        this.$router.push('');
//      });
    },
    computed: {
    
    },
    methods: {
    
    },
  }
</script>
<style scoped>
  .customer-certification-step2 {
    width: 90%;
    margin: -80px auto;
    background-color: #fff;
    max-width: 1120px;
  }
  .body {
    text-align: center;
  }
  .el-icon-my-shenhezhong {
    color: #07a3f6;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 70px;
  }
  .shenhezhong {
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 0;
    color: #409eff;
  }
  .el-icon-my-shenhetongguo {
    margin-top: 0;
    margin-bottom: 0;
    color: #36ab60;
    font-size: 70px;
  }
  .shenhetongguo {
    color: #36ab60;
  }
  .el-icon-my-shenhejujue1 {
    margin-top: 0;
    margin-bottom: 0;
    color: #ff6d5d;
    font-size: 70px;
  }
  .shenhejujue {
    color: #fa6666;
  }
</style>
<style>
  .customer-certification-step2 .el-card__body {
    padding: 90px 30px;
  }
</style>
