import fetch from '../config/fetch'

export const getCustomerList = params => fetch('/api/v1/main/checklogin', params, 'post')

export const getLoginUser = params => fetch('/api/v1/main/checklogin', params, 'post')
