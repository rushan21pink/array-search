import { SearchService } from '@/services/SearchStorageService'

export const LocalStorage = {
    namespaced: true,

    state: {
        array: [],
        loading: false,
        searchResult: []
    },
    getters: {
        loading: state => state.loading,
        array: state => state.array,
        searchResult: state => state.searchResult
    },
    mutations: {
        setArray(state, data){
            state.array = data
        },
        setLoading(state, data){
            state.loading = data
        },
        setSearchResult(state, data){
            state.searchResult = data
        }
    },
    actions: {
        loadArray({commit}){
            commit('setLoading', true)
            SearchService.setAll()
            commit('setArray', SearchService.getAll())
            commit('setLoading', false)
        },

        loadSearchResult({commit}, text){
            commit('setSearchResult',SearchService.searchResult(text))
        }
    },
    modules: {
    }
}
