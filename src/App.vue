<template>
  <div id="app">
    <Layout>
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Layout from '@/layout/Layout.vue';
export default Vue.extend({
  components: {
    Layout,
  },
});
</script>
<style lang="scss">
body {
  margin: 0;

  min-height: 500px;
}
a {
  text-decoration: none;
}
#app {
  font-family: 'SCDream', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* display: flex;
  justify-content: center; */
}

@font-face {
  font-family: 'SCDream';
  src: url('assets/font/SCDream1.otf') format('truetype');
  font-weight: 100;
}
@font-face {
  font-family: 'SCDream';
  src: url('assets/font/SCDream2.otf') format('truetype');
  font-weight: 200;
}
@font-face {
  font-family: 'SCDream';
  src: url('assets/font/SCDream3.otf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family: 'SCDream';
  src: url('assets/font/SCDream4.otf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family: 'SCDream';
  src: url('assets/font/SCDream5.otf') format('truetype');
  font-weight: 500;
}

@font-face {
  font-family: 'SCDream';
  src: url('assets/font/SCDream6.otf') format('truetype');
  font-weight: 600;
}

@font-face {
  font-family: 'SCDream';
  src: url('assets/font/SCDream7.otf') format('truetype');
  font-weight: 700;
}
@font-face {
  font-family: 'SCDream';
  src: url('assets/font/SCDream8.otf') format('truetype');
  font-weight: 800;
}
@font-face {
  font-family: 'SCDream';
  src: url('assets/font/SCDream9.otf') format('truetype');
  font-weight: 900;
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
