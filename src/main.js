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
/* eslint-disable no-new */
new Vue({
  router: route,
  store
}).$mount('#app')
