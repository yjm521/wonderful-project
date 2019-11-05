import HTTP from '../utils/http'
import Qs from 'qs'
const _http = new HTTP()

class Product {
  list () {
    return _http.request({
      url: 'small4/banner/list'
    })
  }
  goodList () {
    return _http.request({
      url: 'small4/cms/news/list'
    })
  }
  kanList () {
    return _http.request({
      url: 'small4/shop/goods/kanjia/list'
    })
  }
  cms () {
    return _http.request({
      url: 'small4/cms/news/list'
    })
  }
  detail (productId) {
    return _http.request({
      url: `small4/cms/news/detail?id=${productId}`
      // data: {
      //   id: productId
      // }
    })
  }
  per () {
    return _http.request({
      url: 'small4/shop/goods/list'
    })
  }
  classity () {
    return _http.request({
      type: 'post',
      url: 'small4/shop/goods/category/all'
    })
  }
  classls (id) {
    return _http.request({
      url: `small4/shop/goods/list?id=${id}`
    })
  }
  det (id) {
    return _http.request({
      type: 'post',
      url: 'small4/shop/goods/detail',
      data: {
        id: id
      }
    })
  }

  // 登录
  login (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/user/m/login?deviceId=007&deviceName=monkey',
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
      url: 'small4/verification/sms/get',
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
      url: 'small4/user/m/register',
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
      url: 'small4/shop/goods/reputation',
      data: {
        goodsId: id
      }
    })
  }
  // 砍价详情
  tokanjia (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/shop/goods/kanjia/info',
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
      url: 'small4/shop/goods/kanjia/help',
      data: {
        token: payload.token,
        kjid: payload.kjid,
        joinerUser: payload.joiner
      }
    })
  }
  //收货地址列表
  address (payload) {
    return _http.request({
      type: 'post',
      url: 'small4/user/shipping-address/list',
      data: {
        token: payload
      }
    })
  }
  //省市区
  sheng () {
    return _http.request({
      type: 'post',
      url: 'common/region/province'
    })
  }
  shi (id) {
    return _http.request({
      type: 'post',
      url: 'common/region/child',
      data: {
        pid: id
      }
    })
  }
  //添加收货地址
  addAddress (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/user/shipping-address/add',
      data: {
        address: obj.address,
        cityId: obj.cityId,
        code: obj.code,
        linkMan: obj.linkMan,
        mobile: obj.mobile,
        provinceId: obj.provinceId,
        token: obj.token
      }
    })
  }
  //默认的收货地址
  defaultAddress (token) {
    return _http.request({
      type: 'post',
      url: 'small4/user/shipping-address/default',
      data: {
        token: token
      }
    })
  }
  //删除地址
  delAddress (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/user/shipping-address/delete',
      data: {
        token: obj.token,
        id: obj.id
      }
    })
  }
  //订单创建
  createOrder (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/order/create',
      data: {

        token: obj.token,
        goodsJsonStr: obj.goodsJsonStr
      }
    })
  }
  //获取尺寸和规格
  size (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/shop/goods/price',
      data: {
        goodsId: obj.goodsId,
        propertyChildIds: obj.colorid + ',' + obj.sizeid
      }
    })
  }
  orders (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/order/list',
      data: {
        token: obj.token,
        pageSize: obj.pageSize
      }
    })
  }
  //重设密码
  reset (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/user/m/reset-pwd',
      data: {
        mobile: obj.mobile,
        pwd: obj.pwd,
        code: obj.code
      }
    })
  }
  reput (obj) {
    return _http.request({
      type: 'post',
      url: 'small4/order/reputation',
      data: {
        token: obj.token,
        postJsonString: obj.postJsonString
      }
    })
  }
  
}

export default Product