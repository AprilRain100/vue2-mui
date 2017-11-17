import App from '../App'
import home from '@/components/home'
import customer from '@/components/customer'
import analysis from '@/components/analysis'
import message from '@/components/message'
import userinfo from '@/components/userinfo'
//  home 页面
import homeIndex from '@/components/home/index'
import homeFirst from '@/components/home/first'
import homeSecond from '@/components/home/second'
import homeThr from '@/components/home/thr'

// 顾客子页面 lookLable
import cusIndex from '@/components/customer/index'
import cusDetail from '@/components/customer/detail'
import lookLable from '@/components/customer/lookLable'
import morSearch from '@/components/customer/morSearch'

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
        name: 'homeIndex',
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
        name: 'customer',
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
