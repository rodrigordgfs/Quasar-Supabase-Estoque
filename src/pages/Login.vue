<template>
  <q-page padding>
    <p class="text-h6">
      <q-form
        class="row justify-center"
        @submit.prevent="handleLogin"
      >
        <p class="col-12 text-h5 text-center">Login</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
            label="Email"
            v-model="form.email"
            outlined
          />
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
            to="/register"
            flat
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
  name: 'PageLogin',

  setup () {
    const router = useRouter()
    const { login } = useAuthUser()
    const form = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        router.push({ name: 'me' })
      } catch (error) {
        console.log(error)
        alert(error.message)
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
