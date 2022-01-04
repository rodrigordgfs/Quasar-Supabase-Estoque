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
        meta: {
          label: "Login",
        },
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/Login"),
        meta: {
          label: "Login",
        },
      },
      {
        path: "register",
        name: "register",
        component: () => import("pages/Register"),
        meta: {
          label: "Register",
        },
      },
      {
        path: "email-confirmation",
        name: "email-confirmation",
        component: () => import("pages/EmailConfirmation"),
        meta: {
          label: "Email Confirmation",
        },
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () => import("pages/ForgotPassword"),
        meta: {
          label: "Forgot Password",
        },
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: () => import("pages/ResetPassword"),
        meta: {
          label: "Reset Password",
        },
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
      {
        path: "me",
        name: "home",
        component: () => import("pages/Home"),
        meta: {
          label: "Home",
          subtitle: "Welcome",
          icon: "home",
        },
      },
      {
        path: "category",
        name: "category",
        component: () => import("pages/Category"),
        meta: {
          label: "Category",
          subtitle: "Show categories",
          icon: "list",
        },
      },
      {
        path: "form-category/:id?",
        name: "form-category",
        component: () => import("pages/FormCategory"),
        meta: {
          label: "Form Category",
          hidden: true,
        },
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
