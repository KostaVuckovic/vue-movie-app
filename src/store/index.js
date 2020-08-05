import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mobileScreen: false,
    theme: localStorage.getItem('theme') || 'theme-dark',
    showLoader: true
  },
  getters: {
    isMobile(state){
      return state.mobileScreen
    },
    getTheme(state){
      return state.theme
    },
    isActiveLoad(state){
      return state.showLoader
    }
  },
  mutations: {
    HIDE_NAVBAR(state, payload){
      if(payload < 1024){
        state.mobileScreen = true
      }
    },
    SHOW_NAVBAR(state, payload){
      if(payload < 1024){
        state.mobileScreen = false
      }
    },
    SET_THEME(state){
      state.theme = state.theme === 'theme-dark' ? 'theme-light' : 'theme-dark'
      localStorage.setItem('theme', state.theme)
    },
    END_LOAD(state){
      state.showLoader = false
    },
    TOGGLE_LOAD(state){
      state.showLoader = true
    }
  },
  actions: {
    hideNavBar({ commit }, payload){
      commit('HIDE_NAVBAR', payload)
    },
    showNavBar({commit}, payload){
      commit('SHOW_NAVBAR', payload)
    },
    setTheme({commit}){
      commit('SET_THEME')
    },
    endOfLoading({commit}){
      commit('END_LOAD')
    },
    toggleLoad({commit}){
      commit('TOGGLE_LOAD')
    }
  }
})
