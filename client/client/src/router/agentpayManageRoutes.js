
import agentpayQuery from '@pages/agentpay-query';
import agentpayBatchDetail from '@pages/agentpay-batch-detail';
import batchAgentpay from '@pages/batch-agentpay';
import batchApply from '@pages/batch-apply';
import batchUploadDetail from '@pages/batch-upload-detail';
import agentpayCheck from '@pages/agentpay-check';
import agentpayCheckDetail from '@pages/agentpay-check-detail';
import singlePay from '@pages/single-pay';
import agentpayCheckSet from '@pages/agentpay-check-set';

const agentpayManageRoutes = [
  {
    path: '/home/single-pay',
    name: 'single-pay',
    component: singlePay,
  },

  {
    path: '/home/agentpay-query',
    name: 'agentpay-query',
    component: agentpayQuery,
  },

  {
    path: '/home/agentpay-batch-detail',
    name: 'agentpay-batch-detail',
    component: agentpayBatchDetail,
  },

  {
    path: '/home/batch-agentpay-edit',
    name: 'batch-agentpay-edit',
    component: singlePay,
  },

  {
    path: '/home/batch-agentpay',
    name: 'batch-agentpay',
    component: batchAgentpay,
  },

  {
    path: '/home/batch-apply',
    name: 'batch-apply',
    component: batchApply,
  },

  {
    path: '/home/batch-upload-detail',
    name: 'batch-upload-detail',
    component: batchUploadDetail,
  },

  {
    path: '/home/agentpay-check',
    name: 'agentpay-check',
    component: agentpayCheck,
  },

  {
    path: '/home/check-setting',
    name: 'check-setting',
    component: agentpayCheckSet,
  },

  {
    path: '/home/agentpay-check-detail',
    name: 'agentpay-check-detail',
    component: agentpayCheckDetail,
  },
];

export default agentpayManageRoutes;
