<template>
  <div id="container">
    <div id="content">
      <div id="titleWrapper">
        <span id="title">링크</span>
        <button id="button" v-if="!edit" @click="edit = true">수정</button>
        <button id="button" v-else @click="edit = false">저장</button>
      </div>
      <input type="text" id="input" v-model="link" :disabled="!edit" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LinkView',
  data() {
    return { link: '', edit: false };
  },
});
</script>

<style scoped lang="scss">
#container {
  flex: 1;
  display: flex;
  gap: 0 30px;
  height: 100%;
  align-items: center;
  justify-content: center;
  #content {
    height: calc(85% - 60px);
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    width: calc(90% - 60px);
    border: 1px solid #d9d9d9;
    background-color: white;
    #titleWrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #d9d9d9;
      #title {
        font-size: 20px;
        font-weight: 500;
        color: black;
      }
      #button {
        width: 50px;
        height: 25px;
        background-color: #8c8c8c;
        color: white;
        font-size: 10px;
        font-weight: 500;
      }
    }
    #input {
      border: 1px solid #cacaca;
      padding: 15px;
      outline: none;
      background-color: transparent;
    }
  }
}
</style>
