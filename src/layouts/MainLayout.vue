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

        <q-toolbar-title>
          <div class="col">
            <div>Quasar Supabase Estoque</div>
            <div class="text-caption">{{ subtitle }}</div>
          </div>
        </q-toolbar-title>

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

        <MenuList v-for="link in menuList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuList from "src/components/MenuList.vue";

const menuList = [
  {
    title: "Home",
    caption: "Welcome",
    icon: "home",
    routeName: "Home",
  },
  {
    title: "Category",
    caption: "Show categories",
    icon: "list",
    routeName: "Category",
  },
];

import { defineComponent, ref, computed, watch } from "vue";

import useAuthUser from "src/composables/useAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useNotify from "src/composables/useNotify";
import useLoading from "src/composables/useLoading";

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
    const subtitle = computed(() => router.currentRoute?.value?.name);

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
          router.replace({ name: "Login" });
        } catch (error) {
          notifyNegative(error.message);
        } finally {
          hideLoading();
        }
      });
    };

    return {
      menuList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
      subtitle,
    };
  },
});
</script>
