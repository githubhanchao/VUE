<template>
  <div class="single-pay">
    <div class="single-pay-header-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <single-pay-comp @collectionEmit="collectionHandle" :bankName="bankNameList" :dataSource="formInfo"
                     :province="province" :city="city" @provinceChange="provinceChange"
                     :accountLists="recentAccountList" @accountSearchEmit="accountListEmitHandle"
                     @saveBatchInfoEmit="saveBatchInfoEmitHandle" :batchVisible="batchVisibleControl"
                     @choseEmit="choseHandle" ref="singlePay"></single-pay-comp>
    <el-dialog :visible.sync="singlePayConfirmDialogVisible" v-if="singlePayConfirmDialogVisible">
      <single-pay-confirm-comp :formInfo="formInfo" @backEmit="backHandle" @submitEmit="submitHandle"></single-pay-confirm-comp>
    </el-dialog>
    <el-dialog :visible.sync="authCaptchaDialogVisible" v-if="authCaptchaDialogVisible" class="authCapth" :close-on-click-modal="false">
      <auth-captcha-comp class="authCaptchaComp" :auth_token="captchaAuthToken"
                         :accountNo="defaultEmail"
                         @authCaptchaFinishEmit="authCaptchaFinishEvent">
      </auth-captcha-comp>
    </el-dialog>
    <el-dialog :visible.sync="singlePayAccountListDialogVisible" v-if="singlePayAccountListDialogVisible" class="account-list">
      <single-pay-account-list-comp :accountList="accountLists" :count="totleCount" :loading="loading"
                                    @selectEmit="selectEmitHandle" :bankName="bankNameList"
                                    @deleteAccouuntEmit="deleteAccouuntEmit"
                                    @accountListEmit="accountListEmitHandle"></single-pay-account-list-comp>
    </el-dialog>
    <el-dialog :visible.sync="verifyTradePwdDialogVisible" v-if="verifyTradePwdDialogVisible" class="authCapth" :close-on-click-modal="false">
      <verify-trade-pwd-comp @authTradePwdFinishEmit="authTradePwdFinish"></verify-trade-pwd-comp>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState, mapActions } from 'vuex';
  import pageHeaderComp from '@components/page-header';
  import authCaptchaComp from '@components/auth-captcha';
  import singlePayComp from '@components/single-pay';
  import singlePayConfirmComp from '@components/single-pay-confirm';
  import singlePayAccountListComp from '@components/single-pay-account-lists';
  import verifyTradePwdComp from '@components/verify-trade-pwd';
  import UrlConfig from '@/utils/UrlConfig';
  import BankName from '@/utils/getBankName';
  import ResponeUtil from '@/utils/ResponeUtil';
  import SinglePaySearchType from '@/utils/getSinglePaySearchType';
  import FlowControlConst from '@/utils/FlowControlConst';
  import ActionTypeName from  '@/utils/ActionTypeName';

  export default {
    name: 'single-pay',
    components: {
      pageHeaderComp,
      singlePayComp,
      authCaptchaComp,
      singlePayConfirmComp,
      singlePayAccountListComp,
      verifyTradePwdComp,
    },
    data() {
      return {
        formInfo: {},
        singlePayConfirmDialogVisible: false,
        authCaptchaDialogVisible: false,
        singlePayAccountListDialogVisible: false,
        captchaAuthToken: '',
        accountLists: [
          {},
        ],
        province: [],
        city: [],
        loading: false,
        batchVisibleControl: true,
        recentAccountList: [],
        totleCount: 0,
        bankNameList: [],
        searchTypes: SinglePaySearchType.allSinglePaySearchType(),
        verifyTradePwdDialogVisible: false,
      };
    },
    watch: {
      "$route": function (to, from) {
        if (from.path === '/home/batch-agentpay-edit') {
          this.batchVisibleControl = true;
        }
      },
    },
    created() {
      if (this.$route.query && this.$route.query.batchId
        && this.$route.query.batchId !== '[object Object]') {
        this.batchVisibleControl = false;
        this.formInfo.card_name = this.$route.query.batchId.trade_cardname;
        this.formInfo.card_no = this.$route.query.batchId.trade_cardnum;
        this.formInfo.card_bank_name = this.$route.query.batchId.trade_accountname;
        this.formInfo.bank_branch = this.$route.query.batchId.trade_branchbank;
        this.formInfo.bank_sub_branch = this.$route.query.batchId.trade_subbranchbank;
        this.formInfo.account_type = this.$route.query.batchId.trade_accounttype;
        this.formInfo.bank_province = this.$route.query.batchId.trade_province;
        this.formInfo.bank_city = this.$route.query.batchId.trade_city;
        this.formInfo.comment = this.$route.query.batchId.trade_amounttype;
        this.formInfo.amount = this.$route.query.batchId.trade_amount;
        this.formInfo.order_no = this.$route.query.batchId.trade_custorder;
        this.formInfo.mobile_phone_no = this.$route.query.batchId.trade_mobile;
        this.formInfo.certificate_type = this.$route.query.batchId.certificate_type;
        this.formInfo.certificate_no = this.$route.query.batchId.certificate_num;
        this.formInfo.remark = this.$route.query.batchId.trade_remark;
      }
      Vue.axios.get(UrlConfig.BANK_LIST_PATH)
        .then((response) => {
          this.bankNameList = response.data;
        })
        .catch(() => {
          this.bankNameList = BankName.queryBanks();
        });
      Vue.axios.get(UrlConfig.PROVINCE_LIST_PATH)
        .then((response) => {
          this.province = response.data;
        })
        .catch((error) => {
          console.log(error.respMessage);
        });
      const params = {
        page: 1,
        page_size: 20,
      };
      this.accountListEmitHandle(params);
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
      ...mapActions([ActionTypeName.AUTH_CHECK_TRADE_PWD_PATH]),

      provinceChange(value) {
        this.city = [];
        const params = {
          province: value,
        };
        Vue.axios.get(UrlConfig.CITY_LIST_PATH, { params })
          .then((response) => {
            this.city = response.data;
          })
          .catch((error) => {
            console.log(error.respMessage);
          });
      },
      collectionHandle(formModel) {
        this.formInfo = formModel;
        this.singlePayConfirmDialogVisible = true;
      },
      backHandle() {
        this.singlePayConfirmDialogVisible = false;
      },
      authCaptchaFinishEvent(finishRes) {
        this.authCaptchaDialogVisible = false;
        this.singlePay(finishRes.auth_token);
      },

      // 支付密码校验
      authTradePwdFinish(data) {
        console.log(data);
        this.verifyTradePwdDialogVisible = false;
        this.captchaAuthToken = data.auth_token;
        if (data.auth_next_step === '') {
          this.singlePay(data.auth_token);
        }

        if (data.auth_next_step === FlowControlConst.CAPTCHA) {
          this.authCaptchaDialogVisible = true;
        }
      },

      saveBatchInfoEmitHandle(val) {
        this.formInfo = {};
        this.formInfo.trade_cardname = val.card_name;
        this.formInfo.trade_cardnum = val.card_no;
        this.formInfo.trade_accountname = val.card_bank_name;
        this.formInfo.trade_branchbank = val.bank_branch;
        this.formInfo.trade_subbranchbank = val.bank_sub_branch;
        this.formInfo.trade_accounttype = val.account_type;
        this.formInfo.trade_province = val.bank_province;
        this.formInfo.trade_city = val.bank_city;
        this.formInfo.trade_amounttype = val.comment;
        this.formInfo.trade_amount = val.amount;
        this.formInfo.trade_custorder = val.order_no;
        this.formInfo.trade_mobile = val.mobile_phone_no;
        this.formInfo.certificate_type = val.certificate_type;
        this.formInfo.certificate_num = val.certificate_no;
        this.formInfo.trade_remark = val.remark;
        this.formInfo.batchId = this.$route.query.batchId.batchId;
        this.formInfo.trade_id = this.$route.query.batchId.trade_id;
        this.formInfo.trade_num = this.$route.query.batchId.trade_num;
        Vue.axios.put(UrlConfig.AGENTPAY_BATCH_DETAIL_PATH, this.formInfo)
          .then((response) => {
            this.$message({
              showClose: true,
              message: '编辑成功，已保存',
              type: 'success',
            });
            this.$refs["singlePay"].formModel = {};
            const params = {
              batchId: this.$route.query.batchId.batchId,
              batchFilename: this.$route.query.batchId.batchFilename,
            };
            this.$router.push({ path: '/home/batch-upload-detail', query: params });
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
      choseHandle() {
        const params = {
          page: 1,
          page_size: 20,
        };
        this.singlePayAccountListDialogVisible = true;
        this.accountListEmitHandle(params);
      },
      deleteAccouuntEmit(index) {
        const record = this.accountLists[index];
        const condParams = {
          biz_customer_id: record.id,
        };

        Vue.axios.delete(UrlConfig.SINGLE_PAY_ACCOUNT_LIST_DELETE_PATH, { data: condParams })
          .then((response) => {
            if (response) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
            }
            const params = {
              page: 1,
              page_size: 20,
            };
            this.accountListEmitHandle(params);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      submitHandle() {
        Vue.axios.post(UrlConfig.SINGLE_PAY_AUTH_PATH)
          .then((response) => {
            this.$store.commit('SET_AUTH_INFO', response.data);
            this.singlePayConfirmDialogVisible = false;

            if (response.data.auth_next_step === '') {
              this.singlePay(response.data.auth_token);
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
      singlePay(authToken) {
        const params = JSON.parse(JSON.stringify(this.formInfo));
        params.auth_token = authToken || this.authInfo.auth_token;
        params.card_no = params.card_no.replace(/\s/g, '');
        Vue.axios.post(UrlConfig.SINGLE_PAY_PATH, params)
          .then((response) => {
            this.$message({
              showClose: true,
              message: '单笔代付提交成功',
              type: 'success',
            });
            this.$refs["singlePay"].formModel = {};
            this.$refs["singlePay"].resetForm();
            this.$refs["singlePay"].formModel.amount = '';
            this.$refs["singlePay"].formModel.order_no = '';
          })
          .catch((error) => {
            this.authCaptchaDialogVisible = false;
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
      selectEmitHandle(params) {
        if(/\S{5}/.test(params.card_no)) {
          params.card_no = params.card_no.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
        }
        this.$refs["singlePay"].formModel = params;

        this.singlePayAccountListDialogVisible = false;
      },
      accountListEmitHandle(data) {
        this.loading = true;
//        data.bizId = this.userInfo.cmCustomer.customerNo;
        const type = this.searchTypes.find((item) => { if(item.code === data.bizType) return item; });
        if (type && type.code) {
          data[type.code] = data.resultSearch;
        }
//        if (data.bizType === 'bank' && data.resultSearch) {
//          data[type.code] = data.resultSearch;
//        }
        Vue.axios.get(UrlConfig.SINGLE_PAY_ACCOUNT_LIST_PATH, { params: data })
          .then((response) => {
            this.loading = false;
            this.accountLists = response.data.list;
            this.totleCount = response.data.count;
            this.recentAccountList = response.data.list;
          })
          .catch((error) => {
            this.loading = false;
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
  .single-pay-header-title {
    margin-bottom: 20px;
  }
  .single-pay .el-dialog {
    width: 800px;
  }
  .single-pay .account-list .el-dialog {
    width: 90%;
    max-width: 1100px;
  }
  .single-pay .account-list .el-dialog .el-dialog__header {
    padding-top: 0;
  }
  div.authCapth .el-dialog {
    width: 400px;
  }
</style>
