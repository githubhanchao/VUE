<template>
  <div class="overview">
    <div class="overview-title">
      <page-header-comp :title="pageMeta.title" :titleTip="welcomeTxt"
                        @showNoticeEmit="showNoticeHandle" :notice="noticeContent"></page-header-comp>
      <div>
        <!--<el-button size="large" class="overview-title_btn" >提现</el-button>-->
        <!--<el-button size="large" class="overview-title_btn"-->
                   <!--v-permission="'transfer-trade'"-->
                   <!--@click="gotoTransfer">转账</el-button>-->
      </div>
    </div>
    <el-row class="overview-content">
      <el-col class="overview-account-cards" :lg="6" :md="6" :sm="14" :xs="18">
        <account-summary-card-comp iconFont="el-icon-my-toubiaojine" title="账户总额"  iconColor="#429DFF"
                                   class="totleCount"
                                   :money="totalBal"></account-summary-card-comp>
        <account-summary-card-comp iconFont="el-icon-my-jinejinchu" title="可用金额" iconColor="#67C23A"
                                   @transferClickEmit="gotoTransfer"
                                   :useableMoney="true" :iconIsHidden="true"
                                   :showWithdrawBtn="false" :showTransferBtn="true" :showRechangeBtn="false"
                                   :money="balance"></account-summary-card-comp>
        <account-summary-card-comp iconFont="el-icon-my-jinelishi" title="待结算金额" iconColor="#F49415"
                                   :balanceMoney="true" :iconIsHidden="true" :frozenBalance="frozenBalance"
                                   :oldSettleBal="oldSettleBal"
                                   :money="toSettle"></account-summary-card-comp>
        <account-summary-card-comp iconFont="el-icon-my-jinyongjine" title="冻结金额" iconColor="#8585AD"
                                   class="frozen"
                                   :money="freezBal"></account-summary-card-comp>
        <account-summary-card-comp iconFont="el-icon-my-toubiaofee" title="手续费账户" iconColor="#FB6D9C"
                                   class="fee"
                                   :showRechangeBtn="false"
                                   :money="feeAmount"></account-summary-card-comp>
      </el-col>
      <el-col :lg="18" :md="18" :sm="22" :xs="22">
        <overview-chart-comp></overview-chart-comp>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';
  import { mapState, mapActions } from 'vuex';
  import store from '@/vuex/store';
  import pageHeaderComp from '@components/page-header';
  import overviewChartComp from '@components/overview-chart';
  import accountSummaryCardComp from '@components/account-summary-card';
  import ActionTypeName from '@/utils/ActionTypeName';
  import moment from 'moment';
  import router from '@/router';
  import GuideStatusUtil from '@/utils/GuideStatusUtil';

  export default {
    name: 'overview',
    components: {
      pageHeaderComp,
      accountSummaryCardComp,
      overviewChartComp,
    },
    data() {
      return {
        totalBal: '--',
        balance: '--',
        freezBal: '--',
        toSettle: '--',
        feeAmount: '--',
        noticeContent: '',
        oldSettleBal: '0.00',
        frozenBalance: '0.00',
      };
    },
    created: function () {
      this.loadBalance();
      this.loadNoticeList();
      this.$store.dispatch(ActionTypeName.LOAD_SECURITY_LIST)
        .then((res) => {
          if (!res.data[3].status) {
            if (!GuideStatusUtil.getGuideStatus()) {
              this.$router.push('/home/security-center');
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    beforeRouteEnter(to, from, next) {
      next(() => {
      });
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
        userInfo: state => state.user.userInfo,
        lastLoginTime: state => state.user.lastLoginTime,
      }),

      welcomeTxt() {
        let lastLoginTime = '';
        if (this.lastLoginTime) {
          lastLoginTime = moment(this.lastLoginTime).format('YYYY-MM-DD HH:mm:ss');
        }

        return this.pageMeta.desc + lastLoginTime;
      },

    },
    methods: {
      loadBalance() {
        store.dispatch(ActionTypeName.LOAD_ACCOUNT_BALANCE)
          .then((response) => {
            console.log(response);
            this.totalBal = response.data.totalBal.toString();
            this.balance = response.data.balance.toString();
            this.freezBal = response.data.freezBal.toString();
            this.toSettle = response.data.settleBal.toString();
            this.feeAmount = response.data.feeBal.toString();
            this.oldSettleBal = response.data.oldSettleBal.toString();
            this.frozenBalance = response.data.frozenBalance.toString();
          })
          .catch((error) => {
            Vue.prototype.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      loadNoticeList() {
        Vue.axios.get(UrlConfig.NOTICE_LIST_PATH)
          .then((response) => {
            this.noticeData = response.data.list;
            const count = this.noticeData.length;
            if (count > 0) {
              const days = moment(Date.now()).diff(moment(this.noticeData[0].date_created), 'days');
              if (days > 14) {
                return;
              }

              if (count > 25) {
                this.noticeContent = this.noticeData[0].content.substring(0, 25) + '...';
              } else {
                this.noticeContent = this.noticeData[0].content;
              }
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

      gotoTransfer() {
        router.push('/home/single-transfer');
      },

      showNoticeHandle() {
        router.push('/home/notice');
      },
    },
  };
</script>

<style>
  .overview-title {
    /*margin-bottom: 20px;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .overview-account-cards {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .overview-title_btn {
    padding-left: 40px;
    padding-right: 40px;
  }
  .overview .el-card {
    border-radius: 0;
  }
  .totleCount.el-card {
    border-radius: 4px 4px 0 0 ;
  }
  .frozen.el-card {
    border-radius: 0 0 4px 4px;
  }
  .fee {
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
  }
  .overview-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgba(240,242,248,1);
    z-index: 9;
  }
  .overview-title .page-header-title .description {
    position: absolute;
  }
  @media screen and (min-width: 992px) {
    .overview-content .el-col-lg-6 {
      width: 24.5%;
    }
  }
</style>
