<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handleResetPassword">
        <p class="col-12 text-h5 text-center">Reset Password</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input label="Email" v-model="email" type="email" outlined />
          <q-btn
            label="Send Reset Email"
            color="primary"
            class="full-width"
            type="submit"
          />
          <q-btn
            label="Back"
            color="primary"
            class="full-width"
            flat
            :to="{ name: 'login' }"
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
  name: "PageForgotPassword",

  setup() {
    const router = useRouter();
    const { sendPasswordResetEmail } = useAuthUser();
    const email = ref("");
    const $q = useQuasar();

    const handleResetPassword = async () => {
      try {
        $q.loading.show({
          message: "Reseting password ...",
        });
        await sendPasswordResetEmail(email.value);
        $q.loading.hide();
        $q.notify({
          message: `Password reset email sent to ${email.value}`,
          color: "positive",
          icon: "check",
        });
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
      email,
      handleResetPassword,
    };
  },
});
</script>
