import { createRouter, createWebHistory } from "vue-router"
import Favorite from "../views/Favorite.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Original from "../views/Original.vue"

const routes = [
  {
    path: "/googlemap",
    name: "Map",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/googlemap.vue"),
  },
  {
    path: "/myfavorite-googlemap",
    name: "Personal",
    component: () =>
      import(
        /* webpackChunkName: "Personal" */ "../views/myfavorite-googlemap.vue"
      ),
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: Favorite,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/original",
    name: "Original",
    component: Original,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
