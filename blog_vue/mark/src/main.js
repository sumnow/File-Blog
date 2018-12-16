// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import marked from './marked'
import Logger from 'console_colorpoint'

// Vue.use(load);

window.log = new Logger(process.env.NODE_ENV == 'production')
// Vue.prototype.$load = Load;

// Vue.component(Load)


Vue.prototype.marked = ctx => marked(ctx);


// console.log(Loading, LoadConstructor)


// Loading.methods.showLoad();

// Vue.use({
//   install: function(Vue){
//     Vue.component('Loading',Loading)
//   }
// })


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  next();
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})



