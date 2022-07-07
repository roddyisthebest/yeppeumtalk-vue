<template>
  <div>
    <div class="wrapper">
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
    <div class="scrollBar">
      <span
        v-for="index in 6"
        :key="index"
        class="scrollButton"
        :class="moving === index - 1 ? 'clicked' : 'not-clicked'"
        @click="setLocation(index - 1)"
      ></span>
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
    power: 420,
    moving: 0,
  }),
  methods: {
    setMove() {
      this.$data.x -= this.power;
    },
    setLocation(moving: number) {
      this.moving = moving;
      if (screen.width > 500) {
        this.$data.x = 50 - 420 * moving;
      } else {
        this.$data.x =
          (screen.width - screen.width * 0.8) / 2 -
          (screen.width * 0.8 + 20) * moving;
      }
    },
  },
  created() {
    if (screen.width < 500) {
      this.$data.x = (screen.width - screen.width * 0.8) / 2;
      this.power = screen.width * 0.8 + 20;
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
        this.power = screen.width * 0.8 + 20;
        this.moving = 0;
      } else {
        this.$data.x = 50;
        this.power = 420;
        this.moving = 0;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-x: hidden;
  width: 100%;
  height: 200px;
  margin: 20px 0;
  .scrolling-wrapper-flexbox {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    flex-direction: row;
    gap: 0 20px;
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
.scrollBar {
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
</style>
