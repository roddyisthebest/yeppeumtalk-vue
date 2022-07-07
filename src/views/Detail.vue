<template>
  <div id="container-detail">
    <img :src="require('@/assets/vertical.jpg')" id="img-view" alt="" />
    <div class="header-wrapper">
      <div class="header">
        <div class="text">#예뻐지는 시간</div>
      </div>
    </div>
    <Slide :style="{ paddingBottom: '30px' }"></Slide>
    <div id="inputWrapper">
      <input type="text" class="input" />
      <input type="text" class="input" />
      <div id="checkColumn">
        <input type="checkbox" name="color" />
        <span id="text">개인정보처리방침</span>
        <div id="check-button">상세보기</div>
      </div>
      <button id="button">이벤트 신청하기</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Slide from '../components/Slide.vue';
export default Vue.extend({
  name: 'DetailView',
  components: { Slide },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.scrollToTop();
  },
});
</script>

<style scoped lang="scss">
#container-detail {
  background-color: #f5f5f5;
  /* height: 500px; */
  padding-bottom: 40px;
  #img-view {
    width: 100%;
    height: 100%;
  }
  .header-wrapper {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ff3e9b;
      .text {
        font-size: 40px;
        padding: 0 5px;
        color: white;
        font-weight: 700;
      }
    }
  }
  #inputWrapper {
    position: fixed;
    bottom: 0;
    max-width: 450px;
    padding: 25px;
    width: calc(100% - 50px);
    height: 180px;
    background-color: #f7f7f7;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .input {
      width: calc(100% - 20px);
      padding: 10px;
      font-size: 15px;
      color: black;
      outline: none;
      border: 1px solid #bfbfbf;
    }
    #checkColumn {
      width: 100%;
      display: flex;
      gap: 0 8px;
      align-items: center;

      #text {
        font-size: 12px;
        font-weight: 400;
        color: #ab909f;
      }

      #check-button {
        width: 40px;
        height: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        font-size: 5px;
        background-color: black;
        color: white;
        font-weight: 600;
        cursor: pointer;
      }
    }

    #button {
      width: 100%;
      padding: 10px;
      font-size: 15px;
      background-color: #f0097b;
      outline: none;
      color: white;
      font-weight: 600;
      border: 1px solid #f0097b;
    }
  }
}
</style>
