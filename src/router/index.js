import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import Detail from '@/components/Detail'
import Gmap from '@/components/Gmap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      props: true,
      children: [
        {
          path: '/map',
          name: 'Gmap',
          component: Gmap
        }
      ]
    }
  ]
})
