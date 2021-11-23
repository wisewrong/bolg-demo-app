<template>
  <li :class="['item', { checked }]">
    <input type="checkbox" class="checkbox" v-model="checked">
    <span class="item-text text-ellipsis">
      <slot></slot>
    </span>
    <span class="item-actions">
      <button class="button primary" @click="handleDetail">Detail</button>
      <button class="button line" @click="handleRemove">Remove</button>
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    itemId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    checked: false,
  }),
  methods: {
    handleRemove() {
      this.$emit('remove', this.itemId);
    },
    handleDetail() {
      this.$emit('view', this.itemId);
    },
  },
});
</script>
