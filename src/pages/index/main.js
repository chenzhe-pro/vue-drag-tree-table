import Vue from 'vue'
import './element-ui'
// import ElementUI from 'element-ui';
// import '../../sass/element-variables.scss';
// Vue.use(ElementUI);
import '../../assets/js/common'
import App from './App.vue'
import router from './router'
import store from './store'
console.log('main init')
import layout from '../../components/Layout.vue'
Vue.component('Layout',layout);
import MainAndHeader from '../../components/MainAndHeader.vue'
Vue.component('MainAndHeader',MainAndHeader);
import '../../sass/pages/index/index.scss'

Vue.config.productionTip = false;
setTimeout( ()=>{
  // if (window.quicker.getCookie('access_token')) {
  //   let user=await ser.getCurrentUser();
  //   store.commit('setUser',user);
  //
  // }
  $('#loader').fadeOut(300,()=>{
    new Vue({
      router,
      store,
      render: h => h(App),
      created(){
        // this.
      }
    }).$mount('#app');
  });
},300);


