<template>
  <q-page padding>
    <div class="row">
      <q-table
        class="col-12"
        :rows="categories"
        :columns="columns"
        row-key="id"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6"> Categories </span>
          <q-space />
          <q-btn
            label="Add new Category"
            color="primary"
            icon="add"
            @click="handleAdd"
            dense
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="edit"
              color="info"
              @click="handleEdit(props.row)"
              dense
            >
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn icon="delete" color="negative" dense>
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useNotify from "src/composables/useNotify";
import useAPI from "src/composables/useAPI";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageCategory",

  setup() {
    const router = useRouter();
    const categories = ref([]);
    const columns = [
      {
        name: "name",
        align: "left",
        label: "Name",
        field: "name",
        sortable: true,
      },
      {
        name: "actions",
        align: "right",
        label: "Actions",
        field: "actions",
      },
    ];
    const { get } = useAPI();
    const { notifyNegative } = useNotify();
    const loading = ref(true);

    const handleGetCategories = async () => {
      loading.value = true;
      try {
        categories.value = await get("category");
      } catch (error) {
        notifyNegative(error.message);
      } finally {
        loading.value = false;
      }
    };

    const handleEdit = (category) => {
      router.push({ name: "form-category", params: { id: category.id } });
    };

    const handleAdd = () => {
      router.push({ name: "form-category" });
    };

    onMounted(() => {
      handleGetCategories();
    });

    return {
      categories,
      columns,
      loading,
      handleEdit,
      handleAdd,
    };
  },
});
</script>

<style></style>
