import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import useAuthUser from "src/composables/useAuthUser";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach(async (to, from, next) => {
    const { isLoggedIn } = useAuthUser();

    if (to.hash.includes("type=recovery") && to.name !== "Reset Password") {
      const token = to.hash.split("&")[0].replace("#access_token=", "");
      next({ name: "Reset Password", query: { token } });
    }

    if (!to.meta.requireAuth || (await isLoggedIn())) {
      next();
    } else {
      next({ name: "Login" });
    }
  });

  return Router;
});
