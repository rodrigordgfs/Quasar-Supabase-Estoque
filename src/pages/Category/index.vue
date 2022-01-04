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
            <q-btn
              icon="delete"
              color="negative"
              @click="handleRemove(props.row.id)"
              dense
            >
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
import useNotify from "../../composables/useNotify";
import useLoading from "../../composables/useLoading";
import useAPI from "../../composables/useAPI";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

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
    const { get, remove } = useAPI();
    const { notifyNegative, notifySuccess } = useNotify();
    const { showLoading, hideLoading } = useLoading();
    const $q = useQuasar();
    const loading = ref(true);
    const table = "category";

    const handleGetCategories = async () => {
      loading.value = true;
      try {
        categories.value = await get(table);
      } catch (error) {
        notifyNegative(error.message);
      } finally {
        loading.value = false;
      }
    };

    const handleEdit = (category) =>
      router.push({ name: "form-category", params: { id: category.id } });

    const handleAdd = () => router.push({ name: "form-category" });

    const handleRemove = async (id) => {
      try {
        $q.dialog({
          title: "Delete Category",
          message: "Are you sure you want to delete this category?",
          persistent: true,
          cancel: true,
        }).onOk(async () => {
          try {
            showLoading("Deleting category...");
            await remove(table, id);
            notifySuccess("Category deleted successfully");
            handleGetCategories();
          } catch (error) {
            notifyNegative(error.message);
          } finally {
            hideLoading();
          }
        });
      } catch (error) {
        notifyNegative(error.message);
      } finally {
        hideLoading();
      }
    };

    onMounted(() => handleGetCategories());

    return {
      categories,
      columns,
      loading,
      handleEdit,
      handleAdd,
      handleRemove,
    };
  },
});
</script>

<style></style>
