<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Form Category</p>
      </div>
    </div>
    <q-form
      class="col-md-7 col-sm-12 col-xs-12 q-gutter-y-sm"
      @submit.prevent="handleSave"
    >
      <q-input
        label="Name"
        v-model="form.name"
        :rules="[
          (val) =>
            (val && val.length > 3) ||
            'Name must be at least 3 characters long',
        ]"
        outlined
        lazy-rules
      />
      <q-btn
        :label="`${isUpdate ? 'Update' : 'Save'}`"
        color="primary"
        class="full-width"
        type="submit"
        rounded
      />
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useAPI from "src/composables/useAPI";
import useNotify from "src/composables/useNotify";
import useLoading from "src/composables/useLoading";

export default defineComponent({
  name: "PageFormCategory",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const { notifySuccess, notifyNegative } = useNotify();
    const { showLoading, hideLoading } = useLoading();
    const { post, getByID, update } = useAPI();
    const table = "category";
    const isUpdate = computed(() => route.params.id);
    const form = ref({
      name: "",
    });

    const handleSave = async () => {
      try {
        showLoading("Saving category...");
        if (isUpdate.value) {
          await update(table, form.value);
          notifySuccess("Category updated successfully");
        } else {
          await post(table, form.value);
          notifySuccess("Category saved successfully");
        }
        router.push({ name: "Category" });
      } catch (error) {
        notifyNegative(error.message);
      } finally {
        hideLoading();
      }
    };

    const handleGetCategory = async (id) => {
      try {
        showLoading("Loading category...");
        const category = await getByID(table, id);
        form.value = category;
      } catch (error) {
        notifyNegative(error.message);
      } finally {
        hideLoading();
      }
    };

    onMounted(() => {
      if (isUpdate.value) {
        handleGetCategory(isUpdate.value);
      }
    });

    return {
      form,
      handleSave,
      isUpdate,
    };
  },
});
</script>
