/**
 * Created by huangjason on 2017/9/15.
 */

export default {
  create() {
    return {
      customerNo: '',           // 商户号
      apiKey: '',               // 安全校验码

      businessLicenseCode: '',  // 营业执照编码
      organizationCode: '',     // 组织机构代码
      taxRegistrationNo: '',    // 企业税号
      registrationDate: '',     // 执照登记时间
      licenseExpires: '',       // 执照有效期
      businessScope: '',        // 经营范围
      registeredFunds: '',      // 注册资金（万）
      registeredPlace: '',      // 注册地

      legal: '',                // 法人
      numberOfStaff: '',        // 公司人数
      officeLocation: '',       // 办公地址
      companyPhone: '',         // 公司电话
      zipCode: '',              // 邮编
      bizMan: '',               // 联系人
      bizPhone: '',             // 联系人电话
      bizMPhone: '',            // 联系人手机
    };
  },
};
