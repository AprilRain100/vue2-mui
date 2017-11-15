// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/**
 * 此处要注意必须使用关键词 routes和router 因为官方路由定义的实例的名称如此
 */
import Vue from 'vue'
import routers from './router/index'
import Router from 'vue-router'

Vue.use(Router)
Vue.config.productionTip = false
const route = new Router({
  routes: routers,
  mode: 'history'
})
/* eslint-disable no-new */
new Vue({
  router: route
}).$mount('#app')
