import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from 'components/Login'
import Home from 'components/Home'
import User from 'components/User'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/user',
          component: User
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }
  let token = localStorage.getItem('key')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
