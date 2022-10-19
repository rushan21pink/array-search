import {State} from "@/services/SearchTable";

const table = new State([]);

export const LocalStorage = {
  namespaced: true,

  state: {
    loading: false,
    loadingSearch: false,
    searchResult: [],
    showBtn: true,
  },

  getters: {
    loading: state => state.loading,
    searchResult: state => state.searchResult,
    loadingSearch: state => state.loadingSearch,
    showBtn: state => state.showBtn

  },

  mutations: {
    setLoading(state, data) {
      state.loading = data
    },
    setLoadingSearch(state, data) {
      state.loadingSearch = data
    },
    setSearchResult(state, data) {
      state.searchResult = data
    },
    showBtn(state){
      state.showBtn = false
    }
  },

  actions: {
    async loadArray({commit, dispatch, state}) {
      try {
        await commit('setLoading', true)

        const test = await table.get(1)

        if (!test?.length)
          await table.SetArr()

        commit('showBtn')
        commit('setLoading', false)
      } catch (e) {
        console.error('load array from vuex', e)
      }
    },

    async getSearchResult({commit, state}, text) {
      let res = []

      await commit('setLoadingSearch', true)
      if (text) {
        for (let i = 0; i < 1000; i++) {
          const arr = await table.get(i)
          res = [...res, ...customFilter(arr, text)]
        }
      }
      await commit('setLoadingSearch', false)
      await commit('setSearchResult', res)
    },

    async getSearchByOldValue({commit, state}, text) {
      let res = []

      await commit('setLoadingSearch', true)

      res = customFilter(state.searchResult, text)

      await commit('setLoadingSearch', false)
      await commit('setSearchResult', res)
    },
  },

  modules: {}
}


const customFilter = (arr, text) => {
  let res = []
  const reg = new RegExp('^' + text)

  for(let i = 0; i < arr.length; i++){
    if(arr[i][0] > text[0])
      break
    if(reg.exec(arr[i]))
      res.push(arr[i])
  }
  return res
}
