import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    storeLs: [],
    tk: [],
    kaninfo: {}
  },
  mutations: {
    storeLogin (state, obj) {
      console.log(obj)
      state.tk = obj
      localStorage.setItem('tokenData', JSON.stringify(obj))
    },
    add (state, obj) {
      console.log(obj)
      let arrLs = state.storeLs.find(v => v.info.id === obj.info.id && v.size === obj.size && obj.col === v.col)
      if (arrLs) {
        arrLs.num += obj.num
      } else {
        state.storeLs.push(obj)
      }
    },
    kanjia (state, payload) {
      state.kaninfo = payload
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
  }
})

export default store