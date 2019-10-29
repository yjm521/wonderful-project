import axios from 'axios'
import qs from 'qs'
import config from '../config/index'
class HTTP {
  request (params) {
    return new Promise((resolve, reject) => {
      axios({
        method: params.type || 'get',
        url: config.baseUrl + params.url,
        data: qs.stringify(params.data)
      }).then(res => {
        resolve(res)
      })
    })
  }
}
export default HTTP