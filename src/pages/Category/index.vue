<template>
  <q-page padding>
    <div class="row">
      <q-table
        class="col-12"
        :rows="categories"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:top>
          <span class="text-h6"> Categories </span>
          <q-space />
          <q-btn label="Add new Category" color="primary" />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="edit" color="info" dense>
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageCategory",

  setup() {
    const categories = [
      {
        id: 1,
        name: "Category 1",
      },
      {
        id: 2,
        name: "Category 2",
      },
      {
        id: 3,
        name: "Category 3",
      },
    ];
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

    return {
      categories,
      columns,
    };
  },
});
</script>

<style></style>
