import { APIS } from '../config/env'
import { post, get } from '../config/ajax'

export default {
  async login ({commit}, params) { // 登录
    let data = {
      url: APIS.login,
      data: params
    }
    let response = await post(data)
    if (response && response.status) {
      commit('LOGINIFGO', response)
      return response
    } else {
      mui.alert(response.message)
    }
  },
  async homeQuery ({commit}, params) { // 首页统计图
    let data = {
      url: APIS.homeQuery,
      data: params
    }
    let response = await get(data)
    if (response && response.status) {
      // commit('LOGINIFGO', response)
      return response
    } else {
      mui.alert(response.message)
    }
  },
  async cusList ({commit}, id) { // 客户列表
    let data = {
      url: APIS.customerList,
      data: {
        'customerId': null,
        'matureId': '',
        'personInCharge': null,
        'sourceId': null,
        'ln': null,
        'gn': null,
        'startDate': null,
        'endDate': null,
        'role': null,
        'kw': null,
        'p': 1,
        's': 10,
        'sellerId': ''
      }
    }
    let response = await post(data)
    if (response && response.status) {
      return response
    } else {
      mui.alert(response.message)
    }
  },
  async cusDetail ({commit}, id) { // 客户详情
    let data = {
      url: APIS.cusDetail.replace('{id}', id)
    }
    let response = await get(data)
    if (response && response.status) {
      commit('CUSTOMERINFO', response.detail)
      return response
    } else {
      mui.alert(response.message)
    }
  },
}
