import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Favorite from "../views/Favorite.vue"
import MyPage from "../views/MyPage.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Original from "../views/Original.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
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
    path: "/api",
    name: "Api",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Api.vue"),
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: Favorite,
  },
  {
    path: "/myPage",
    name: "MyPage",
    component: MyPage,
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
