const alphabetAndNoReg = new RegExp('^[A-Za-z0-9]+$');
const validateName = (rule, value, callback) => {
  if (value.length > 30) {
    callback(new Error('企业全称不能超过30个字'));
    return;
  }
  callback();
};
const validateSocialCreditCode = (rule, value, callback) => {
  if (value && value.length < 18 && !alphabetAndNoReg.test(value)) {
    callback(new Error('请输入正确的信用代码'));
    return;
  }
  callback();
};
const validateArtificialPersonCardNo = (rule, value, callback) => {
  if (!/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(value)) {
    callback(new Error('请输入正确的身份证号'));
    return;
  }
  callback();
};
const validateAccountPermissionCardNo = (rule, value, callback) => {
  if (!alphabetAndNoReg.test(value)) {
    callback(new Error('请输入正确的开户许可证号'));
    return;
  }
  callback();
};

const customerInfoFormRules =  {
  registrationName: [
    { required: true, message: '请输入企业全称', trigger: 'blur' },
    { validator: validateName, trigger: 'blur' },
  ],
  socialCreditCode: [
    { required: true, message: '请输入信用代码', trigger: 'blur' },
    { validator: validateSocialCreditCode, trigger: 'blur' },
  ],
  licenseExpires: [
    { required: true, message: '请选择营业执照期限', trigger: 'blur' },
  ],
  businessScope: [
    { required: true, message: '请输入经营范围', trigger: 'blur' },
  ],
  corporate: [
    { required: true, message: '请输入法人姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '法人姓名长度在 2 到 10 个字符', trigger: 'blur' },
  ],
  credentialNo: [
    { required: true, message: '请输入法人身份证号', trigger: 'blur' },
    { validator: validateArtificialPersonCardNo, trigger: 'blur' },
  ],
  openningPermitCode: [
    { required: true, message: '请输入开户许可证号', trigger: 'blur' },
    { validator: validateAccountPermissionCardNo, trigger: 'blur' },
  ],
};

module.exports = {
  customerInfoFormRules,
}
