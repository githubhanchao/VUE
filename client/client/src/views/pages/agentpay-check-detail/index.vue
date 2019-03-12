<template>
  <div class="agentpay-check-detail">
    <div class="page-header">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
      <div>
        <el-button v-show="agentpayCheckDetailData.list && agentpayCheckDetailData.list.length"
                   size="large" class="batch_apply_btn" type="danger" icon="el-icon-my-shenhejujue"
                   @click="agentpayCheckRejectBtnClicked">审核拒绝</el-button>
        <el-button v-show="agentpayCheckDetailData.list && agentpayCheckDetailData.list.length"
                   size="large" class="batch_apply_btn" type="primary" icon="el-icon-my-duihao"
                   @click="agentpayCheckPassBtnClicked">审核通过</el-button>
      </div>
    </div>
    <agentpay-check-detail-table-comp :loading="tableLoading" :dataSource="agentpayCheckDetailData"
                               @handleSizeChangedEmit="handleSizeChanged" :batchId="batchId"
                               @handleCurrentChangedEmit="handleCurrentChanged">
    </agentpay-check-detail-table-comp>
    <el-dialog :visible.sync="agentpayCheckRejectDialogVisible" v-if="agentpayCheckRejectDialogVisible">
      <agentpay-check-reject-comp :action="agentpayRejectUrl" :batchId="batchId"
              @agentpayDetailRejectOnSuccessEmit="agentpayDetailRejectOnSuccess"
              @agentpayDetailRejectOnFailEmit="agentpayDetailRejectOnFail"></agentpay-check-reject-comp>
    </el-dialog>
    <el-dialog :visible.sync="verifyTradePwdDialogVisible" v-if="verifyTradePwdDialogVisible" :close-on-click-modal="false">
      <verify-trade-pwd-comp @authTradePwdFinishEmit="authTradePwdFinish"></verify-trade-pwd-comp>
    </el-dialog>
    <el-dialog :visible.sync="authCaptchaDialogVisible" v-if="authCaptchaDialogVisible" :close-on-click-modal="false">
      <auth-captcha-comp class="authCaptchaComp" :auth_token="captchaAuthToken"
                         :accountNo="defaultEmail"
                         @authCaptchaFinishEmit="authCaptchaFinishEvent">
      </auth-captcha-comp>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import agentpayCheckDetailTableComp from '@components/agentpay-check-detail-table';
  import pageHeaderComp from '@components/page-header';
  import authCaptchaComp from '@components/auth-captcha';
  import agentpayCheckRejectComp from '@components/agentpay-check-reject';
  import verifyTradePwdComp from '@components/verify-trade-pwd';
  import UrlConfig from '@/utils/UrlConfig';
  import queryString from 'query-string';
  import RequestHeaderUtil from '@/utils/RequestHeaderUtil';
  import router from '@/router';
  import FlowControlConst from '@/utils/FlowControlConst';

  export default {
    name: 'agentpay-check-detail',
    components: {
      agentpayCheckDetailTableComp,
      pageHeaderComp,
      agentpayCheckRejectComp,
      verifyTradePwdComp,
      authCaptchaComp,
    },
    data() {
      return {
        agentpayCheckDetailData: {},
        tableLoading: false,
        curPageIndex: 1,
        pageSize: 20,
        exportListUrl: '',
        agentpayCheckRejectDialogVisible: false,
        verifyTradePwdDialogVisible: false,
        batchId: '',
        agentpayRejectUrl: '',
        captchaAuthToken: '',
        authCaptchaDialogVisible: false,
      };
    },
    created: function () {
      this.agentpayRejectUrl = UrlConfig.AGENTPAY_CHECK_PATH;
      this.batchId = this.$route.query.batchId;
      this.queryAgentpayCheckDetail();
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        userInfo: state => state.user.userInfo,
        pageMeta: state => state.meta.pageMeta,
        authInfo: state => state.user.authInfo,
      }),
      defaultEmail() {
        return this.userInfo.defaultEmail;
      },
    },
    methods: {
      authCaptchaFinishEvent() {
        this.authCaptchaDialogVisible = false;
        this.verifyTradePwdEmitHandle();
      },
      queryAgentpayCheckDetail() {
        this.tableLoading = true;
        const condParams = {
          batchId: this.batchId,
          page: this.pageIndex,
          page_size: this.pageSize,
        };

        Vue.axios.get(UrlConfig.AGENTPAY_CHECK_DETAIL_PATH, { params: condParams })
          .then((response) => {
            this.tableLoading = false;
            this.agentpayCheckDetailData = response.data;
          })
          .catch((error) => {
            this.tableLoading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      // 分页变量改变
      handleSizeChanged(val) {
        this.pageSize = val;
        this.queryAgentpayCheckDetail();
      },

      handleCurrentChanged(val) {
        this.curPageIndex = val;
        this.queryAgentpayCheckDetail();
      },

      agentpayCheckRejectBtnClicked() {
        this.agentpayCheckRejectDialogVisible = true;
      },

      agentpayCheckPassBtnClicked() {
        Vue.axios.post(UrlConfig.TRADE_PWD_AUTH_PATH)
          .then((response) => {
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);
            if (response.data.auth_next_step === '') {
              this.verifyTradePwdEmitHandle();
            }
            if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.authCaptchaDialogVisible = true;
            }

            if (response.data.auth_next_step === FlowControlConst.CHECK_TRADE_PWD) {
              this.verifyTradePwdDialogVisible = true;
            }
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      // 支付密码校验
      authTradePwdFinish(data) {
        console.log(data);
        this.verifyTradePwdDialogVisible = false;
        this.captchaAuthToken = data.auth_token;
        if (data.auth_next_step === '') {
          this.verifyTradePwdEmitHandle();
        }

        if (data.auth_next_step === FlowControlConst.CAPTCHA) {
          this.authCaptchaDialogVisible = true;
        }
      },

      verifyTradePwdEmitHandle() {
        Vue.axios.post(UrlConfig.SINGLE_PAY_CHECK_SUCCESS_PATH, {
          auth_token: this.authInfo.auth_token,
          batch_order: this.$route.query.batchId,
        })
        .then(() => {
          this.$message({
            showClose: true,
            message: `批次号：${this.$route.query.batchId} 的申请，审核通过，可在代付查询中查看历史记录`,
            type: 'success',
          });
          this.verifyTradePwdDialogVisible = false;
          this.$router.push('/home/agentpay-check');
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
          });
        });
        setTimeout(() => {
          this.$parent.$children[1].timingNotifiacation();
        }, 1000);
      },

      agentpayDetailRejectOnSuccess(batchId) {
        this.$message({
          showClose: true,
          message: `批次号：${batchId} 的申请，【审核拒绝】成功，可在代付查询中查看历史记录`,
          type: 'success',
        });
        setTimeout(() => {
          this.$parent.$children[1].timingNotifiacation();
        }, 1000);
        this.$router.push('/home/agentpay-check');
      },

      agentpayDetailRejectOnFail(error) {
        this.$message({
          showClose: true,
          message: error.respMessage,
          type: 'error',
        });
      },
    },
  };
</script>

<style scoped="agentpay-check-detail">

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
