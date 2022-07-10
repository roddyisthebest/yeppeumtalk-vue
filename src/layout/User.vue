<template>
  <div>
    <div
      v-if="navigation"
      :style="{
        position: 'fixed',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000,
      }"
    >
      <div class="container">
        <nav
          :style="{
            backgroundColor: '#FECA1F',
            backgroundImage: 'url()',
            width: 'calc(100% - 30px)',
          }"
        >
          <img
            :src="require('@/assets/img/logo_transparent.png')"
            :style="{ width: '150px' }"
          />
          <button id="button" @click="setNavigation">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </nav>
        <div class="navigation-container">
          <button class="item" @click="goRoute('/')">
            <span class="text">인기 이벤트</span>
            <font-awesome-icon icon="fa-solid fa-angle-right" class="icon" />
          </button>
          <button class="item" @click="goRoute('')">
            <span class="text">입점/제휴문의</span>
            <font-awesome-icon icon="fa-solid fa-angle-right" class="icon" />
          </button>
        </div>
      </div>
    </div>

    <div class="container" id="top">
      <nav>
        <button id="button" @click="setNavigation">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
      </nav>
      <div :style="{ paddingTop: '80px', background: '#f5f5f5' }">
        <slot />
      </div>
      <footer :style="{ paddingBottom: bottomPadding ? '230px' : '0px' }">
        <div id="nav-bar">
          <router-link to="/privacy" class="button">
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
    goRoute(path: string) {
      if (this.$route.path !== path) {
        this.$router.push(`${path}`);
      }
      this.setNavigation();
    },
  },
  created() {
    if (this.$route.name === 'home' || this.$route.name === 'privacy') {
      if (this.bottomPadding) {
        this.bottomPadding = false;
      }
    } else {
      if (!this.bottomPadding) {
        this.bottomPadding = true;
      }
    }
  },
  watch: {
    $route(to) {
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
  },
});
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
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
      width: 100%;
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
  top: 0;
  /* background-color: #feca1f; */
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('@/assets/img/background.png');
  max-width: calc(500px - 30px);
  height: 80px;
  width: 100%;
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
