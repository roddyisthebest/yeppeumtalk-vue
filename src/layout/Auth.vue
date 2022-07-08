<template>
  <div :style="{ width: '100%' }">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AdminLayoutView',
});
</script>

<style scoped></style>
