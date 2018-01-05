import App from '../App'
const home = r => require.ensure([], () => r(require('@/components/home')), 'home')
const customer = r => require.ensure([], () => r(require('@/components/customer')), 'customer')
const analysis = r => require.ensure([], () => r(require('@/components/analysis')), 'analysis')
const message = r => require.ensure([], () => r(require('@/components/message')), 'message')
const userinfo = r => require.ensure([], () => r(require('@/components/userinfo')), 'userinfo')
//  home 页面
const homeIndex = r => require.ensure([], () => r(require('@/components/home/index')), 'homeIndex')
const homeFirst = r => require.ensure([], () => r(require('@/components/home/first')), 'homeFirst')
const homeSecond = r => require.ensure([], () => r(require('@/components/home/second')), 'homeSecond')
const homeThr = r => require.ensure([], () => r(require('@/components/home/thr')), 'homeThr')
// 顾客子页面 lookLable
const cusIndex = r => require.ensure([], () => r(require('@/components/customer/index')), 'cusIndex')
const cusDetail = r => require.ensure([], () => r(require('@/components/customer/detail')), 'cusDetail')
const lookLable = r => require.ensure([], () => r(require('@/components/customer/lookLable')), 'lookLable')
const morSearch = r => require.ensure([], () => r(require('@/components/customer/morSearch')), 'morSearch')
const cusInfo = r => require.ensure([], () => r(require('@/components/customer/customerInfo')), 'cusInfo')
const follow = r => require.ensure([], () => r(require('@/components/customer/clickFollow')), 'follow')
const dynamic = r => require.ensure([], () => r(require('@/components/customer/dynamic')), 'dynamic')
const addPeople = r => require.ensure([], () => r(require('@/components/customer/addPeople')), 'addPeople')

export default [
  {
    path: '/',
    component: App, // 顶层路由 对应index.html
    children: [ // 二级路由 对应App.vue
      {
        path: '',
        redirect: 'home' // 地址为空时重定向到home页
      },
      {
        path: 'home',
        // name: 'homeIndex',
        component: homeIndex,
        children: [
          {
            path: '/',
            component: home,
            meta: { requiresAuth: true }
          },
          {
            path: 'first',
            component: homeFirst
          },
          {
            path: 'second',
            component: homeSecond,
            children: [
              {
                path: 'thr',
                component: homeThr
              }
            ]
          }
        ]
      },
      {
        path: 'customer',
        // name: 'customer',
        component: cusIndex,
        children: [
          {
            path: '/',
            component: customer,
            meta: { requiresAuth: true }
          },
          {
            path: 'cusDetail',
            component: cusDetail
          },
          {
            path: 'lookLable',
            component: lookLable
          },
          {
            path: 'morSearch',
            component: morSearch
          },
          {
            path: 'cusInfo',
            component: cusInfo
          },
          { // 点击跟进
            path: 'follow',
            component: follow
          },
          {
            path: 'dynamic',
            component: dynamic
          },
          {
            path: 'addPeople',
            component: addPeople
          }
        ]
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: analysis,
        meta: { requiresAuth: true }
      },
      {
        path: 'message',
        name: 'message',
        component: message,
        meta: { requiresAuth: true }
      },
      {
        path: 'userinfo',
        name: 'userinfo',
        component: userinfo,
        meta: { requiresAuth: true }
      }
    ]
  }

]
