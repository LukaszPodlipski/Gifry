import Vue from "vue";
import VueRouter from "vue-router";
import GiftsView from "./pages/list/GiftsView.vue";
import LoginView from "./pages/login/LoginView.vue";
import EditList from "./pages/editList/EditList.vue";
import MainPage from "./pages/mainPage/MainPage.vue";
import store from "./store/store";

const routes = [
  { path: "/", component: MainPage, name: "Gifty Main" },
  {
    path: "/gift-list/:id",
    component: GiftsView,
    props: true,
    name: "Gift List",
  },
  {
    path: "/login",
    component: LoginView,
    name: "Login",
    meta: { requiresUnauth: true },
  },
  {
    path: "/edit-list",
    component: EditList,
    name: "EditList",
    meta: { requiresAuth: true },
  },
  { path: "/:notFound(.*)", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

async function checkAuthentication(to, _, next) {
  await store.getters.isAuthenticated;
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/edit-list");
  } else {
    next();
  }
}

router.beforeEach((to, _, next) => {
  checkAuthentication(to, _, next);
});

Vue.use(VueRouter);

export default router;
