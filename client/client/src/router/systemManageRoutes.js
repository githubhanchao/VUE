
import roleManager from '@pages/role-manager';
import operatorManager from '@pages/operator-manager';
import roleEdit from '@pages/role-edit';
import operatorEdit from '@pages/operator-edit';
import loginLog from '@pages/login-log';
import ipAdd from '@pages/ip-add';


const systemManageRoutes = [
  {
    path: '/home/role-manager',
    name: 'role-manager',
    component: roleManager,
  },

  {
    path: '/home/role-add',
    name: 'role-add',
    component: roleEdit,
  },

  {
    path: '/home/role-edit',
    name: 'role-edit',
    component: roleEdit,
  },

  {
    path: '/home/operator-manager',
    name: 'operator-manager',
    component: operatorManager,
  },

  {
    path: '/home/operator-add',
    name: 'operator-add',
    component: operatorEdit,
  },

  {
    path: '/home/operator-edit',
    name: 'operator-edit',
    component: operatorEdit,
  },

  {
    path: '/home/login-log',
    name: 'login-log',
    component: loginLog,
  },

  {
    path: '/home/ip-add',
    name: 'ip-add',
    component: ipAdd,
  },
];

export default systemManageRoutes;
