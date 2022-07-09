<template>
  <div id="auth-container">
    <span id="header">관리자 페이지</span>
    <input type="text" class="loginInput" />
    <input type="text" class="loginInput" />
    <button class="button normal">가입하기</button>
    <button class="button unNormal" @click="go('login')">돌아가기</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoginView',
  methods: {
    go(location: string) {
      this.$router.push(`/${location}`);
    },
  },
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
  .button {
    width: 282px;
    height: 50px;
    padding: 0 15px;
    font-size: 20px;
    font-weight: 500;
    margin: 0;
  }
  .normal {
    color: white;
    background-color: black;
  }
  .unNormal {
    color: blue;
    background-color: transparent;
  }
}
</style>
