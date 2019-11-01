import Vue from 'vue'
import Vuex from 'vuex'
import localStore from '../storage/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    storeLs: localStore.get('list') || '',
    tk: localStore.get('userinfo') || '',
    kaninfo: {},
    address: {},
    order: {},
    myod: ''
  },
  mutations: {
    storeLogin (state, obj) {
      console.log(obj)
      state.tk = obj
      localStore.set('userinfo', obj)
    },
    add (state, obj) {
      console.log(obj)
      let arrLs = state.storeLs.find(v => v.info.id === obj.info.id && v.size === obj.size && obj.col === v.col)
      if (arrLs) {
        arrLs.num += obj.num
      } else {
        state.storeLs.push(obj)
      }
      localStore.set('list', state.storeLs)
    },
    kanjia (state, payload) {
      state.kaninfo = payload
    },
    defaultAdd (state, payload) {
      state.address = payload
      console.log(payload)
    },
    addOrder (state, payload) {
      state.order = payload
      console.log(state.order)
    },
    myorder (state, payload) {
      state.myod = payload
      console.log(state.myod)
    }
  },
  getters: {
    allCount (state) {
      let zong = 0
      state.storeLs.forEach(v => {
        zong += v.num
      })
      return zong
    },
    allPri (state) {
      return state.storeLs.filter(v => v.checked).reduce((pri,v) => {
        return pri + v.info.minPrice * v.num
      }, 0)
    }
    // storeLs: {
    //   handler: function () {
    //     localStore.set('list', getters.storeLs)
    //   },
    //   deep: true
    // }
  }
})

export default store