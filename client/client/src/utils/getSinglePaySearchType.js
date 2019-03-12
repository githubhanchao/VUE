const CARDNAME = 'cardName';     // 客户名称
const BANK = 'bank';     // 开户行
const BRANCHBANK = 'branchBank';     // 开户行分行
const SUBBRANCHBANK = 'subbranchBank';     // 开户行支行
const PROVINCE = 'province';     // 开户行所在省
const CITY = 'city';     // 开户行所在市

function allSinglePaySearchType() {
  return [
    {
      code: CARDNAME,
      name: '客户姓名',
    },
    {
      code: BANK,
      name: '开户行',
    },
    {
      code: BRANCHBANK,
      name: '开户行分行',
    },
    {
      code: SUBBRANCHBANK,
      name: '开户行支行',
    },
    {
      code: PROVINCE,
      name: '开户行所在省',
    },
    {
      code: CITY,
      name: '开户行所在市',
    },
  ];
};

module.exports = {
  allSinglePaySearchType,
};
