<template>
  <q-page padding>
    <p class="text-h6">
      <q-form
        class="row justify-center"
        @submit.prevent="handleResetPassword"
      >
        <p class="col-12 text-h5 text-center">Reset Password</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
            label="Email"
            v-model="email"
            type="email"
            outlined
          />
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
import { defineComponent, ref } from 'vue';
import useAuthUser from 'src/composables/useAuthUser'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageForgotPassword',

  setup () {
    const router = useRouter()
    const { sendPasswordResetEmail } = useAuthUser()
    const email = ref('')

    const handleResetPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value)
        alert(`Password reset email sent to ${email.value}`)
      } catch (error) {
        console.log(error)
        alert(error.message)
      }
    }

    return {
      email,
      handleResetPassword
    }
  }
})
</script>
