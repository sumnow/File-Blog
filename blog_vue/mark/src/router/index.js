import Vue from 'vue'
import Router from 'vue-router'
import catalog from '@/pages/Catalog'
import essay from '@/pages/Essay'
import wrapper from '@/pages/Wrapper'
import cover from '@/pages/Cover'
import home from '@/pages/Home'
import notFound from '@/pages/NotFound'
import hello from '@/pages/hello'

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
          name: 'essay',
          component: essay,
        }
      ]
    },
    {
      path: '/body',
      name: 'hello',
      component: hello,
      children: [
        {
          path: ':type',
          name: 'hello',
          component: hello,
        },
        {
          path: ':type/:filename',
          name: 'hello',
          component: hello,
        }
      ]
    },
    { path: '*', component: notFound }
  ]
})



  routers.push('/home')



export default routers


