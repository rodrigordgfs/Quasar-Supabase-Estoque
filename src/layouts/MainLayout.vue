<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-btn
          v-if="showBack"
          icon="navigate_before"
          color="white"
          @click="goBack"
          dense
          round
          flat
        />

        <q-toolbar-title>{{ title }}</q-toolbar-title>

        <q-btn-dropdown color="white" icon="person" flat>
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Menu</q-item-label>

        <MenuList
          v-for="route in routes"
          :key="route.path"
          :routeName="route.name"
          :title="route.meta.label"
          :caption="route.meta.subtitle"
          :icon="route.meta.icon"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import MenuList from "src/components/MenuList.vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useNotify from "src/composables/UseNotify";
import useLoading from "src/composables/UseLoading";

export default defineComponent({
  name: "MainLayout",

  components: {
    MenuList,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const { logout } = useAuthUser();
    const router = useRouter();
    const $q = useQuasar();
    const { notifyNegative } = useNotify();
    const { showLoading, hideLoading } = useLoading();
    const title = computed(() => router.currentRoute?.value?.meta?.label);
    const showBack = computed(() => router.currentRoute?.value?.meta?.back);
    const routes = computed(() =>
      router.options.routes[1].children.filter((item) => !item.meta.hidden)
    );

    const handleLogout = async () => {
      $q.dialog({
        title: "Logout",
        message: "Are you sure you want to logout?",
        persistent: true,
        cancel: true,
      }).onOk(async () => {
        try {
          showLoading("Logging out ...");
          await logout();
          router.replace({ name: "login" });
        } catch (error) {
          notifyNegative(error.message);
        } finally {
          hideLoading();
        }
      });
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
      title,
      routes,
      showBack,
      goBack,
    };
  },
});
</script>
