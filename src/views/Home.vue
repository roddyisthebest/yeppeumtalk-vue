<template>
  <div id="container-main">
    <div class="header-wrapper">
      <div class="header">
        <div class="text">#예뻐지는 시간</div>
      </div>
    </div>
    <Slide />
    <div class="contents-wrapper">
      <div
        class="content"
        v-for="index in 6"
        :key="index"
        :style="{ height: screen.width > 500 ? `238px` : `47.5vw` }"
      >
        <router-link :to="`/detail/${index}`" class="anchor">
          <img :src="require('@/assets/square.jpg')" class="img" alt=""
        >
        <span class="border"></span>
        </img></router-link>
      </div>
    </div>
    <div class="page-bar">
      <button
        class="pageButton"
        :class="index === 1 ? 'clicked' : 'not-clicked'"
        v-for="index in 5"
        :key="index"
      >
        <span class="text">{{ index }}</span>
      </button>
      <button class="pageButton">
        <span class="text" :style="{ fontWeight: 800 }">></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { useScreen } from 'vue-screen';
import Slide from '../components/Slide.vue';
export default Vue.extend({
  name: 'HomeView',
  data: () => ({
    screen: useScreen(),
  }),
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  components: {
    Slide,
  },
});
</script>

<style lang="scss" scoped>
#container-main {
  background-color: #f5f5f5;
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

.scroll-slide {
  overflow-x: hidden;
  width: 100%;
  height: 200px;
  margin: 30px 0;
  .scrolling-wrapper-flexbox {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    flex-direction: row;
    gap: 0 10px;
    transition: all 500ms ease;
    /* transform: translateX(-20px); */
    .card {
      flex: 0 0 auto;
      background-color: gray;
      width: 80%;
      height: 100%;
      border-radius: 20px;
      .img {
        width: 100%;
        height: 100%;
        background-color: black;
      }
    }
  }
}
.scroll-bar {
  width: 100%;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .scrollButton {
    width: 10px;
    height: 10px;
    border: none;
    border-radius: 10px;
  }
  .clicked {
    background-color: #5b5b5b;
  }
  .not-clicked {
    background-color: #aeaeae;
  }
}

.contents-wrapper {
  display: flex;
  flex-wrap: wrap;
    justify-content: space-evenly;

  margin-top: 30px;
  width: 100%;
  
  .content {
    $width: calc(50% - 5px);
    width: $width;
    display: flex;
    /* &:nth-child(even) {
      align-items: center;
      justify-content: flex-start;
    }
    &:nth-child(odd) {
      align-items: center;
      justify-content: flex-end;
    } */
    align-items: center;
    justify-content: center;
    .anchor {
      width: 93%;
      height: 93%;
      border-radius: 30px;
      /* border: 10px solid transparent; */
      &:hover{
        border:10px solid #FF3E9B;
      }
      border:10px solid transparent;

      .img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        transition: all 150ms ease;
        .border {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          position: absolute;
          border: 5px solid black;
        }
      }
    }
  }
}

.page-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 30px 0;
  .pageButton {
    padding: 10px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    .text {
      font-size: 15px;
      font-weight: 500;
      color: #5a5a5a;
    }
  }
  .clicked {
    border-bottom: 2px solid #feca1f;
  }
  .not-clicked {
    border-bottom: none;
  }
}
</style>
