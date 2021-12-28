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
            outlined
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
import useAuthUser from "../composables/useAuthUser";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "PageResetPassword",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const { resetPassword } = useAuthUser();
    const password = ref("");
    const token = route.query.token;

    const handleResetPassword = async () => {
      try {
        $q.loading.show({
          message: "Saving new password ...",
        });
        await resetPassword(token, password.value);
        $q.notify({
          message: "Your password has been reset",
          color: "positive",
          icon: "check",
        });
        $q.loading.hide();
        router.push({ name: "login" });
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
      password,
      handleResetPassword,
    };
  },
});
</script>
