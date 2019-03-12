/**
 * Created by huangjason on 2017/9/15.
 */

// 代付审核明细
export default {
  create() {
    return {
      tradeSubdate: '',     // 创建时间
      tradeNum: '',         // 流水号
      tradeNo: '',     // 交易号
      cunstomerAccount: '', // 客户账户
      tradeAmount: '',      // 交易金额
      tradeAccounttype: '', // 帐户类型
      tradeCardname: '',    // 收/付款人
      certificateType: '',  // 证件类型
      certificateNum: '',   // 证件号
      tradeMobile: '',      // 手机号
      batchStatus: '',      // 状态
      tradeCustorder: '',   // 商户订单号
      tradeRemark: '',      // 备注
      tradeFeedbackcode: '',  // 交易状态
      showTradeReason: '',  // 反馈原因
      tradeDonedate: '',  // 完成时间
    };
  },
};
