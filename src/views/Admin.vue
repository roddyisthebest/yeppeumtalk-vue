<template>
  <div id="container">
    <div id="left">
      <div id="searchBarWrapper">
        <font-awesome-icon icon="fa-solid fa-search" class="text" />
        <input class="input" placeholder="이벤트 제목으로 검색해보세요." />
      </div>
      <div id="itemWrapper">
        <div id="itemHeader">
          <span class="text zero">No</span>
          <span class="text one">제목</span>
          <span class="text two">생성날짜</span>
        </div>
        <router-link
          :to="`/admin/detail/${index}`"
          class="item"
          v-for="index in 7"
          :key="index"
        >
          <span class="text zero">{{ index }}</span>
          <span class="text one">제목</span>
          <span class="text two">2022/01/24 12:01:20</span>
        </router-link>
      </div>
      <div id="pageWrapper">
        <button class="button clicked">1</button>
        <button class="button not-clicked">2</button>
        <button class="button not-clicked">3</button>
        <button class="button not-clicked">4</button>
        <button class="button not-clicked">5</button>
        <button class="button">></button>
      </div>
    </div>
    <div id="block"></div>
    <div id="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AdminView',
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
  padding: 0 30px;
  #left {
    flex: 1;
    height: 85%;
    display: flex;
    flex-direction: column;
    gap: 20px 0;

    #searchBarWrapper {
      width: calc(100% - 40px);
      height: 50px;
      border: 1px solid #d9d9d9;
      background-color: white;
      display: flex;
      align-items: center;
      gap: 20px;

      padding: 0 20px;
      .text {
        color: #8c8c8c;
        font-size: 20px;
      }
      .input {
        flex: 1;
        font-size: 20px;
        outline: none;
        border: none;
      }
    }

    #itemWrapper {
      display: flex;
      gap: 10px 0;
      flex-direction: column;
      #itemHeader {
        width: calc(100% - 40px);
        height: 50px;
        background-color: #8c8c8c;
        display: flex;
        gap: 0 20px;
        align-items: center;
        padding: 0 20px;
        .text {
          color: white;
          font-size: 10px;
          font-weight: 500;
          text-align: start;
        }
      }
      .item {
        display: flex;
        align-items: center;
        padding: 0 20px;
        width: calc(100% - 40px);
        height: 50px;
        gap: 0 20px;

        &:hover {
          background-color: lightgray;
        }
        transition: all 200ms ease;
        .text {
          color: black;
          font-size: 10px;
          font-weight: 500;
          text-align: start;
        }
      }
    }
    #pageWrapper {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0 15px;

      .button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 5px;
      }
      .clicked {
        color: black;
        border-bottom: 1px solid #feca1f;
      }
      .not-clicked {
        color: #c0c0c0;
        border-bottom: none;
      }
    }
  }
  #right {
    flex: 1;
    height: 85%;
    border: 1px solid #d9d9d9;
    overflow-y: scroll;
    background-color: white;
  }
  #block {
    width: 1px;
    background-color: #d9d9d9;
    height: 85%;
  }

  .zero {
    flex: 0.25;
  }
  .one {
    flex: 2.5;
  }
  .two {
    flex: 1.5;
  }
}
</style>
