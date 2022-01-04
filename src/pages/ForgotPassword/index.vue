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
            :rules="[(val) => (val && val.length > 0) || 'Email is required']"
            lazy-rules
          />
        </div>
      </q-form>
    </p>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import useLoading from "src/composables/UseLoading";

export default defineComponent({
  name: "PageForgotPassword",

  setup() {
    const { sendPasswordResetEmail } = useAuthUser();
    const { notifyNegative, notifySuccess } = useNotify();
    const { showLoading, hideLoading } = useLoading();

    const email = ref("");

    const handleResetPassword = async () => {
      try {
        showLoading("Reseting password ...");
        await sendPasswordResetEmail(email.value);
        notifySuccess(`Password reset email sent to ${email.value}`);
      } catch (error) {
        notifyNegative(error.message);
      } finally {
        hideLoading();
      }
    };

    return {
      email,
      handleResetPassword,
    };
  },
});
</script>
