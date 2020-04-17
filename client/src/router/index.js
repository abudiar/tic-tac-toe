import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '@/store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      console.log(Store.state.nickname);
      if (!Store.state.nickname)
        next('/');
      next();
    }
  },
  {
    path: '/games/:room',
    name: 'Room',
    component: () => import('../views/Room.vue'),
    beforeEnter: (to, from, next) => {
      console.log(Store.state.nickname);
      if (!Store.state.nickname)
        next('/');
      next();
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
