/**
 * Created by huangjason on 2017/9/15.
 */
// 代付批量提交明细
export default {
  create() {
    return {
      tradeNum: '',             // 序号
      tradeCardnum: '',         // 银行账号
      tradeCardname: '',        // 开户名
      tradeAccountname: '',     // 开户行
      tradeBranchbank: '',      // 分行
      tradeSubbranchbank: '',   // 支行
      tradeAccounttype: '',       // 公/私
      tradeAmount: '',      // 金额
      tradeAmounttype: '',        // 币种
      tradeProvince: '',        // 省
      tradeCity: '',        // 省
      tradeMobile: '',        // 手机号
      certificateType: '',      // 证件类型
      certificateNum: '',       // 证件号
      contractUsercode: '',     // 用户协议号
      tradeCustorder: '',       // 商户订单号
      tradeRemark: '',          // 备注
      errMsg: '',               // 检验结果
    };
  },
};
