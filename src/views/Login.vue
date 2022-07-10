<template>
  <div id="auth-container">
    <span id="header">관리자 페이지</span>
    <input type="text" class="loginInput" v-model="email" />
    <input type="password" class="loginInput" v-model="password" />
    <button class="button normal" @click="logIn">로그인</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { login } from '@/api/user';
import { setToken } from '@/api';
export default Vue.extend({
  name: 'LoginView',
  methods: {
    go(location: string) {
      this.$router.push(`/${location}`);
    },
    async logIn() {
      try {
        const { data }: any = await login(this.email, this.password);
        this.$store.commit('SET_TOKEN', data.accessToken as string);
        setToken(data.accessToken as string);
        this.$router.push('/admin');
      } catch (e: any) {
        alert(e.response.data.errorMessage);
      }
    },
  },
  data() {
    return {
      email: '',
      password: '',
    };
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
