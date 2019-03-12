/**
 * Created by huangjason on 2017/7/13.
 */

// 客户端的全局Meta数据
const APP_META_PATH = '/meta/client-app-meta';

// 客户端的页面Meta数据
const PAGE_META_PATH = '/meta/client-page-meta';

// (默认)用户名密码身份验证
const LOGIN_PATH = '/user/auth';

// 用户Token身份验证
const AUTH_TOKEN_LOGIN_PATH = '/user/auth-token';

// 获取图片验证码数据
const IMG_CAPTCHA_PATH = '/captcha/img-captcha';

// 身份验证
const AUTH_CAPTCHA_PATH = '/user/auth-captcha';

// 获取邮件或短信验证码数据
const SERVICE_CAPTCHA_PATH = '/captcha/service-captcha';

// 找回登录密码校验账户
const RETRIEVE_PWD_CHECK_PATH = '/security/retrieve-pwd-check';

// 找回登录密码重置登录密码
const RETRIEVE_PWD_RESET_PATH = '/security/retrieve-pwd-reset';

// 获取用户概要信息
const LOAD_USER_SUMMARY_PATH = '/user/summary';

// 用户登出
const LOGOUT_PATH = '/user/logout';

// 获取用户安全清单
const LOAD_SECURITY_LIST_PATH = '/security/security-list';

// 申请修改登录密码会话
const AUTH_LOGIN_PWD_PATH = '/security/auth-login-pwd';

// 修改登录密码
const MODIFY_LOGIN_PWD_PATH = '/security/modify-login-pwd';

// 申请设置支付密码会话
const AUTH_TRADE_PWD_PATH = '/security/auth-trade-pwd';

// 设置支付密码
const SET_TRADE_PWD_PATH = '/security/set-trade-pwd';

// 申请绑定手机号会话
const AUTH_BIND_PHONE_NO_PATH = '/security/auth-phone-no';

// 绑定手机号
const BIND_PHONE_NO_PATH = '/security/bind-phone-no';

// 获取用户权限列表
const LOAD_USER_PERSSIONS_PATH = '/security/permissions';

// 获取转账查询列表
const LOAD_TRANSFER_PATH = '/trade/transfer-trade';

// 查询支付交易列表
const LOAD_PAY_TRADE_PATH = '/trade/pay-trade';

// 转账申请身份验证
const TANSFER_TRADE_AUTH = '/trade/auth-transfer-trade';

// 转账申请
const TRANSFER_TRADE = '/trade/transfer-trade';

// 获取用户3个月内转账的账号数据
const ACCOUNT_RECENT_TRANSFER_LIST = '/user/recent-transfer-account';

// 获取用户概要信息数据
const ACCOUNT_SIMPLE_SUMMARY_INFO = '/user/simple-summary';

// 获取账户明细
const ACCOUNT_DETAILS_PATH = '/account/account-details';

// 下载对账单
const DOWNLOAD_RECONCILIATION_PATH = '/reconciliation/download';

// 获取账户余额
const LOAD_ACCOUNT_BALANCE_PATH = '/account/balance';

// 单笔代付申请身份验证
const SINGLE_PAY_AUTH_PATH = '/agentpay/auth-single-pay';

// 单笔代付
const SINGLE_PAY_PATH = '/agentpay/single-pay';

// 账户列表
const SINGLE_PAY_ACCOUNT_LIST_PATH = '/agentpay/recent-single-pay-info';

// 删除账户列表
const SINGLE_PAY_ACCOUNT_LIST_DELETE_PATH = '/agentpay/customer-record';

// 代付查询
const AGENTPAY_QUERY_PATH = '/trade/agentpay-trade';

// 代付明细查询
const AGENTPAY_DETAIL_BY_BATCHID_PATH = '/trade/agentpay-detail-list';

// 获取银行列表
const BANK_LIST_PATH = '/bank/agentpay-banks';

// 代付批次文件上传
const AGENTPAY_BATCH_FILE_UPLOAD_PATH = 'agentpay/batch-file-upload';

// 获取操作员列表
const OPERATOR_LIST_PATH = '/operator/operator-info';

// 增加操作员身份验证
const AUTH_OPERATOR_CREAT_PATH = '/operator/auth-operator-create';

// 增加操作员身份验证
const AUTH_OPERATOR_DELETE_PATH = '/operator/auth-operator-delete';

// 获取角色列表
const ROLE_LIST_PATH = '/role/role-info';

// 账户激活
const CUSTOMER_ACTIVE_PATH = '/operator-active/check';

// 账户激活设置手机号
const CUSTOMER_ACTIVE_BIND_PHONE_NO_PATH = '/operator-active/phone-no';

// 账户激活跳过设置手机号
const CUSTOMER_ACTIVE_SKIP_BIND_PHONE_NO_PATH = '/operator-active/skip-phone-no';

// 账户激活设置登录密码
const CUSTOMER_ACTIVE_LOGIN_PWD_PATH = '/operator-active/login-password';

// 账户激活设置支付密码
const CUSTOMER_ACTIVE_PAY_PWD_PATH = '/operator-active/pay-password';

// 获取代付审核列表
const AGENTPAY_CHECK_LIST_PATH = '/agentpay/single-checklist';

// 根据role_id获取角色的权限数据
const ROLE_PERMISSION_LIST_PATH = '/role/permission';

// 获取代付审核详情
const AGENTPAY_CHECK_DETAIL_PATH = '/agentpay/batch-trade-detail';

// 代付审核拒绝或审核通过
const AGENTPAY_CHECK_PATH = '/agentpay/trade-verify-refuse';

// 批次代付待确认列表
const AGENTPAY_UNVERIFY_PATH = '/agentpay/agentpay-unverify';

// 批量代付详情编辑
const AGENTPAY_BATCH_DETAIL_PATH = '/agentpay/batch-detail-trade';

// 确认提交批次代付
const SUBMIT_AGENTPAY_VERIFY_PATH = '/agentpay/batch-trade-verify';

// 单笔代付审核成功申请
const TRADE_PWD_AUTH_PATH = '/agentpay/auth-verify-pass';

// 单笔代付审核成功
const SINGLE_PAY_CHECK_SUCCESS_PATH = '/agentpay/trade-verify-pass';

// 验证支付密码,审核
const TRADE_PWD_CHECK_PATH = '/user/auth-trade-password';

// 申请确认提交批次代付会话
const AUTH_VERIFY_BATCH_PATH = '/agentpay/auth-verify-batch';

// 获取企业信息
const MERCHANT_INFO_PATH = '/merchant/info';

// 安全服务密钥列表
const SECRET_LIST_PATH = '/security-key/key';

// 安全服务密钥查看申请
const AUTH_SECRET_CHECK_PATH = '/security-key/auth-check';

// 安全服务密钥删除申请
const AUTH_SECRET_DELETE_PATH = '/security-key/auth-del';

// 安全服务密钥删除
const SECRET_DELETE_PATH = '/security-key/key';

// 安全服务密钥更新申请
const AUTH_SECRET_UPDATE_PATH = '/security-key/auth-update';

// 安全服务密钥更新
const SECRET_UPDATE_PATH = '/security-key/key';

// 安全服务密钥创建申请
const AUTH_SECRET_CREATE_PATH = '/security-key/auth-create';

// 安全服务密钥创建
const SECRET_CREATE_PATH = '/security-key/key';

// 安全服务密钥验签
const SECRET_CHECK_SIGN_PATH = 'security-key/check-sign';

// 用户登录列表
const LOGIN_LOG_LIST_PATH = '/operator-log/list';

// 申请修改角色信息会话
const AUTH_EDIT_ROLE_PATH = '/role/auth-edit-role';

// 获取province列表
const PROVINCE_LIST_PATH = '/location/province';

// 获取city列表
const CITY_LIST_PATH = '/location/city';

// 删除批量代付明细
const DELETE_BATCH_AGENTPAY_DETAIL_PATH = '/agentpay/batch-detail-trade';

// 账务明细日统计数据
const ACCOUNT_DETAIL_REPORT_PATH = '/account/recent-balance';

// 获取企业信息
const SERVICE_INFO_PATH = '/merchant/service-list';

// 获取公告
const NOTICE_LIST_PATH = '/notice/list';

// 补单交易列表
const REPLACEMENT_ORDER_LIST_PATH = '/trade/replacement-order-list';

// 补单交易详情
const REPLACEMENT_ORDER_DETAIL_PATH = '/trade/replacement-order-detail';

// 补单交易通知
const REPLACEMENT_ORDER_NOTICE_PATH = '/trade/replacement-order-notice';

// 获取备案号
const COPYRIGHT_PATH = '/meta/show-ispn';

// 批量代付批次删除
const DELETE_BATCH_AGENTPAY_PATH = '/agentpay/batch-trade';

// 代付审核设置
const AGENTPAY_CHECK_SET_PATH = '/merchant/check-setting';

// 申请绑定谷歌身份验证器会话
const AUTH_BIND_WORD_PATH = '/security/auth-bind-word';

// 结束绑定身份宝会话
const BIND_WORD_AUTH_FINISH_PATH = 'security/bind-word';

// 生成身份验证器二维码
const GENERATE_VERIFIER_QRCODE_PATH = '/security/word-generator-qrcode';

// 校验并绑定动态身份口令
const VERIFY_BIND_WORD_PATH = '/security/bind-word-generator';

// 获取找回密码邮箱验证交易订单号 // TODO
const GET_BATCH_ORDER_PATH = '/security/security-question';

// 获取找回密码邮箱验证交易订单号验证 // TODO
const RETRIEVE_PWD_ASSIT_CHECK_PATH = '/user/auth-security-question';

// 商户自注册
const MERCHANT_REGISTER_PATH = '/user/register';

// 商户自注册获取短信验证码
const GET_SMS_CAPTCHA_PATH = '/captcha/sms-captcha';

// 商户自报件新增
const CUSTOMER_REPORT_PATH = '/user/report';

// 获取商户自报件状态
const GET_CUSTOMER_REPORT_STATUS_PATH = '/user/status';

// 获取商户自报件审核状态
const GET_CUSTOMER_CHECK_STATUS_PATH = '/user/checkStatus';

// 获取商户报备详细信息
const GET_CUSTOMER_REPORT_DETAIL_PATH = '/user/report-detail';

// 图片上传
const IMG_UPLOAD_PATH = '/file/upload';

// const AGENTPAY_CHECK_NUM = '/notification/agentpay-check-num'
// ;
const WARNING_HINTS = '/notification/warning-hints';

// 获取IP列表
const IP_LIST_PATH = '/customer-ip/ip-info';

// 修改IP列表
const IP_ADD = '/customer-ip/update-ip';

// 修改IP授权
const IP_AUTH_ADD = '/customer-ip/auth-update';

// 查看IP白名单授权
const IP_AUTH_LIST = '/customer-ip/auth-view';

// 查看IP白名单
const IP_LIST_VIEW = '/customer-ip/view';

// 线下充值-新增
const OFFLINE_RECHARGE_CREATE = '/trade/offline-recharge-create';
const LOAD_OFFLINE_RECHARGE = '/trade/offline-recharge-trade';
const OFFLINE_CARD_INFO = '/trade/offline-recharge-cardinfo';
const OFFLINE_RECHARGE_AUTH = '/trade/offline-recharge-auth-create';
// IP白名单校验
const IP_ADD_EXAMINE = '/customer-ip/examine';

module.exports = {
  APP_META_PATH,
  PAGE_META_PATH,
  LOGIN_PATH,
  AUTH_TOKEN_LOGIN_PATH,
  IMG_CAPTCHA_PATH,
  AUTH_CAPTCHA_PATH,
  SERVICE_CAPTCHA_PATH,
  RETRIEVE_PWD_CHECK_PATH,
  RETRIEVE_PWD_RESET_PATH,
  LOAD_USER_SUMMARY_PATH,
  LOAD_USER_PERSSIONS_PATH,
  LOGOUT_PATH,
  LOAD_SECURITY_LIST_PATH,
  AUTH_LOGIN_PWD_PATH,
  MODIFY_LOGIN_PWD_PATH,
  AUTH_TRADE_PWD_PATH,
  SET_TRADE_PWD_PATH,
  BIND_PHONE_NO_PATH,
  AUTH_BIND_PHONE_NO_PATH,
  LOAD_TRANSFER_PATH,
  LOAD_PAY_TRADE_PATH,
  TANSFER_TRADE_AUTH,
  TRANSFER_TRADE,
  ACCOUNT_RECENT_TRANSFER_LIST,
  ACCOUNT_SIMPLE_SUMMARY_INFO,
  ACCOUNT_DETAILS_PATH,
  DOWNLOAD_RECONCILIATION_PATH,
  LOAD_ACCOUNT_BALANCE_PATH,
  SINGLE_PAY_AUTH_PATH,
  SINGLE_PAY_PATH,
  AGENTPAY_QUERY_PATH,
  AGENTPAY_DETAIL_BY_BATCHID_PATH,
  SINGLE_PAY_ACCOUNT_LIST_PATH,
  BANK_LIST_PATH,
  AGENTPAY_BATCH_FILE_UPLOAD_PATH,
  OPERATOR_LIST_PATH,
  ROLE_LIST_PATH,
  CUSTOMER_ACTIVE_PATH,
  CUSTOMER_ACTIVE_BIND_PHONE_NO_PATH,
  CUSTOMER_ACTIVE_SKIP_BIND_PHONE_NO_PATH,
  CUSTOMER_ACTIVE_LOGIN_PWD_PATH,
  CUSTOMER_ACTIVE_PAY_PWD_PATH,
  AGENTPAY_CHECK_LIST_PATH,
  ROLE_PERMISSION_LIST_PATH,
  AGENTPAY_CHECK_DETAIL_PATH,
  AUTH_OPERATOR_CREAT_PATH,
  AGENTPAY_CHECK_PATH,
  AGENTPAY_UNVERIFY_PATH,
  AGENTPAY_BATCH_DETAIL_PATH,
  SUBMIT_AGENTPAY_VERIFY_PATH,
  TRADE_PWD_AUTH_PATH,
  TRADE_PWD_CHECK_PATH,
  AUTH_VERIFY_BATCH_PATH,
  SINGLE_PAY_CHECK_SUCCESS_PATH,
  MERCHANT_INFO_PATH,
  SECRET_LIST_PATH,
  AUTH_SECRET_CHECK_PATH,
  AUTH_SECRET_DELETE_PATH,
  SECRET_DELETE_PATH,
  AUTH_SECRET_UPDATE_PATH,
  SECRET_UPDATE_PATH,
  AUTH_SECRET_CREATE_PATH,
  SECRET_CREATE_PATH,
  SECRET_CHECK_SIGN_PATH,
  LOGIN_LOG_LIST_PATH,
  AUTH_EDIT_ROLE_PATH,
  PROVINCE_LIST_PATH,
  CITY_LIST_PATH,
  DELETE_BATCH_AGENTPAY_DETAIL_PATH,
  ACCOUNT_DETAIL_REPORT_PATH,
  SERVICE_INFO_PATH,
  NOTICE_LIST_PATH,
  AUTH_OPERATOR_DELETE_PATH,
  REPLACEMENT_ORDER_LIST_PATH,
  REPLACEMENT_ORDER_DETAIL_PATH,
  REPLACEMENT_ORDER_NOTICE_PATH,
  COPYRIGHT_PATH,
  DELETE_BATCH_AGENTPAY_PATH,
  AGENTPAY_CHECK_SET_PATH,
  SINGLE_PAY_ACCOUNT_LIST_DELETE_PATH,
  AUTH_BIND_WORD_PATH,
  VERIFY_BIND_WORD_PATH,
  GENERATE_VERIFIER_QRCODE_PATH,
  BIND_WORD_AUTH_FINISH_PATH,
  GET_BATCH_ORDER_PATH,
  RETRIEVE_PWD_ASSIT_CHECK_PATH,
  MERCHANT_REGISTER_PATH,
  GET_SMS_CAPTCHA_PATH,
  CUSTOMER_REPORT_PATH,
  GET_CUSTOMER_REPORT_STATUS_PATH,
  GET_CUSTOMER_CHECK_STATUS_PATH,
  GET_CUSTOMER_REPORT_DETAIL_PATH,
  IMG_UPLOAD_PATH,
  // AGENTPAY_CHECK_NUM,
  WARNING_HINTS,
  IP_LIST_PATH,
  IP_ADD,
  IP_AUTH_ADD,
  IP_AUTH_LIST,
  IP_LIST_VIEW,
  // 商户线下充值
  OFFLINE_RECHARGE_CREATE,
  LOAD_OFFLINE_RECHARGE,
  OFFLINE_CARD_INFO,
  OFFLINE_RECHARGE_AUTH,
};

