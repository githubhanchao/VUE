const IdCard = '0';  // 身份证
const household = '1';  // 户口簿
const passport = '2';  // 护照
const officerCard = '3';  // 军官证
const soldierCard = '4';  // 士兵证
const MTP = '5';  // 台胞证

function allCertificateTypes() {
  return [
    {
      code: IdCard,
      name: '身份证',
    },
    {
      code: household,
      name: '户口簿',
    },
    {
      code: passport,
      name: '护照',
    },
    {
      code: officerCard,
      name: '军官证',
    },
    {
      code: soldierCard,
      name: '士兵证',
    },
    {
      code: MTP,
      name: '台胞证',
    },
  ]
}

module.exports = {
  IdCard,
  household,
  passport,
  officerCard,
  soldierCard,
  MTP,
  allCertificateTypes,
};
