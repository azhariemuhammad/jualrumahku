import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import Detail from '@/components/Detail'
import Gmap from '@/components/Gmap'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeRouteEnter: (to, form, next) => {
        if (localStorage.getItem('uidRumah')) {
          next()
        } else {
          alert('Please Login!')
        }
      }
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

// router.beforeEach((to, from, next) => {
//   let currentUser = localStorage.getItem('uidRumah')
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

//   if (requiresAuth && !currentUser) next('/')
//   else if (!requiresAuth && currentUser) next('/')
//   else next()
// })

export default router
