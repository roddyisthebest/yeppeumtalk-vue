<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts">
import Vue from 'vue';
import Admin from '@/layout/Admin.vue';
import User from '@/layout/User.vue';
import Auth from '@/layout/Auth.vue';
export default Vue.extend({
  name: 'LayoutView',
  components: { Admin, User, Auth },
  data() {
    return {
      layout: 'Admin' as string,
    };
  },
  watch: {
    $route(to) {
      this.$data.layout = to.meta?.layout;
    },
  },
});
</script>

<style scoped></style>
