import Vue from 'vue'
import Router from 'vue-router'
import MCatalog from '@/components/MCatalog'
import essay from '@/components/MEssay'
import MWrap from '@/pages/MWrap'
import cover from '@/pages/Cover'
import home from '@/pages/Home'
import notFound from '@/pages/NotFound'
import PCbody from '@/pages/PCbody'

Vue.use(Router)

const routers = new Router({
    mode: 'history',
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
            path: '/m/code',
            name: 'MWrap',
            component: MWrap,
            children: [
                // {
                //     path: '',
                //     name: 'MCatalog',
                //     component: MCatalog
                // },
                {
                    path: ':filename',
                    name: 'MEssay',
                    component: essay,
                }
            ]
        },
        // {
        //     path: '/code/',
        //     name: 'PCbody',
        //     component: PCbody,
        // },
        {
            path: '/code/:filename',
            name: 'PCbody',
            component: PCbody,
        },
        { path: '*', component: notFound }
    ]
})

// routers.push('/home')

export default routers


