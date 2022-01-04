<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handleResetPassword">
        <p class="col-12 text-h5 text-center">New Password</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
            label="New Password"
            v-model="password"
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
            label="Send Reset Email"
            color="primary"
            class="full-width"
            type="submit"
          />
        </div>
      </q-form>
    </p>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "../../composables/useAuthUser";
import { useRouter, useRoute } from "vue-router";
import useNotify from "../../composables/useNotify";
import useLoading from "../../composables/useLoading";

export default defineComponent({
  name: "PageResetPassword",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const { resetPassword } = useAuthUser();
    const { notifyNegative, notifySuccess } = useNotify();
    const { showLoading, hideLoading } = useLoading();

    const password = ref("");
    const token = route.query.token;

    const handleResetPassword = async () => {
      try {
        showLoading("Saving new password ...");
        await resetPassword(token, password.value);
        notifySuccess("Your password has been reset");
        router.push({ name: "login" });
      } catch (error) {
        notifyNegative(error.message);
      } finally {
        hideLoading();
      }
    };

    return {
      password,
      handleResetPassword,
    };
  },
});
</script>
