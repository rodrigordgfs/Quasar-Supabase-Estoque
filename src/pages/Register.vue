<template>
  <q-page padding>
    <p class="text-h6">
      <q-form class="row justify-center" @submit.prevent="handleRegister">
        <p class="col-12 text-h5 text-center">Register</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input label="Name" v-model="form.name" outlined />
          <q-input label="Email" v-model="form.email" type="email" outlined />
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
import { defineComponent, ref } from "vue";
import useAuthUser from "../composables/useAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageRegister",

  setup() {
    const router = useRouter();
    const { register } = useAuthUser();
    const form = ref({
      name: "",
      email: "",
      password: "",
    });
    const $q = useQuasar();

    const handleRegister = async () => {
      try {
        $q.loading.show({
          message: "Creating new account ...",
        });
        await register(form.value);
        $q.loading.hide();
        $q.notify({
          message: "Your account has been created",
          color: "positive",
          icon: "check",
        });
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
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
      form,
      handleRegister,
    };
  },
});
</script>
