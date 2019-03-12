<template>
  <div class="customer-certification">
    <div class="head-container">
      <div class="head">
        <span style="font-size: 30px;">企业资料实名认证</span>
        <p>请务必填写真实有效的信息，提交后我们将尽快审核，审核结果将第一时间通知您</p>
      </div>
    </div>
    <component :is="componentName" @nextEmit="nextEmitHandle" :loginBtnLoading="loginBtnLoading"></component >
  </div>
</template>
<script>
  import Vue from 'vue';
  import moment from 'moment';
  import customerCertificationStep1 from '@components/customer-certification-step1';
  import customerCertificationStep2 from '@components/customer-certification-step2';
  import UrlConfig from '@/utils/UrlConfig';
  
  export default {
    name: 'customer-certification-step1',
    components: {
      customerCertificationStep1,
      customerCertificationStep2,
    },
    data() {
      return {
        componentName: 'customerCertificationStep1',
        loginBtnLoading: false,
      };
    },
    created() {
      Vue.axios.get(UrlConfig.GET_CUSTOMER_CHECK_STATUS_PATH, { params: { defaultEmail: this.$route.query.defaultEmail } })
        .then((response) => {
          if (response.data.pid && response.data.aduit_status) {
           this.componentName = 'customerCertificationStep2';
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    computed: {
    
    },
    methods: {
      nextEmitHandle(params) {
        this.loginBtnLoading = true;
        params.licenseExpires = moment(params.licenseExpires).format('YYYY-MM-DD');
        Vue.axios.post(UrlConfig.CUSTOMER_REPORT_PATH, params)
          .then((response) => {
            this.loginBtnLoading = false;
            this.componentName = 'customerCertificationStep2';
          })
          .catch((error) => {
            this.loginBtnLoading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
    },
  }
</script>
<style>
  .head {
    background-color: rgba(102,102,153,.9);
    color: #fff;
    width: 100%;
    height: 230px;
    text-align: center;
    padding-top: 70px;
  }
  .customer-certification {
    min-height: 100%;
    background-color: rgba(243, 243, 243, 1);
  }
  .head-container {
    background: url("../../../assets/img/zbj_bg.jpeg") no-repeat top center /cover;
  }
</style>
