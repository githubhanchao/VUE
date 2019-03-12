const ZGGS_BANK = 'ICBC'; // 中国工商银行
const ZGNY_BANK = 'ABC'; // 中国农业银行
const ZG_BANK = 'BOC'; // 中国银行 
const ZGJS_BANK = 'CCB'; // 中国建设银行
const JT_BANK = 'BOCM'; // 交通银行
const ZX_BANK = 'CITIC'; // 中信银行
const ZGGD_BANK = 'CEB'; // 中国光大银行
const HX_BANK = 'HXB'; // 华夏银行
const ZGMS_BANK = 'CMBC'; // 中国民生银行
const GF_BANK = 'CGB'; // 广发银行
const PA_BANK = 'PAYH'; // 平安银行
const ZS_BANK = 'CMB'; // 招商银行
const XY_BANK = 'CIB'; // 兴业银行
const PF_BANK = 'SPDB'; // 浦发银行
const BJ_BANK = 'BCCB'; // 北京银行
const CITY_BANK = 'CITYBANK'; // 城市商业银行
const GZS_BANK = 'GZCB'; // 广州市商业银行
const HK_BANK = 'HKBCHINA'; // 汉口银行
const HZ_BANK = 'HCCB'; // 杭州银行
const JC_BANK = 'SXJS'; // 晋城市商业银行
const NJ_BANK = 'NJCB'; // 南京银行
const NB_BANK = 'NBCB'; // 宁波银行
const SH_BANK = 'SHBANK'; // 上海银行
const WZ_BANK = 'WZCB'; // 温州市商业银行
const CS_BANK = 'CSCB'; // 长沙银行
const ZJC_BANK = 'CZCB'; // 浙江稠州商业银行
const GZN_BANK = 'GNXS'; // 广州市农信社
const NCS_BANK = 'RCB'; // 农村商业银行
const SD_BANK = 'SDE'; // 顺德农信社
const HF_BANK = 'EGBANK'; // 恒丰银行
const ZJS_BANK = 'CZB'; // 浙商银行
const NCH_BANK = 'URCB'; // 农村合作银行
const BH_BANK = 'CBHB'; // 渤海银行
const HS_BANK = 'HSBANK'; // 徽商银行
const CZ_BANK = 'COUNTYBANK'; // 村镇银行
const CQS_BANK = 'CCQTGB'; // 重庆三峡银行
const SHN_BANK = 'SRCB'; // 上海农村商业银行
const CSX_BANK = 'UCC'; // 城市信用合作社
const BJN_BANK = 'BJRCB'; // 北京农商行
const HNN_BANK = 'HNNXS'; // 湖南农信社
const NCX_BANK = 'RCC'; // 农村信用合作社
const SZN_BANK = 'SNXS'; // 深圳农村商业银行
const SZF_BANK = 'SDB'; // 深圳发展银行
const ZD_BANK = 'SCB'; // 渣打银行
const JY_BANK = 'CYB'; // 集友银行
const DY_BANK = 'HKBEA'; // 东亚银行
const ZGY_BANK = 'PSBC'; // 中国邮政储蓄银行
const ZHN_BANK = 'ZHNX'; // 珠海市农村信用合作社
const YDX_BANK = 'YDXH'; // 尧都信用合作联社


function queryBanks() {
  const banks = [
    {
      code: '中国工商银行',
      name: '中国工商银行',
    },
    {
      code: '中国农业银行',
      name: '中国农业银行',
    },
    {
      code: '中国银行',
      name: '中国银行',
    },
    {
      code: '中国建设银行',
      name: '中国建设银行',
    },
    {
      code: '交通银行',
      name: '交通银行',
    },
    {
      code: '中信银行',
      name: '中信银行',
    },
    {
      code: '中国光大银行',
      name: '中国光大银行',
    },
    {
      code: '华夏银行',
      name: '华夏银行',
    },
    {
      code: '中国民生银行',
      name: '中国民生银行',
    },
    {
      code: '广发银行',
      name: '广发银行',
    },
    {
      code: '平安银行',
      name: '平安银行',
    },
    {
      code: '招商银行',
      name: '招商银行',
    },
    {
      code: '兴业银行',
      name: '兴业银行',
    },
    {
      code: '浦发银行',
      name: '浦发银行',
    },
    {
      code: '北京银行',
      name: '北京银行',
    },
    {
      code: '城市商业银行',
      name: '城市商业银行',
    },
    {
      code: '广州市商业银行',
      name: '广州市商业银行',
    },
    {
      code: '汉口银行',
      name: '汉口银行',
    },
    {
      code: '杭州银行',
      name: '杭州银行',
    },
    {
      code: '晋城市商业银行',
      name: '晋城市商业银行',
    },
    {
      code: '南京银行',
      name: '南京银行',
    },
    {
      code: '宁波银行',
      name: '宁波银行',
    },
    {
      code: '上海银行',
      name: '上海银行',
    },
    {
      code: '温州市商业银行',
      name: '温州市商业银行',
    },
    {
      code: '长沙银行',
      name: '长沙银行',
    },
    {
      code: '浙江稠州商业银行',
      name: '浙江稠州商业银行',
    },
    {
      code: '广州市农信社',
      name: '广州市农信社',
    },
    {
      code: '农村商业银行',
      name: '农村商业银行',
    },
    {
      code: '顺德农信社',
      name: '顺德农信社',
    },
    {
      code: '恒丰银行',
      name: '恒丰银行',
    },
    {
      code: '浙商银行',
      name: '浙商银行',
    },
    {
      code: '农村合作银行',
      name: '农村合作银行',
    },
    {
      code: '渤海银行',
      name: '渤海银行',
    },
    {
      code: '徽商银行',
      name: '徽商银行',
    },
    {
      code: '村镇银行',
      name: '村镇银行',
    },
    {
      code: '重庆三峡银行',
      name: '重庆三峡银行',
    },
    {
      code: '上海农村商业银行',
      name: '上海农村商业银行',
    },
    {
      code: '城市信用合作社',
      name: '城市信用合作社',
    },
    {
      code: '北京农商行',
      name: '北京农商行',
    },
    {
      code: '湖南农信社',
      name: '湖南农信社',
    },
    {
      code: '农村信用合作社',
      name: '农村信用合作社',
    },
    {
      code: '深圳农村商业银行',
      name: '深圳农村商业银行',
    },
    {
      code: '深圳发展银行',
      name: '深圳发展银行',
    },
    {
      code: '渣打银行',
      name: '渣打银行',
    },
    {
      code: '集友银行',
      name: '集友银行',
    },
    {
      code: '东亚银行',
      name: '东亚银行',
    },
    {
      code: '中国邮政储蓄银行',
      name: '中国邮政储蓄银行',
    },
    {
      code: '珠海市农村信用合作社',
      name: '珠海市农村信用合作社',
    },
    {
      code: '尧都信用合作联社',
      name: '尧都信用合作联社',
    },
  ];
  return banks;
}

module.exports = {
  queryBanks,
};
