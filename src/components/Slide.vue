<template>
  <div>
    <div class="scroll-slide" :style="{ height }">
      <div
        class="scrolling-wrapper-flexbox"
        :style="{ transform: `translateX(${x}px)` }"
      >
        <router-link
          :to="`/detail/${slide.idx}`"
          class="card"
          v-for="slide in slides"
          :key="slide.idx"
        >
          <VLazyImage
            :src-placeholder="require('@/assets/img/loadingHorizontal.png')"
            :src="slide.slideImageUri"
            class="img"
            alt=""
          />
        </router-link>
      </div>
    </div>
    <div class="scroll-bar">
      <span
        v-for="index in slides.length"
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
import { PropType } from 'vue/types/v3-component-props';
import { event } from '@/types/index';
import VLazyImage from 'v-lazy-image';

export default Vue.extend({
  name: 'SlideView',
  data() {
    return {
      x: 50,
      screen: useScreen(),
      power: 410,
      moving: 0,
      height: '177.5px',
    };
  },
  props: {
    slides: [] as PropType<event[]>,
  },
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
      this.height = '100%';
    } else {
      this.height = '177.5px';
    }
    setInterval(() => {
      this.moving += 1;
      if (this.moving >= this.slides.length) {
        if (screen.width < 500) {
          this.x = (screen.width - screen.width * 0.8) / 2;
        } else {
          this.x = 50;
        }
        this.moving = 0;
      } else {
        this.setMove();
      }
    }, 6800);
  },
  watch: {
    'screen.width': function (width: number) {
      if (width < 500) {
        this.$data.x = (screen.width - screen.width * 0.8) / 2;
        this.power = screen.width * 0.8 + 10;
        this.moving = 0;
        this.height = '100%';
      } else {
        this.$data.x = 40;
        this.power = 410;
        this.moving = 0;
        this.height = '177.5px';
      }
    },
  },
  components: {
    VLazyImage,
  },
});
</script>

<style scoped lang="scss">
.scroll-slide {
  overflow: hidden;
  width: 100%;
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
      width: 80%;
      height: 100%;
      border-radius: 20px;
      .img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
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
    cursor: pointer;
  }
  .clicked {
    background-color: #5b5b5b;
  }
  .not-clicked {
    background-color: #aeaeae;
  }
}
</style>
