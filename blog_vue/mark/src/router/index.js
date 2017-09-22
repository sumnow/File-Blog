import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import content from '@/components/Content'

Vue.use(Router)

const routers = new Router({
  routes: [
    { 
      path: '/', 
      redirect: '/code/home' 
    },
    {
      path: '/code/home',
      name: 'home',
      component: home
    },
    {
      path: '/code/home/:id',
      name: 'content',
      component: content,
    },

  ]
})

routers.push('/code/home')

export default routers


