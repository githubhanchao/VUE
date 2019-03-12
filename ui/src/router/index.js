import Vue from 'vue'
import Router from 'vue-router'
import PatentList from '@/components/PatentList'
import PatentAdd from '@/components/PatentAdd'
import Login from '@/components/Login'
import PatentDetail from '@/components/PatentDetail'
import BaseTable from '@/components/BaseTable'
import PatentEdit from '@/components/PatentEdit'
import InventionList from '@/components/InventionList'
import InventionAdd from '@/components/InventionAdd'
import InventionDetail from '@/components/InventionDetail'
import InventionEdit from '@/components/InventionEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/patent_list',
      name: 'PatentList',
      component: PatentList
    },
    {
      path: '/patent_add',
      name: 'PatentAdd',
      component: PatentAdd
    },
    {
      path: '/patent_detail',
      name: 'PatentDetail',
      component: PatentDetail
    },
    {
      path: '/patent_edit',
      name: 'PatentEdit',
      component: PatentEdit
    },
    {
      path: '/base_table',
      name: 'BaseTable',
      component: BaseTable,
    },
    {
      path: '/invention_list',
      name: 'InventionList',
      component: InventionList
    },
    {
      path: '/invention_add',
      name: 'InventionAdd',
      component: InventionAdd
    },
    {
      path: '/invention_detail',
      name: 'InventionDetail',
      component: InventionDetail
    },
    {
      path: '/invention_edit',
      name: 'InventionEdit',
      component: InventionEdit
    }
  ]
})
