import Router from 'vue-router';
import app from '../views/index.vue';
import Vue from 'vue';

import home from '../views/pages/home';
import login from '../views/pages/login';
import securityCenter from '../views/pages/security-center';
import transferAccountsQuery from '../views/pages/transfer-accounts-query';
import singleTransfer from '@pages/single-transfer';
import overview from '@pages/overview';
import notice from '@pages/notice';
import notification from '@pages/notification';
import notificationDetail from '@pages/notification-detail';
import GuideStatusUtil from '@/utils/GuideStatusUtil';

import routerBeforeHandler from '../middleware/routerBeforeHandler';
import routerAfterHandler from '../middleware/routerAfterHandler';

import store from '@/vuex/store';
import ActionTypeName from '@/utils/ActionTypeName';

import tradeManageRoutes from './tradeManageRoutes';
import systemManageRoutes from './systemManageRoutes';
import merchantServiceRoutes from './merchantServiceRoutes';
import agentpayManageRoutes from './agentpayManageRoutes';
import routesBeforeLogin from './routesBeforeLogin';

import ipWhiteList from '@pages/ip-white-list';
import offlineRechargeList from '@pages/offline-recharge-query';
import singleOffine from '@pages/offline-recharge-create';

const routes = [
  {
    path: '/',
    component: app,
    redirect: '/login',
  },

  {
    path: '/login',
    name: 'login',
    component: login,
    beforeEnter: (to, from, next) => {
      GuideStatusUtil.removeGuideStatus();
      store.commit('SET_AUTH_STEP', '');
      next();
    },
  },

  {
    path: '/home',
    name: 'home',
    component: home,
    redirect: '/home/overview',
    beforeEnter: (to, from, next) => {
      store.dispatch(ActionTypeName.LOAD_USER_SUMMARY)
        .then(() => {
          store.dispatch(ActionTypeName.LOAD_USER_PERSSIONS)
            .then(() => {
              store.dispatch(ActionTypeName.LOAD_SECURITY_LIST)
                .then(() => {
                  next();
                })
                .catch((error) => {
                  Vue.prototype.$message({
                    showClose: true,
                    message: error.respMessage,
                    type: 'error',
                  });
                });
            })
            .catch((error) => {
              Vue.prototype.$message({
                showClose: true,
                message: error.respMessage,
                type: 'error',
              });
            });
        }).catch(() => { });
    },
    children: [
      {
        path: '/home/overview',
        name: 'overview',
        component: overview,
      },

      {
        path: '/home/security-center',
        name: 'security-center',
        component: securityCenter,
        beforeEnter: (to, from, next) => {
          store.dispatch(ActionTypeName.LOAD_SECURITY_LIST)
            .then(() => {
              next();
            }).catch(() => { });
        },
      },

      {
        path: '/home/transfer-trade',
        name: 'transfer-trade',
        component: transferAccountsQuery,
        beforeEnter: (to, from, next) => {
          store.dispatch(ActionTypeName.LOAD_SECURITY_LIST)
            .then(() => {
              next();
            }).catch(() => { });
        },
      },

      {
        path: '/home/single-transfer',
        name: 'single-transfer',
        component: singleTransfer,
      },
      {
        path: '/home/offline-recharge-create',
        name: 'offlin-recharge-create',
        component: singleOffine,
      },

      {
        path: '/home/notice',
        name: 'notice',
        component: notice,
      },

      {
        path: '/home/notification',
        name: 'notification',
        component: notification,
      },

      {
        path: '/home/notification-detail',
        name: 'notification-detail',
        component: notificationDetail,
      },

      {
        path: '/home/ip-white-list',
        name: 'ipWhiteList',
        component: ipWhiteList,
      },
      {
        path: '/home/offline-recharge-list',
        name: 'offlineRechargeList',
        component: offlineRechargeList,
      },
    ].concat(tradeManageRoutes)
      .concat(systemManageRoutes)
      .concat(merchantServiceRoutes)
      .concat(agentpayManageRoutes),
  },
].concat(routesBeforeLogin);

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

router.beforeEach((to, from, next) => {
  // 全局route 中间件， 这里需要规范化
  routerBeforeHandler(to, from, next);
});

router.afterEach(route => {
  // 全局route 中间件， 这里需要规范化
  routerAfterHandler(route);
});

export default router;
