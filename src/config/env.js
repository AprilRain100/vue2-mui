let service = [
  'http://demo.coracle.com/xmanager'
]
let baseUrl = service[0]

const APIS = {
  login: baseUrl + '/api/v1/main/checklogin', // 登录

  homeQuery: baseUrl + '/app/v1/home/query', // 首页统计数据

  customerList: baseUrl + '/app/v1/customer/query', // 客户列表数据

  cusDetail: baseUrl + '/app/v1/customer/list/{id}', // 客户详情
}

export {
  baseUrl,
  APIS
}
