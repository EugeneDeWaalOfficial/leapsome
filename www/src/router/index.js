import Vue from "vue";
import VueRouter from "vue-router";

import loadView from "@/router/utils/load-view";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: loadView("Home"),
    beforeEnter(to, from, next) {
      store
        .dispatch("users/current")
        .then(next)
        .catch(err => {
          console.error(err);
          next(false);
        });
    }
  },
  {
    path: "/praise",
    name: "PraiseWall",
    component: loadView("PraiseWall"),
    beforeEnter(to, from, next) {
      Promise.all([
        store.dispatch("users/current"),
        store.dispatch("users/list"),
        store.dispatch("praise/list")
      ])
        .then(next)
        .catch(err => {
          console.error(err);
          next(false);
        });
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
