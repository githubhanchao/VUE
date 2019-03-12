/**
 * Created by huangjason on 2017/9/15.
 */
// 代付批量提交记录
export default {
  create() {
    return {
      batchTradeNo: '',     // 批次交易号
      batchDate: '',        // 创建日期
      batchFilename: '',    // 上传文件名
      batchCount: '',       // 笔数
      batchAmount: '',      // 金额
      batchType: '',        // 交易类型
    };
  },
};
