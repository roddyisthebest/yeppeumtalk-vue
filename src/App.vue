<template>
  <div id="app">
    <div id="container">
      <nav>
        <button id="button">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
      </nav>
      <router-view :style="{ paddingTop: '80px' }" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
}

#container {
  max-width: 500px;
  width: 100%;
}
nav {
  position: fixed;
  z-index: 100;
  background-color: #feca1f;
  width: 470px;
  height: 80px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: space-between;
  #button {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    color: white;
    font-size: 30px;
    cursor: pointer;
  }
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
