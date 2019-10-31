import Vue from 'vue'
import Router from 'vue-router'
import Classity from '@/views/products/classity'
import Cart from '@/views/products/cart'
import User from '@/views/products/user'
import Home from '@/views/products/home'
import Root from '@/views/products/root'
import Classy from '@/views/products/classy'
const Bargain = () => import('@/views/products/bargain')
const Special = () => import('@/views/products/special')
const Specialls = () => import('../views/products/special-ls.vue')
const Detail = () => import('../views/products/detail.vue')
const Sigin = () => import('../views/products/sigin.vue')
const Gift = () => import('../views/products/gift.vue')
const Login = () => import('../views/loagin/login.vue')
const Register = () => import('../views/loagin/register.vue')
Vue.use(Router)
const Bargaininfo = () => import('../views/kanjia/bargaininfo.vue')
const Purchase = () => import('../views/xiadan/purchase.vue')
const Address = () => import('../views/xiadan/address.vue')
const Updateass = () => import('../views/xiadan/updateass.vue')
const Payment = () => import('../views/xiadan/payment.vue')
const Dingdan = () => import('../views/xiadan/dingdan.vue')
export default new Router({
  linkActiveClass: 'mine-active',
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          path: '',
          component: Home,
          meta: {
            title: '首页',
            keepAlive: true
          }
        },
        {
          path: '/classity',
          component: Classity,
          meta: {
            title: '分类',
            keepAlive: true
          }
        },
        {
          path: '/cart',
          component: Cart,
          meta: {
            title: '购物车',
            keepAlive: true
          }
        },
        {
          path: '/user',
          name: 'user',
          meta: {
            title: '个人中心',
            keepAlive: true
          },
          component: User
        }
      ]
    },
    {
      path: '/bargain',
      component: Bargain
    },
    {
      path: '/special',
      component: Special
    },
    {
      path: '/special/:id',
      name: 'spe',
      component: Specialls
    },
    {
      path: '/classy/:id',
      name: 'classy',
      component: Classy
    },
    {
      path: '/detail/:id?',
      name: 'detail',
      component: Detail
    },
    {
      path: '/sigin',
      name: 'sigin',
      component: Sigin
    },
    {
      path: '/gift',
      name: 'gift',
      component: Gift
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
        mode: 'in-out',
        keepAlive: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/bargain_info',
      name: 'bargaininfo',
      component: Bargaininfo
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: Purchase
    },
    {
      path: '/user_address',
      name: 'addre',
      component: Address
    },
    {
      path: '/update_address/:id',
      name: 'updateass',
      component: Updateass
    },
    {
      path: '/payment/:id',
      name: 'payment',
      component: Payment
    },
    {
      path: '/dingdan',
      name: 'dingdan',
      component: Dingdan
    }
  ]
})
