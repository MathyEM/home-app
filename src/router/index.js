import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TodoList from '../views/TodoList.vue'
import HueApp from '../views/HueApp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/calendar',
    name: 'Kalender',
    // route level code-splitting
    // this generates a separate chunk (calendar.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "calendar" */ '../views/Calendar.vue')
  },
  {
    path: '/todolist',
    name: 'Todo List',
    component: TodoList
  },
  {
    path: '/hueapp',
    name: 'Hue App',
    component: HueApp
  }
]

const router = new VueRouter({
  routes
})

export default router
