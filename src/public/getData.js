import fetch from '../config/fetch'

export const getCustomerList = params => fetch('', params, 'post')
