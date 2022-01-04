<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="showBack"
          icon="navigate_before"
          color="white"
          @click="goBack"
          dense
          round
          flat
        />
        <q-toolbar-title> Quasar Estoque </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginLayout",

  setup() {
    const router = useRouter();
    const showBack = computed(() => router.currentRoute?.value?.meta?.back);

    const goBack = () => {
      router.go(-1);
    };

    return {
      showBack,
      goBack,
    };
  },
});
</script>
