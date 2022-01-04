const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    meta: {
      requireAuth: false,
    },
    children: [
      {
        path: "",
        name: "loginDefault",
        component: () => import("pages/Login"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/Login"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("pages/Register"),
      },
      {
        path: "email-confirmation",
        name: "email-confirmation",
        component: () => import("pages/EmailConfirmation"),
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () => import("pages/ForgotPassword"),
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: () => import("pages/ResetPassword"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requireAuth: true,
    },
    children: [
      { path: "home", name: "home", component: () => import("pages/Home") },
      {
        path: "category",
        name: "category",
        component: () => import("pages/Category"),
      },
      {
        path: "form-category/:id?",
        name: "form-category",
        component: () => import("pages/FormCategory"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404"),
  },
];

export default routes;
