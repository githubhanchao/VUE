
import pageNotFound from '../views/pages/page-not-found';
import retrievePwdCheck from '../views/pages/retrieve-pwd-check';
import retrievePwdAssistCheck from '../views/pages/retrieve-pwd-assist-check';
import authCaptcha from '../views/pages/auth-captcha';
import retrievePwdReset from '../views/pages/retrieve-pwd-reset';
import customerActive from '@pages/customer-active';
import tradePwdSet from '@pages/set-trade-pwd';
import merchantRegister from '@pages/merchant-register';
import registerSuccess from '@pages/register-success';
import customerCertification from '@pages/customer-certification';

const retrieveLoginPwdRoutes = [
  {
    path: '*',
    name: 'pageNotFound',
    component: pageNotFound,
  },

  {
    path: '/retrieve-pwd-check',
    name: 'retrieve-pwd-check',
    component: retrievePwdCheck,
  },
  
  {
    path: '/merchant-register',
    name: 'merchant-register',
    component: merchantRegister,
  },
  
  {
    path: '/merchant-register-success',
    name: 'merchant-register-success',
    component: registerSuccess,
  },

  {
    path: '/retrieve-pwd-assist-check',
    name: 'retrieve-pwd-assist-check',
    component: retrievePwdAssistCheck,
  },

  {
    path: '/auth-captcha',
    name: 'auth-captcha',
    component: authCaptcha,
  },

  {
    path: '/retrieve-pwd-reset',
    name: 'retrieve-pwd-reset',
    component: retrievePwdReset,
  },

  {
    path: '/set-trade-pwd',
    name: 'set-trade-pwd',
    component: tradePwdSet,
  },

  {
    path: '/customer-active',
    name: 'customer-active',
    component: customerActive,
  },

  {
    path: '/customer-report',
    name: 'customer-report',
    component: customerCertification,
  },
];

export default retrieveLoginPwdRoutes;
