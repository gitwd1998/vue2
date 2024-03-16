import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: "/", name: "layout", component: () => import("@/layout/LayoutView"), redirect: '/home', children: [
    { path: "/home", name: "home", component: () => import("@/views/HomeView") },
    { path: "/about", name: "about", component: () => import("@/views/AboutView") },
    { path: "/mine", name: "mine", component: () => import("@/views/MineView") },
  ] }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
