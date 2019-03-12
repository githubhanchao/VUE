const PERSONAL = '0';  // 个人
const BUSINESS = '1';  // 企业

function allAccountType() {
  return [
    {
      code: PERSONAL,
      name: '个人',
    },
    {
      code: BUSINESS,
      name: '企业',
    },
  ];
};

module.exports = {
  allAccountType,
};
