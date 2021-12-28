<template>
  <q-page padding>
    <p class="text-body-1">Thanks for registering!</p>
    <p class="text-body-1">Please confirm yout email to finishing registering: <span class="text-bold">{{ $route.query.email }}</span></p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
