import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
console.log('router init');
import ser from './service/index.js'
import store from './store'
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect:'/bench'
    },
    {
      path: '/bench',
      name: 'bench',
      component: () => import(/* webpackChunkName: "workbench" */ './views/workbench/index.vue')
    }
  ]
});
router.beforeEach(async function (to, from, next) {
  if (to.query.access_token) {
    window.quicker.setCookie('access_token',to.query.access_token,'/',parseInt(to.query.expires_in)/3600);
    let query={...to.query};
    delete query.access_token;
    delete query.expires_in;
    delete query.jti;

    next({name:to.name,params:to.params,query:query});
  }
  if (window.quicker.getCookie('access_token')) {
    nprogress.start();
    if(!store.state.userInfo.id){
      store.commit('setUser',await ser.getCurrentUser());
    }

    next();
  } else {
    next();
    // common.authorize();
  }
});
router.afterEach(function (to, from) {
  let name = to.name;
  nprogress.done();
});
console.log('router init2')
export default router;