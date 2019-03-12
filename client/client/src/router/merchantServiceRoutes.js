
import reconciliationDownload from '@pages/reconciliation-download';
import merchantInfo from '@pages/merchant-info';
import secretManager from '@pages/secret-manager';
import serviceInfo from '@pages/service-info';

const merchantServiceRoutes = [
  {
    path: '/home/reconciliation-download',
    name: 'reconciliation-download',
    component: reconciliationDownload,
  },
  {
    path: '/home/merchant-info',
    name: 'merchant-info',
    component: merchantInfo,
  },
  {
    path: '/home/secret-manager',
    name: 'secret-manager',
    component: secretManager,
  },
  {
    path: '/home/service-info',
    name: 'service-info',
    component: serviceInfo,
  },
];

export default merchantServiceRoutes;
