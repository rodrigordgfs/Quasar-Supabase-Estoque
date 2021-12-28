<template>
  <q-page padding>
    <p class="text-h6">
      <q-form
        class="row justify-center"
        @submit.prevent="handleRegister"
      >
        <p class="col-12 text-h5 text-center">Register</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
            label="Name"
            v-model="form.name"
            outlined
          />
          <q-input
            label="Email"
            v-model="form.email"
            type="email"
            outlined
          />
          <q-input
            label="Password"
            v-model="form.password"
            type="password"
            outlined
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
  name: 'PageRegister',

  setup () {
    const router = useRouter()
    const { register } = useAuthUser()
    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email  }})
      } catch (error) {
        console.log(error)
        alert(error.message)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
