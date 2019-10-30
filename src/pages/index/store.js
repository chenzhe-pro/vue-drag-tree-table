import Vue from 'vue'
import Vuex from 'vuex'
import {ENUM} from '../../assets/js/enum'
console.log('vuex init');
Vue.use(Vuex);
console.log('vuex init2');
export default new Vuex.Store({
  state: {
    show_main_layout: false,
    userInfo:{},
    pageTitle: '',
    ENUM
  },
  mutations: {
    change_show_main_layout (state, payload) {
      state.show_main_layout = payload;
    },
    setUser(state, payload){
      state.userInfo=payload;
    },
    setEnum(state,payload){
      state.ENUM={...state.ENUM,...payload};
    },
    setPageTitle(state, payload){
      state.pageTitle=payload;
    }
  },
  actions: {
    // getCurrentUser({commit }){
    //
    // }
  }
})
