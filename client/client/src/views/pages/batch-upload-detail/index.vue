<template>
  <div class="batch-upload-detail">
    <div class="batch-upload-detail-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
      <el-button size="large" type="danger" class="confirm_submit_btn" icon="el-icon-my-tijiao"
                 v-show="batchAgentpayData.list && batchAgentpayData.list.length"
                 @click="confirmSubmit" :loading="btnLoading">确认提交</el-button>
    </div>
    <batch-upload-detail-table-comp :loading="tableLoading" :dataSource="batchAgentpayData"
                                    @deleteBatchDetailEmit="deleteBatchDetailHandle"
                                    @handleSizeChangedEmit="handleSizeChanged" @editAgentpayEmit="editAgentpay"
                                    @handleCurrentChangedEmit="handleCurrentChanged">
    </batch-upload-detail-table-comp>
    <el-dialog :visible.sync="authCaptchaDialogVisible" @close="closeAuthCaptchaComp" v-if="authCaptchaDialogVisible" :close-on-click-modal="false">
      <auth-captcha-comp :auth_token="captchaAuthToken" ref="authCaptchaComp"
                         :verifyModeProp="verifyModeProp"
                         :accountNo="defaultEmail" @authCaptchaFinishEmit="authCaptchaFinishEvent">
      </auth-captcha-comp>
    </el-dialog>
    <el-dialog :visible.sync="verifyTradePwdDialogVisible" v-if="verifyTradePwdDialogVisible" class="authCapth" :close-on-click-modal="false">
      <verify-trade-pwd-comp @authTradePwdFinishEmit="authTradePwdFinish"></verify-trade-pwd-comp>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import pageHeaderComp from '@components/page-header';
  import authCaptchaComp from '@components/auth-captcha';
  import batchUploadDetailTableComp from '@components/batch-upload-detail-table';
  import verifyTradePwdComp from '@components/verify-trade-pwd';
  import UrlConfig from '@/utils/UrlConfig';
  import Vue from 'vue';
  import router from '@/router';
  import FlowControlConst from '@/utils/FlowControlConst';

  export default {
    name: 'batch-upload-detail',
    components: {
      pageHeaderComp,
      batchUploadDetailTableComp,
      authCaptchaComp,
      verifyTradePwdComp,
    },
    data() {
      return {
        authCaptchaDialogVisible: false,
        verifyTradePwdDialogVisible: false,
        batchAgentpayData: {},
        tableLoading: false,
        curPageIndex: 1,
        pageSize: 20,
        batchId: '',
        captchaAuthToken: '',
        verifyModeProp: false,
        btnLoading: false,
      };
    },
    created: function () {
      this.batchId = this.$route.query.batchId;
      this.queryAgentpayDetail();
    },
    computed: {
      ...mapState({
        authInfo: state => state.user.authInfo,
        userInfo: state => state.user.userInfo,
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),

      captchaDuration() {
        return this.appMeta.ui.captchaDuration;
      },

      defaultEmail() {
        return this.userInfo.defaultEmail;
      },
    },
    methods: {

      confirmSubmit() {
        this.startSubmitSession();
      },

      // 发起确认提交会话申请
      startSubmitSession() {
        this.btnLoading = true;
        Vue.axios.post(UrlConfig.AUTH_VERIFY_BATCH_PATH)
          .then((response) => {
            this.btnLoading = false;
            this.$store.commit('SET_AUTH_INFO', response.data);
            this.captchaAuthToken = response.data.auth_token;
            const authNextStep = response.data.auth_next_step;

            if (authNextStep === '') {
              this.submitAgentpayBatch();
            }

            if (authNextStep === FlowControlConst.CAPTCHA) {
              this.authCaptchaDialogVisible = true;
            }

            if (authNextStep === FlowControlConst.CHECK_TRADE_PWD) {
              this.verifyTradePwdDialogVisible = true;
            }
          })
          .catch((error) => {
            this.btnLoading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },


      // 身份验证完成
      authCaptchaFinishEvent() {
        this.authCaptchaDialogVisible = false;
        this.submitAgentpayBatch();
      },

      // 支付密码校验
      authTradePwdFinish(data) {
        console.log(data);
        this.verifyTradePwdDialogVisible = false;
        this.captchaAuthToken = data.auth_token;
        if (data.auth_next_step === '') {
          this.submitAgentpayBatch();
        }

        if (data.auth_next_step === FlowControlConst.CAPTCHA) {
          this.authCaptchaDialogVisible = true;
        }
      },

      submitAgentpayBatch() {
        const condParams = {
          auth_token: this.authInfo.auth_token,
          batch_order: this.batchId,
        };

        Vue.axios.post(UrlConfig.SUBMIT_AGENTPAY_VERIFY_PATH, condParams)
          .then(() => {
            this.$message({
              showClose: true,
              message: '恭喜你，批量代付提交成功',
              type: 'success',
            });
           /* setTimeout(() => {
              this.$parent.$children[1].timingNotifiacation();
            }, 1000);*/
            this.$router.push('/home/batch-agentpay');
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      queryAgentpayDetail() {
        const condParams = {
          batchId: this.batchId,
          page: this.curPageIndex,
          page_size: this.pageSize,
        };

        this.tableLoading = true;
        Vue.axios.get(UrlConfig.AGENTPAY_CHECK_DETAIL_PATH, { params: condParams })
          .then((response) => {
            this.tableLoading = false;
            this.batchAgentpayData = response.data;
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
        this.queryAgentpayDetail();
      },

      handleCurrentChanged(val) {
        this.curPageIndex = val;
        this.queryAgentpayDetail();
      },

      editAgentpay(batchId) {
        router.push({ path: '/home/batch-agentpay-edit', query: { batchId } });
      },

      closeAuthCaptchaComp() {
        this.$refs["authCaptchaComp"].resetComp();
      },

      // 删除代付批次数据
      deleteBatchDetailHandle(params) {
        const condParams = {
          batch_detail_id: params.tradeId,
        };

        Vue.axios.delete(UrlConfig.DELETE_BATCH_AGENTPAY_DETAIL_PATH, { data: condParams })
          .then(() => {
            this.$message({
              showClose: true,
              message: '恭喜你，代付批次明细删除成功',
              type: 'success',
            });

            if (params.leftCount === 1) {
              this.$router.push('/home/batch-agentpay');
            } else {
              this.queryAgentpayDetail();
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
    },
  };
</script>

<style>

  .batch-upload-detail-title {
    /*margin-bottom: 20px;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .batch-upload-detail {
    margin-bottom: 20px;
  }

  .confirm_submit_btn {
    padding-left: 10px;
    padding-right: 15px;
  }

</style>
