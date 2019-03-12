<template>
  <div class="single-transfer">
    <div>
      <page-header-comp :title="pageMeta.title" style="margin-bottom: 10px;"></page-header-comp>
    </div>
    <el-card id="single-transfer-card" class="single-transfer-card">
      <div class="recharge-notice">
        <div>温馨提示：</div>
        <div>1. 该页面仅作为线下转账的信息提交，提交后请及时完成相应的线下转账。（为保证资金安全，请务必认真核对以下充值信息）</div>
        <div>2. 提交充值申请后，系统会定时核对充值信息，确认无误后，将为您的账户增加相应的金额。</div>
      </div>
      <div class="single-transfer-content">
        <el-form id="single-transfer-form" class="offline-recharge-form" ref="offlineRechargeFormModel" :model="formModel" :rules="rules" label-width="100px" onsubmit="return false;">
          <el-form-item label="开户行" prop="to_account">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="dataSource.openBankName"
              placeholder="开户行"
              :trigger-on-focus="false"
              disabled>
              <template slot-scope="scope">
                <div class="name">{{ scope.item }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="账户类型">
            <el-input v-model="dataSource.accountType" disabled></el-input>
          </el-form-item>
          <el-form-item label="户名">
            <el-input v-model="dataSource.accountName" disabled></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="subject">
            <el-input v-model="dataSource.cardno" @keydown.enter.native="submitBtnClicked" disabled></el-input>
          </el-form-item>
          <el-form-item label="充值金额" prop="amount">
            <el-tooltip placement="top">
              <div slot="content">
                <p style="font-size: 16px; margin: 10px 0;">温馨提示：</p>
                <p style="margin: 10px 0;">单次充值最低{{ limitMinAmount }}元, 最高{{ limitMaxAmount }}元</p>
                <p style="margin: 10px 0;">单日限额：{{ limitDayAmount }}元</p>
              </div>
              <el-input v-model="formModel.amount" placeholder="单位: 元" class="amount"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="备注">
            <div style="font-size: 13px;" v-if="feeRule !== 'quota' ">
              <span v-if="(formModel.amount * feeRate / 100).toFixed(2) <= feeMin">
                扣除手续费：<span style="color: #ff3366">{{ feeMin }} 元</span>（费率：{{ feeRate }}%，最低{{ feeMin }}元/笔）&nbsp;&nbsp;|&nbsp;&nbsp;
                 实际到账金额：<span style="color: #ff3366">{{ formModel.amount ? (formModel.amount - feeMin).toFixed(2) : 0.00 }} 元</span>
              </span>
              <span v-else-if="(formModel.amount * feeRate / 100).toFixed(2) >= feeMax">
                扣除手续费：<span style="color: #ff3366">{{ feeMax }} 元</span>（费率：{{ feeRate }}%，最低{{ feeMax }}元/笔）&nbsp;&nbsp;|&nbsp;&nbsp;
                 实际到账金额：<span style="color: #ff3366">{{ (formModel.amount - feeMax).toFixed(2) }} 元</span>
              </span>
              <span v-else>
                扣除手续费：<span style="color: #ff3366">{{ (formModel.amount * feeRate / 100).toFixed(2) }} 元</span>（费率：{{ feeRate }}%）&nbsp;&nbsp;|&nbsp;&nbsp;
                 实际到账金额：<span style="color: #ff3366">{{ (formModel.amount - formModel.amount * feeRate / 100).toFixed(2) }} 元</span>
              </span>
            </div>
            <div style="font-size: 13px;" v-else>扣除手续费：<span style="color: #ff3366">{{feeRate.toFixed(2) || 0.00 }} 元</span>（费率：{{ feeRate.toFixed(2) }}元/笔）&nbsp;&nbsp;|&nbsp;&nbsp;实际到账金额：
              <span style="color: #ff3366">{{ actualAmount < 0 ? 0.00 : actualAmount }} 元</span></div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formModel.acquireNote" placeholder="选填..." :maxlength="64"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="large" class="single_transfer_submit_btn" id="submitBtn" type="primary"
                       @click="submitBtnClicked">提 交</el-button>
            <el-button size="large" class="single_transfer_submit_btn" @click="cancel()" >取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

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
  import FlowControlConst from '@/utils/FlowControlConst';
  import verifyTradePwdComp from '@components/verify-trade-pwd';

  export default {
    name: 'offline-recharge-create',
    components: {
      pageHeaderComp,
      singleTransferComp,
      authCaptchaComp,
      verifyTradePwdComp,
    },
    data() {
      const validateAmount = (rule, value, callback) => {
        if (!/^\d+(\.\d+)?$/.test(value)) {
          callback(new Error('充值金额只能为数字'));
          return;
        }
        if (!/^\d+(?:\.\d{1,2})?$/.test(value)) {
          callback(new Error('充值金额最多有两位小数'));
          return;
        }
        if (value < this.limitMinAmount) {
          callback(new Error(`充值金额不能小于${this.limitMinAmount}元`));
          return;
        }
        if (value > this.limitMaxAmount) {
          callback(new Error(`充值金额不能大于${this.limitMaxAmount}元`));
          return;
        }
        callback();
      };
      return {
        authCaptchaDialogVisible: false,
        verifyTradePwdDialogVisible: false,
        limitMaxAmount: 0,
        limitMinAmount: 0,
        limitDayAmount: 0,
        title: 'fsdfsdfdsf',
        feeRate: 0,
        feeMin: 0,
        feeMax: 0,
        feeRule: '',
        dataSource: {
          openBankName: '',
          accountType: '',
          accountName: '',
          cardno: '',
        },
        formModel: {
          amount: '',
          acquireNote: '',
        },
        captchaAuthToken: '',
        rules: {
          amount: [
            { required: true, message: '请输入充值金额', trigger: 'blur' },
          ],
        },
      };
    },
    created() {
      this.loadCardInfo();
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
        userInfo: state => state.user.userInfo,
        authInfo: state => state.user.authInfo,
      }),
      defaultEmail() {
        return this.userInfo.defaultEmail;
      },
      actualAmount() {
        if (this.feeRule === 'quota') {
          if (this.formModel.amount === 0) {
            return 0.00;
          }
          return (this.formModel.amount - this.feeRate).toFixed(2);
        }
        if (this.formModel.amount === 0) {
          return 0.00;
        }
        return (this.formModel.amount - this.formModel.amount * this.feeRate / 100).toFixed(2);
      },
    },
    methods: {
      cancel() {
        this.$router.push('/home/offline-recharge-list');
      },
      amountValid(rule, value, callback) {
        if (!/^\d+(\.\d+)?$/.test(value)) {
          callback(new Error('充值金额只能为数字'));
          return;
        }
        if (!/^\d+(?:\.\d{1,2})?$/.test(value)) {
          callback(new Error('充值金额最多有两位小数'));
          return;
        }
        if (Number(value) === 0) {
          callback(new Error('充值金额不能等于0元'));
          return;
        }
        if (Number(value) < Number(this.limitMinAmount)) {
          callback(new Error(`充值金额不能小于${this.limitMinAmount}元`));
          return;
        }
        if (Number(value) > Number(this.limitMaxAmount)) {
          callback(new Error(`充值金额不能大于${this.limitMaxAmount}元`));
          return;
        }
        callback();
      },
      submitBtnClicked() {
        if (!this.dataSource.openBankName || !this.dataSource.accountType || !this.dataSource.accountName || !this.dataSource.cardno) {
          this.$message({
            showClose: true,
            message: '提交失败, 请刷新后重试',
            type: 'error',
          });
          return;
        }
        this.$refs['offlineRechargeFormModel'].validate((valid) => {
          if (valid) {
            if (this.feeRule === 'quota' && Number(this.actualAmount) <= 0) {
              this.$message({
                showClose: true,
                message: '扣除手续费后无到账金额，请重新输入',
                type: 'error',
              });
              return;
            }
            const params = {
              amount: this.formModel.amount,
              note: this.formModel.acquireNote,
            };
            Vue.axios.post(UrlConfig.OFFLINE_RECHARGE_AUTH, params)
              .then((response) => {
                this.captchaAuthToken = response.data.auth_token;
                this.$store.commit('SET_AUTH_INFO', response.data);
                if (response.data.auth_next_step === '') {
                  this.rechargeApply();
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
          }
        });
      },
      authCaptchaFinishEvent() {
        this.authCaptchaDialogVisible = false;
        this.rechargeApply();
      },
      loadCardInfo() {
        const conditions = { auth_token: this.authInfo.auth_token };
        Vue.axios.get(UrlConfig.OFFLINE_CARD_INFO, conditions)
          .then((response) => {
            this.dataSource.openBankName = response.data.bankName + ' ' + response.data.branchName;// 开户行
            this.dataSource.accountType = response.data.type === '1' ? '对私' : '对公';// 账户类型
            this.dataSource.accountName = response.data.cardName;// 户名
            this.dataSource.cardno = response.data.cardNo; // 银行账号
            this.limitMaxAmount = response.data.limitMaxAmount || 0;
            this.limitMinAmount = response.data.limitMinAmount || 0;
            this.limitDayAmount = response.data.limitDayAmount || 0;
            this.feeRate = response.data.feeRate || 0;
            this.feeRule = response.data.feeRule;
            this.feeMin = response.data.feeMin;
            this.feeMax = response.data.feeMax;
            this.rules.amount = [
              { required: true, message: '请输入充值金额', trigger: 'blur' },
              { validator: this.amountValid, trigger: 'blur' },
            ];
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
      rechargeApply() {
        const conditions = {
          auth_token: this.authInfo.auth_token,
        };
        Vue.axios.post(UrlConfig.OFFLINE_RECHARGE_CREATE, conditions)
          .then(() => {
            this.$message({
              showClose: true,
              message: '充值信息提交成功，请及时完成转账操作',
              type: 'success',
            });
            this.authCaptchaDialogVisible = false;
            this.$router.push('/home/offline-recharge-list');
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
  .recharge-notice {
    width: 90%;
    height: 90px;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #fff5e8;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .offline-recharge-form {
    width: 50%;
    min-width: 600px;
    max-width: 700px;
  }
</style>
