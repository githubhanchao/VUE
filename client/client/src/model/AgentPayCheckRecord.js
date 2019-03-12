/**
 * Created by huangjason on 2017/9/15.
 */

// 代付审核记录
export default {
  create() {
    return {
      batchType: '',        // 类型
      batchDate: '',        // 创建时间
      batchTradeNo: '',     // 批次交易号
      batchCount: '',       // 总数
      batchAmount: '',      // 总金额
      batchStatus: '',      // 状态
      batchFee: '',         // 手续费
      batchFeetype: '',     // 结算方式
      batchAccamount: '',   // 实付金额
      batchRemark1: '',     // 备注
      batchFilename: '',    // 上传文件名
    };
  },
};
