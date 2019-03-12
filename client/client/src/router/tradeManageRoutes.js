
import payTradeQuery from '@pages/pay-trade-query';
import accountDetail from '@pages/account-detail';

const tradeManageRoutes = [
  {
    path: '/home/pay-trade',
    name: 'pay-trade',
    component: payTradeQuery,
  },
  {
    path: '/home/account-detail',
    name: 'account-detail',
    component: accountDetail,
  },
];

export default tradeManageRoutes;
