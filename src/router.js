import Vue from "vue";
import VueRouter from "vue-router";
import GiftsView from "./pages/list/GiftsView.vue";
import LoginView from "./pages/login/LoginView.vue";
import EditList from "./pages/editList/EditList.vue";
import MainPage from "./pages/mainPage/MainPage.vue";

const routes = [
  { path: "/", component: MainPage },
  { path: "/gift-list/:id", component: GiftsView, props: true },
  { path: "/login", component: LoginView },
  { path: "/edit-list", component: EditList, name: "EditList" },
  { path: "/:notFound(.*)", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

Vue.use(VueRouter);

export default router;
