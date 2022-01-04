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
        name: "Login",
        component: () => import("pages/Login"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("pages/Register"),
      },
      {
        path: "email-confirmation",
        name: "Email Confirmation",
        component: () => import("pages/EmailConfirmation"),
      },
      {
        path: "forgot-password",
        name: "Forgot Password",
        component: () => import("pages/ForgotPassword"),
      },
      {
        path: "reset-password",
        name: "Reset Password",
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
      { path: "me", name: "Home", component: () => import("pages/Home") },
      {
        path: "category",
        name: "Category",
        component: () => import("pages/Category"),
      },
      {
        path: "form-category/:id?",
        name: "Form Category",
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
