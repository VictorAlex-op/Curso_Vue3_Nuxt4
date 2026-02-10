import { createRouter, createWebHistory } from "vue-router";
import {useUserStore} from './stores/userStore'
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Edit from "./views/Edit.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()

  if (!userStore.userData) {
    await userStore.currentUser()
  }

  if (userStore.userData) {
    next()
  } else {
    next('/login')
  }
}

const routes = [
    { path: "/", component: Home, beforeEnter:requireAuth },
    { path: "/editar/:id", component: Edit, beforeEnter: requireAuth },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
];

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
});

export default router;