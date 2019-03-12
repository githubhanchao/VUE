<template>
  <div class="single-transfer">
    <div class="single-transfer-header-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <single-transfer-comp @submitBtnClickedEmit="singleTransferApply"
                          :accountLists="recentAccountLists"
                          @accountSearchEmit="searchAccountInfo"
                          :dataSource="toAccountInfo"></single-transfer-comp>
    <el-dialog :visible.sync="authCaptchaDialogVisible" v-if="authCaptchaDialogVisible" :close-on-click-modal="false">
      <auth-captcha-comp class="authCaptchaComp" :auth_token="captchaAuthToken"
                         :accountNo="defaultEmail"
                         @authCaptchaFinishEmit="authCaptchaFinishEvent">
      </auth-captcha-comp>
    </el-dialog>
    <el-dialog :visible.sync="verifyTradePwdDialogVisible" v-if="verifyTradePwdDialogVisible" class="authCapth" :close-on-click-modal="false">
      <verify-trade-pwd-comp @authTradePwdFinishEmit="authTradePwdFinish"></verify-trade-pwd-comp>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import pageHeaderComp from '@components/page-header';
  import singleTransferComp from '@components/single-transfer';
  import authCaptchaComp from '@components/auth-captcha';
  import UrlConfig from '@/utils/UrlConfig';
  import ResponeUtil from '@/utils/ResponeUtil';
  import FlowControlConst from '@/utils/FlowControlConst';
  import verifyTradePwdComp from '@components/verify-trade-pwd';

  export default {
    name: 'single-transfer',
    components: {
      pageHeaderComp,
      singleTransferComp,
      authCaptchaComp,
      verifyTradePwdComp,
    },
    data() {
      return {
        authCaptchaDialogVisible: false,
        verifyTradePwdDialogVisible: false,
        transferApplyCond: {},
        toAccountInfo: {
          name: '',
          company: '',
        },
        captchaAuthToken: '',
        recentAccountLists: [],
      };
    },
    created() {
      this.loadCardInfo();
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
        this.transferApply(this.transferApplyCond);
      },
      searchAccountInfo(params) {
        let conditions = {
          user_name: params,
          auth_token: this.authInfo.auth_token,
        };
        Vue.axios.get(UrlConfig.ACCOUNT_SIMPLE_SUMMARY_INFO, { params: conditions })
          .then((response) => {
            this.toAccountInfo = response.data;
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
      loadCardInfo() {
        let conditions = { auth_token: this.authInfo.auth_token };
        Vue.axios.get(UrlConfig.ACCOUNT_RECENT_TRANSFER_LIST, conditions)
          .then((response) => {
            this.recentAccountLists = response.data;
          })
          .catch((error) => {
            this.recentAccountLists = {
              name: '',
              company: '',
            };
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
      singleTransferApply(data) {
        this.transferApplyCond = data;
        const authCaptchaParams = { auth_token: this.authInfo.auth_token };
        Vue.axios.post(UrlConfig.TANSFER_TRADE_AUTH, authCaptchaParams)
          .then((response) => {
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);
            if (response.data.auth_next_step === '') {
              this.transferApply(this.transferApplyCond);
            }
            if (response.data.auth_next_step === FlowControlConst.CHECK_TRADE_PWD) {
              this.verifyTradePwdDialogVisible = true;
            }

            if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.authCaptchaDialogVisible = true;
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
          this.transferApply(this.transferApplyCond);
        }

        if (data.auth_next_step === FlowControlConst.CAPTCHA) {
          this.authCaptchaDialogVisible = true;
        }
      },
      transferApply(params) {
        const conditions = {
          to_account: params.to_account,
          amount: params.amount,
          subject: params.subject,
          comment: params.comment,
          auth_token: this.authInfo.auth_token,
        };
        Vue.axios.post(UrlConfig.TRANSFER_TRADE, conditions)
          .then((response) => {
            this.$message({
              showClose: true,
              message: '单笔转账提交成功',
              type: 'success',
            });
            this.authCaptchaDialogVisible = false;
            this.$router.push('/home/transfer-trade');
          })
          .catch((error) => {
            this.authCaptchaDialogVisible = false;
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
  .single-transfer-header-title {
    margin-bottom: 20px;
  }
</style>
