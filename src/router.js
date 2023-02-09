import { createRouter, createWebHashHistory } from "vue-router";

/** import all views (pages) */
import HomePage from './views/HomePage.vue';
import DogDetails from './views/DogDetails.vue';

/** router instance */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
      name: "home"
    },
    {
      path: "/dogs/:dogBreed",
      component: DogDetails,
      name: "dogDetails",
      props: true
    }
  ]
});

export default router;