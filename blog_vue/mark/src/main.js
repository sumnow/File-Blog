// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import marked from './marked'
// import AlloyFingerVue from 'alloyfinger'

// Vue.use(load);


Vue.config.performance = true;
Vue.config.devtools = true;
Vue.prototype.marked = ctx => marked(ctx);

// Vue.use({
//   install: function(Vue){
//     Vue.component('Loading',Loading)
//   }
// })

window.isComputer =
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(
    navigator.userAgent
  );


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  next();
})

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})



