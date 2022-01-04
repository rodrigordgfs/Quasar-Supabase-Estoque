<template>
  <q-page padding>
    <p class="text-body-1">Thanks for registering!</p>
    <p class="text-body-1">
      Please confirm yout email to finishing registering:
      <span class="text-bold">{{ $route.query.email }}</span>
    </p>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-btn
          label="Back to Login"
          color="secondary"
          class="full-width"
          rounded
          :to="{ name: 'Login' }"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageEmailConfirmation",
});
</script>
