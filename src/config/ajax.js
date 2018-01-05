import axios from 'axios'

const post = params => {
  return axios({
    method: 'post',
    url: params.url,
    data: params.data
  }).then(res => {
    if (res && res.status === 200 && res.data) return res.data
  }).catch(error => {
    console.log(error)
  })
}
const get = params => {
  return axios.get(params.url, {
    params: params.data
  })
    .then(function (res) {
      if (res && res.status === 200 && res.data) return res.data
      console.log(res)
    })
    .catch(function (error) {
      console.log(error)
    })
}
export {
  post,
  get
}
