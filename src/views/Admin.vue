<template>
  <div>
    hello it's admin

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AdminView',
});
</script>

<style scoped></style>
