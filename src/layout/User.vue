<template>
  <div>
    <div
      class="container"
      v-if="navigation"
      :style="{ position: 'fixed', zIndex: 500 }"
    >
      <nav
        :style="{
          width: screen.width > 500 ? '470px' : 'calc(100vw - 30px)',
        }"
      >
        <span></span>
        <button id="button" @click="setNavigation">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
      </nav>
      <div class="navigation-container">
        <router-link to="/" class="item">
          <span class="text">인기 이벤트</span>
          <font-awesome-icon icon="fa-solid fa-angle-right" class="icon" />
        </router-link>
        <router-link to="/" class="item">
          <span class="text">입점/제휴문의</span>
          <font-awesome-icon icon="fa-solid fa-angle-right" class="icon" />
        </router-link>
      </div>
    </div>
    <div class="container" id="top">
      <nav :style="{ width: $data.width }">
        <button id="button" @click="setNavigation">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
      </nav>
      <div :style="{ paddingTop: '80px' }">
        <slot />
      </div>
      <footer :style="{ paddingBottom: bottomPadding ? '230px' : '0px' }">
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
      <button @click="goUp" class="goUpButton">
        <font-awesome-icon icon="fa-solid fa-up-long" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { useScreen } from 'vue-screen';
export default Vue.extend({
  name: 'UserLayoutView',
  data() {
    return {
      screen: useScreen(),
      navigation: false,
      bottomPadding: false,
      width: '470px',
    };
  },
  methods: {
    setNavigation() {
      this.$data.navigation = !this.$data.navigation;
      if (!this.$data.navigation) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
    },
    goUp() {
      scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  created() {
    console.log(this);
  },
  watch: {
    $route(to, from) {
      if (to.name === 'home' || to.name === 'privacy') {
        if (this.bottomPadding) {
          this.bottomPadding = false;
        }
      } else {
        if (!this.bottomPadding) {
          this.bottomPadding = true;
        }
      }
    },
    'screen.width': function (width: number) {
      if (width > 499) {
        this.width = '470px';
      } else {
        this.width = 'calc(100% - 30px)';
      }
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  max-width: 500px;
  width: 100%;
  position: relative;
  .navigation-container {
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    padding-top: 80px;

    .item {
      padding: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #d8d8d8;
      background-color: white;
      text-decoration: none;
      .text {
        font-size: 25px;
        color: black;
        font-weight: 500;
      }
      .icon {
        font-size: 25px;
        color: #646464;
      }
    }
  }
}
nav {
  position: fixed;
  z-index: 100;
  /* background-color: #feca1f; */
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('@/assets/img/background.png');
  width: 640px;
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
.goUpButton {
  position: fixed;
  left: 30px;
  bottom: 20px;
  border: none;
  background-color: #aeaeae;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  opacity: 0.6;
  color: white;
  font-size: 15px;
  cursor: pointer;

  /* top: 20px; */
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
    background-color: #ededed;

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
</style>
