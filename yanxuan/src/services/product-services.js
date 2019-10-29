import HTTP from '../utils/http'
const _http = new HTTP()

class Product {
  list () {
    return _http.request({
      url: 'banner/list'
    })
  }
  goodList () {
    return _http.request({
      url: 'cms/news/list'
    })
  }
  kanList () {
    return _http.request({
      url: 'shop/goods/kanjia/list'
    })
  }
  cms () {
    return _http.request({
      url: 'cms/news/list'
    })
  }
  detail (productId) {
    return _http.request({
      url: `cms/news/detail?id=${productId}`
      // data: {
      //   id: productId
      // }
    })
  }
  per () {
    return _http.request({
      url: 'shop/goods/list'
    })
  }
  classity () {
    return _http.request({
      type: 'post',
      url: 'shop/goods/category/all'
    })
  }
  classls (id) {
    return _http.request({
      url: `shop/goods/list?id=${id}`
    })
  }
  det (id) {
    return _http.request({
      type: 'post',
      url: 'shop/goods/detail',
      data: {
        id: id
      }
    })
  }

  // 登录
  login (obj) {
    return _http.request({
      type: 'post',
      url: 'user/m/login?deviceId=007&deviceName=monkey',
      data: {
        mobile: obj.mobile,
        pwd: obj.pwd
      }
    })
  }
  // 短信验证码
  msg (obj) {
    return _http.request({
      type: 'post',
      url: 'verification/sms/get',
      data: {
        mobile: obj.mobile,
        key: obj.key,
        picCode: obj.picCode
      }
    })
  }
  // 注册
  register (obj) {
    return _http.request({
      type: 'post',
      url: 'user/m/register',
      data: {
        mobile: obj.mobile,
        pwd: obj.pwd,
        code: obj.code,
        nick: obj.nick
      }
    })
  }
  // 获取评价信息
  reputation (id) {
    return _http.request({
      type: 'post',
      url: 'shop/goods/reputation',
      data: {
        goodsId: id
      }
    })
  }
  // 砍价详情
  tokanjia (obj) {
    return _http.request({
      type: 'post',
      url: 'shop/goods/kanjia/info',
      data: {
        kjid: obj.kjid,
        joiner: obj.joiner
      }
    })
  }
  //砍一刀
  kanOne (payload) {
    return _http.request({
      type: 'post',
      url: 'shop/goods/kanjia/help',
      data: {
        token: payload.token,
        kjid: payload.kjid,
        joinerUser: payload.joiner
      }
    })
  }
}

export default Product