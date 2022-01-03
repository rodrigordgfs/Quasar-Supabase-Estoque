<template>
  <q-item
    clickable
    :to="{ name: routeName }"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuList',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    routeName: {
      type: String,
      default: null
    },

    icon: {
      type: String,
      default: ''
    }
  },

  setup() {
  }
})
</script>
