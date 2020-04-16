import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname: ''
  },
  mutations: {
    SET_NICKNAME(state, n) {
      state.nickname = n;
    }
  },
  actions: {

  },
  modules: {
  }
})
