import { createRouter, createWebHistory } from "vue-router";

/** import all views (pages) */
import HomePage from './views/HomePage.vue';

/** router instance */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
      name: "home"
    }
  ]
});

export default router;