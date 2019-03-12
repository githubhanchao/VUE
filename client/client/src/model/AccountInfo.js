/**
 * Created by huangjason on 2017/9/15.
 */

export default {
  create() {
    return {
      accountNo: '',     // 账户号
      accountName: '',     // 账户名称
      balanceOfDirection: '',     // 借贷类型, debit - 借记账户， credit - 贷记账户
      accountType: '',     // 账户类型 main - 主账户, freeze - 冻结账户
      balance: '',     // 余额
      currency: '',     // 币种
      status: 'norm',     // 账户状态: norm - 正常， freeze - 冻结 , closed - 关闭
      parentId: '',       // 主账户id
      dateCreated: '',    // 创建时间
      lastUpdated: '',    // 更新时间
    };
  },
};
