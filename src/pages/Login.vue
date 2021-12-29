<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handleLogin">
        <p class="col-12 text-h5 text-center">Login</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
            label="Email"
            v-model="form.email"
            type="email"
            :rules="[(val) => (val && val.length > 0) || 'Email is required']"
            lazy-rules
            outlined
          />
          <q-input
            label="Password"
            v-model="form.password"
            type="password"
            :rules="[
              (val) =>
                (val && val.length >= 6) ||
                'Password must be at least 6 characters',
            ]"
            lazy-rules
            outlined
          />
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            type="submit"
          />
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            :to="{ name: 'register' }"
            flat
          />
          <q-btn
            label="Forgot your password?"
            color="primary"
            class="full-width"
            :to="{ name: 'forgot-password' }"
            flat
          />
        </div>
      </q-form>
    </p>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import useNotify from "src/composables/useNotify";
import useLoading from "src/composables/useLoading";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();
    const { login, isLoggedIn } = useAuthUser();
    const { notifyNegative, notifySuccess } = useNotify();
    const { showLoading, hideLoading } = useLoading();

    const form = ref({
      email: "",
      password: "",
    });

    onMounted(async () => {
      if (await isLoggedIn()) router.push({ name: "me" })
    })

    const handleLogin = async () => {
      try {
        showLoading("Recovering account data ...");
        await login(form.value);
        hideLoading();
        notifySuccess("Login successful!");
        router.push({ name: "me" });
      } catch (error) {
        hideLoading();
        notifyNegative(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
