/**
 * Created by huangjason on 2017/9/15.
 */
// 代付交易明细
export default {
  create() {
    return {
      batchDate: '',     // 创建时间
      tradeNum: '',      // 流水号
      batchTradeNo: '',  // 交易号
      tradeAccountname: '', // 客户账户
      tradeAmount: '',      // 交易金额
      tradeAccounttype: '', // 帐户类型
      tradeCardname: '',    // 收/付款人
      tradeStatus: '',       // 状态
      tradeCustorder: '',     // 商户订单号
      tradeRemark: '',   // 备注
      tradeFeedbackcode: '',   // 交易状态
      showTradeReason: '',   // 反馈原因
      tradeDonedate: '',   // 完成时间
    };
  },
};
