import Vue from 'vue'
import Router from 'vue-router'
import catalog from '@/pages/Catalog'
import content from '@/pages/Content'
import wrapper from '@/pages/Wrapper'
import cover from '@/pages/Cover'
import home from '@/pages/Home'
import notFound from '@/pages/NotFound'

Vue.use(Router)

const routers = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/cover',
      name: 'cover',
      component: cover,
      // redirect: '/code/catalog'
    },
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
      children: [
        {
          path: ':type',
          name: 'catalog',
          component: catalog,
        },
        {
          path: ':type/:filename',
          name: 'content',
          component: content,
        }
      ]
    },
    { path: '*', component: notFound }
  ]
})

routers.push('/home')


export default routers


