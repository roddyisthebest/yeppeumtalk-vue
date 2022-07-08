<template>
  <div id="auth-container">
    <span id="header">관리자 페이지</span>
    <input type="text" class="loginInput" />
    <input type="text" class="loginInput" />
    <div id="button">로그인</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoginView',
});
</script>

<style scoped lang="scss">
#auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px 0;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  background-color: #f8f8f8;

  #header {
    font-size: 30px;
    color: #989898;
    font-weight: 500;
  }

  .loginInput {
    width: 250px;
    height: 50px;
    border: 1px solid #cacaca;
    outline: none;
    padding: 0 15px;
    font-size: 20px;
  }
  #button {
    width: 250px;
    height: 50px;
    padding: 0 15px;
    font-size: 20px;
    color: white;
    font-weight: 500;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
