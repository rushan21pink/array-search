import Vue from 'vue'
import Vuex from 'vuex'

import {LocalStorage} from "@/store/modules/LocalStorage";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    localStorage: LocalStorage
  }
})
