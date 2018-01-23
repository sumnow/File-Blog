import Vue from 'vue'
import Router from 'vue-router'
import catalog from '@/pages/Catalog'
import content from '@/pages/Content'
import code from '@/pages/Code'
import home from '@/pages/Home'

Vue.use(Router)

const routers = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      // redirect: '/code/catalog'
    },
    {
      path: '/code',
      name: 'code',
      component: code,
      redirect: '/code/catalog',
      children: [
        {
          path: 'catalog',
          name: 'catalog',
          component: catalog
        },
        {
          path: 'catalog/:id',
          name: 'content',
          component: content,
        },
      ]
    },
  ]
})

routers.push('/home')

export default routers


