<template>
  <div id="container-main">
    <div class="header-wrapper">
      <div class="header">
        <div class="text">#예뻐지는 시간</div>
      </div>
    </div>
    <div class="scroll-slide">
      <div
        class="scrolling-wrapper-flexbox"
        :style="{ transform: `translateX(${x}px)` }"
      >
        <router-link
          to="/"
          class="card"
          v-for="index in 6"
          :key="index"
        ></router-link>
      </div>
    </div>
    <div class="scroll-bar">
      <span
        v-for="index in 6"
        :key="index"
        class="scrollButton"
        :class="moving === index - 1 ? 'clicked' : 'not-clicked'"
        @click="setLocation(index - 1)"
      ></span>
    </div>
    <div class="contents-wrapper">
      <div
        class="content"
        v-for="index in 6"
        :key="index"
        :style="{ height: screen.width > 500 ? `250px` : `47.5vw` }"
      >
        <router-link to="" class="anchor"></router-link>
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

export default Vue.extend({
  name: 'HomeView',
  data: () => ({
    image: ['https://i.stack.imgur.com/nGzAB.png'],
    x: 50,
    screen: useScreen(),
    power: 410,
    moving: 0,
  }),
  methods: {
    setMove() {
      this.$data.x -= this.power;
    },
    setLocation(moving: number) {
      this.moving = moving;
      if (screen.width > 500) {
        this.$data.x = 50 - 410 * moving;
      } else {
        this.$data.x =
          (screen.width - screen.width * 0.8) / 2 -
          (screen.width * 0.8 + 10) * moving;
      }
    },
  },
  created() {
    if (screen.width < 500) {
      this.$data.x = (screen.width - screen.width * 0.8) / 2;
      this.power = screen.width * 0.8 + 10;
    }
    setInterval(() => {
      this.moving += 1;
      if (this.moving > 5) {
        if (screen.width < 500) {
          this.x = (screen.width - screen.width * 0.8) / 2;
        } else {
          this.x = 50;
        }
        this.moving = 0;
      } else {
        this.setMove();
      }
    }, 5000);
  },
  watch: {
    'screen.width': function (width: number) {
      if (width < 500) {
        this.$data.x = (screen.width - screen.width * 0.8) / 2;
        this.power = screen.width * 0.8 + 10;
        this.moving = 0;
      } else {
        this.$data.x = 40;
        this.power = 410;
        this.moving = 0;
      }
    },
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
  gap: 10px 10px;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
  .content {
    $width: calc(50% - 5px);
    width: $width;
    display: flex;
    align-items: center;
    justify-content: center;
    .anchor {
      width: 95%;
      height: 95%;
      background-color: black;
      border-radius: 20px;
      border: 1px solid black;
      &:hover {
        border: 5px solid #ff3e9b;
      }
      transition: all 300ms ease;
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
