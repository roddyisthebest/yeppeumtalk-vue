<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts">
import Vue from 'vue';
import Admin from '@/layout/Admin.vue';
import User from '@/layout/User.vue';
export default Vue.extend({
  name: 'LayoutView',
  components: { Admin, User },
  data() {
    return {
      layout: 'Admin' as string,
    };
  },
  watch: {
    $route(to, from) {
      this.$data.layout = to.meta?.layout;
    },
  },
});
</script>

<style scoped></style>
