import Vue from 'vue'
import Router from 'vue-router'
import catalog from '@/pages/Catalog'
import content from '@/pages/Content'
import wrapper from '@/pages/Wrapper'
import home from '@/pages/Home'

Vue.use(Router)

const routers = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      // redirect: '/code/catalog'
    },
    {
      path: '/code',
      name: 'wrapper',
      component: wrapper,
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

routers.push('/code/catalog')
// routers.push('home')


export default routers


