<template>
  <div id="app">
    <div id="container">
      <nav>
        <button id="button">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
      </nav>
      <router-view :style="{ paddingTop: '80px' }" />
      <footer>
        <div id="nav-bar">
          <router-link to="/" class="button">
            <span class="text">개인정보처리방침</span>
          </router-link>
          <span class="block"></span>
          <router-link to="/" class="button">
            <span class="text">입점/제휴문의</span>
          </router-link>
        </div>
        <div id="info-wrapper">
          <span class="text"
            >주소 : 서울시 강남구 강남대로 | 사업자 등록번호: 220-88-86589</span
          >
          <span class="text"
            >COPYRIGHT ⓒ 2020 YEPPEMTALK. ALL RIGHT RESERVED</span
          >
        </div>
      </footer>
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

footer {
  #nav-bar {
    height: 50px;
    display: flex;
    .button {
      background-color: #5a5a5a;
      border: none;
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      .text {
        color: #f5f5f5;
        font-size: 15px;
        font-weight: 400;
      }
    }
    .block {
      width: 1.5px;
      height: 100%;
      background-color: #f5f5f5;
    }
  }
  #info-wrapper {
    background-color: #f5f5f5;

    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.5px 0;
    flex-direction: column;
    .text {
      color: #5a5a5a;
      font-size: 13px;
      font-weight: 500;
    }
  }
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
