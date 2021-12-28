<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handleLogin">
        <p class="col-12 text-h5 text-center">Login</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input label="Email" v-model="form.email" outlined type="email" />
          <q-input
            label="Password"
            v-model="form.password"
            type="password"
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
import { defineComponent, ref } from "vue";
import useAuthUser from "../composables/useAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();
    const { login } = useAuthUser();
    const form = ref({
      email: "",
      password: "",
    });
    const $q = useQuasar();

    const handleLogin = async () => {
      try {
        $q.loading.show({
          message: "Recovering account data ...",
        });
        await login(form.value);
        $q.loading.hide();
        router.push({ name: "me" });
      } catch (error) {
        $q.loading.hide();
        console.log(error);
        $q.notify({
          message: error.message,
          color: "negative",
          icon: "close",
        });
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
