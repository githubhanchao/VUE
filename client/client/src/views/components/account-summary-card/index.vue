
<template>
  <el-card id="account-summary-card" class="account-summary-card">
    <div class="account-summary-card-content">
      <i :class="iconFont" :style="'color:'+iconColor" class="iconfontStyle"></i>
      <div class="account-summary-content">
        <span class="account-summary-money">{{ money }}</span>
        <div class="account-summary-subtitle">
          <el-tooltip placement="top">
            <div slot="content">
              <p v-if="useableMoney" style="font-size: 16px; margin: 10px 0;">可用金额说明</p>
              <p v-if="useableMoney" style="margin: 10px 0;">可用金额 = 账户总额－冻结金额－待结算金额</p>
              <p v-if="balanceMoney" style="margin: 10px 0;">待结算金额包含了T+1结算金额：{{ oldSettleBal }}元、在途资金：{{ frozenBalance }}元</p>
              <!--<p style="margin: 10px 0;">该账户反映转账、代付、充值等交易的可用金额</p>-->
            </div>
            <i :class="{ 'el-icon-question': iconIsHidden }" style="color: #777;"></i>
            <i :class="{ 'el-icon-question': iconIsHidden }" style="color: #777; margin-top: 2px;"></i>
          </el-tooltip>
          <span class="account-summary-title">{{ title }}</span>
        </div>
        <div class="account-summary-subtitle">
          <el-button size="mini" type="success" v-show="showWithdrawBtn" @click="withdrawClick">提现</el-button>
          <el-button size="mini" type="primary" v-show="showTransferBtn" v-permission="'single-transfer'" @click="transferClick">转账</el-button>
          <el-button size="mini" type="danger" v-show="showRechangeBtn" @click="rechangeClick">充值</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>

  import StringUtil from "@/utils/StringUtil";
  import moment from 'moment';
  import Vue from 'vue';

  export default {
    name: 'account-summary-card',
    props: {
      iconFont: {
        type: String,
        required: true,
      },
      iconColor: {
        type: String,
        required: true,
      },
      iconIsHidden: {
        type: Boolean,
        default: false,
      },
      useableMoney: {
        type: Boolean,
        default: false,
      },
      balanceMoney: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        required: true,
      },
      money: {
        type: String,
        required: true,
        default: '0.00',
      },
      showWithdrawBtn: {
        type: Boolean,
        default: false,
      },
      showTransferBtn: {
        type: Boolean,
        default: false,
      },
      showRechangeBtn: {
        type: Boolean,
        default: false,
      },
      frozenBalance: {
        type: String,
        default: '0.00',
      },
      oldSettleBal: {
        type: String,
        default: '0.00',
      },
    },
    data() {
      return {

      };
    },
    computed: {

    },
    created: function () {

    },
    methods: {
      withdrawClick() {
        this.$emit('withdrawClickEmit');
      },
      transferClick() {
        this.$emit('transferClickEmit');
      },
      rechangeClick() {
        this.$emit('rechangeClickEmit');
      },
    },
  };
</script>

<style>

  .account-summary-card {
    background-color: white;
    margin-right: 20px;
  }

  .account-summary-card-content {
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }

  .account-summary-card div.el-card__body {
    padding: 0px;
  }

  .account-summary-card .iconfontStyle {
    font-size: 34px;
  }
  .totleCount i.iconfontStyle {
    font-size: 32px !important;
  }
  .account-summary-content {
    display: flex;
    flex-direction: column;
  }

  .account-summary-money {
    font-size: 24px;
    text-align: right;
    padding: 5px 0px 5px 0px;
  }
  .account-summary-money:before {
    content: '￥';
    font-size: 16px;
  }
  .account-summary-subtitle {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .account-summary-title {
    font-size: 13px;
    text-align: right;
    padding: 5px 0px 5px 0px;
    color: #777777;
  }

  .account-summary-subtitle button.el-button--large {
    padding: 0px 0px 0px 10px;
  }
  .account-summary-card .el-button--mini {
    padding: 4px 8px;
  }
  body .el-tooltip__popper.is-dark {
    background: #fff;
    color: #2d2f33;
    border: 1px solid #e6ebf5;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.168627450980392);
  }
  .el-tooltip__popper .popper__arrow {
    display: none;
  }
</style>
