// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import marked from './marked'

// Vue.use(load);

if (process.env.NODE_ENV === 'development') {
  import('console_colorpoint').then(res=>{
    var Logger = res.default
    window.log = new Logger()
    log.blueviolet('start log!')
  })
}

Vue.prototype.marked = ctx => marked(ctx);

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



