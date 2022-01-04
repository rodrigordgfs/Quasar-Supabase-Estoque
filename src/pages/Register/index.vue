<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handleRegister">
        <p class="col-12 text-h5 text-center">Register</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
            label="Name"
            v-model="form.name"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
            outlined
            lazy-rules
          />
          <q-input
            label="Email"
            v-model="form.email"
            type="email"
            :rules="[(val) => (val && val.length > 0) || 'Email is required']"
            outlined
            lazy-rules
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
            outlined
            lazy-rules
          />
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            type="submit"
          />
          <q-btn
            label="Back"
            color="primary"
            class="full-width"
            flat
            :to="{ name: 'Login' }"
          />
        </div>
      </q-form>
    </p>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import { useRouter } from "vue-router";
import useNotify from "src/composables/useNotify";
import useLoading from "src/composables/useLoading";

export default defineComponent({
  name: "PageRegister",

  setup() {
    const router = useRouter();
    const { register } = useAuthUser();
    const { notifyNegative, notifySuccess } = useNotify();
    const { showLoading, hideLoading } = useLoading();

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        showLoading("Creating new account ...");
        await register(form.value);
        notifySuccess("Your account has been created");
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        notifyNegative(error.message);
      } finally {
        hideLoading();
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>
