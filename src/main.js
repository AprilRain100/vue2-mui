// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/**
 * 此处要注意必须使用关键词 routes和router 因为官方路由定义的实例的名称如此
 */
import Vue from 'vue'
import routers from './router/router'
import Router from 'vue-router'
import store from './store/'
// require('./public/mui.css')
// require('../node_modules/vux/src/styles/reset.less')

Vue.use(Router)
Vue.config.productionTip = false
const route = new Router({
  routes: routers,
  mode: 'history'
})
route.beforeEach((to, from, next) => {
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  if (to.meta.requiresAuth) {
    store.commit('FOOTBARSTATE', true) // 控制App.vue 里的footbar 是否显示
    next()
  } else {
    store.commit('FOOTBARSTATE', false)
    next() // 确保一定要调用 next()
  }
})
Vue.filter('dates', function (value) {
 // 返回处理后的值
 var date = new Date(value);
 var y = date.getFullYear();
 var m = date.getMonth() + 1;
 m = m < 10 ? ('0' + m) : m;
 var d = date.getDate();
 d = d < 10 ? ('0' + d) : d;
 var h = date.getHours();
 h = h < 10 ? ('0' + h) : h;
 var minute = date.getMinutes();
 var second = date.getSeconds();
 minute = minute < 10 ? ('0' + minute) : minute;
 second = second < 10 ? ('0' + second) : second;
 return y + '-' + m + '-' + d+' '+h+':'+minute;
})
/* eslint-disable no-new */
new Vue({
  router: route,
  store
}).$mount('#app')
//                  ___====-_  _-====___
//            _--^^^#####//      \\#####^^^--_
//         _-^##########// (    ) \\##########^-_
//       -############//  |\^^/|  \\############-
//      _/############//   (@::@)   \\############\_
//     /#############((     \\//     ))#############\
//    -###############\\    (oo)    //###############-
//   -#################\\  / VV \  //#################-
//  -###################\\/      \//###################-
// _#/|##########/\######(   /\   )######/\##########|\#_
// |/ |#/\#/\#/\/  \#/\##\  |  |  /##/\#/  \/\#/\#/\#| \|
// `  |/  V  V  `   V  \#\| |  | |/#/  V   '  V  V  \|  '
//    `   `  `      `   / | |  | | \   '      '  '   '
//                     (  | |  | |  )
//                    __\ | |  | | /__
//                   (vvv(VVV)(VVV)vvv)
//                  神兽保佑
//                代码无BUG!