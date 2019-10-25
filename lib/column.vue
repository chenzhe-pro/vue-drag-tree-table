<template>
  <div
    class="tree-column"
    v-bind:style="{ width: width, flex: flex, minWidth }"
    v-if="flex"
  >
    <slot></slot>
  </div>
  <div class="tree-column" v-bind:style="{ width: width, minWidth }" v-else>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'column',
  props: {
    width: String,
    field: String,
    label: String,
    flex: Number,
    minWidth: { type: String, default: 'auto' }
  },
  data() {
    return {
      open: false
    };
  }
};
</script>
<style>
.tree-column {
  padding: 0px 4px;
  min-width: 60px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
