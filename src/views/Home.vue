<template>
  <div id="container-main">
    <div class="header-wrapper">
      <div class="header">
        <div class="text" :style="{ fontSize: $data.textSize }">
          #예뻐지는 시간
        </div>
      </div>
    </div>
    <template v-if="loading">
      <Slide :slides="slides" />

      <div class="contents-wrapper">
        <div
          class="content"
          v-for="event in events"
          :key="event.idx"
          :style="{ height, width: $data.contentHeight }"
        >
          <router-link :to="`/detail/${event.idx}`" class="anchor">
            <VLazyImage
              :src="event.squareImageUri"
              :src-placeholder="require('@/assets/img/loading.gif')"
              class="img"
              alt=""
            />
          </router-link>
        </div>
      </div>
      <div class="page-bar">
        <button
          class="pageButton"
          v-if="Math.max(...pages) > 5"
          @click="movePage(false)"
        >
          <span class="text" :style="{ fontWeight: 800 }"> ></span>
        </button>
        <button
          class="pageButton"
          :class="getPage === index ? 'clicked' : 'not-clicked'"
          v-for="index in pages"
          :key="index"
          @click="setPage(index)"
        >
          <span class="text">{{ index }}</span>
        </button>
        <button
          class="pageButton"
          v-if="!pages.includes(totalPage)"
          @click="movePage(true)"
        >
          <span class="text" :style="{ fontWeight: 800 }">></span>
        </button>
      </div>
    </template>
    <template v-else>
      <div id="loading-wrapper">
        <Loading
          :can-cancel="true"
          :is-full-page="false"
          :style="{ display: 'flex' }"
          :opacity="0"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { useScreen } from 'vue-screen';
import Slide from '../components/Slide.vue';
import { getEvents } from '@/api/event';
import { event } from '@/types/index';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VLazyImage from 'v-lazy-image';

export default Vue.extend({
  name: 'HomeView',
  data: () => ({
    screen: useScreen(),
    height: '238px',
    contentHeight: 'calc(50% - 5px)',
    textSize: '40px',
    totalPage: null as null | number,
    events: [] as event[],
    slides: [] as event[],
    pages: [] as number[],
    eventLoading: false,
    loading: false,
  }),
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    movePage(plus: boolean) {
      const future = this.pages[this.pages.length - 1] + 5;
      const now = this.pages[this.pages.length - 1];

      if (plus) {
        this.$store.commit('SET_PAGE', { type: 'userEvent', page: now });

        if ((this.totalPage as number) > future) {
          this.pages = [];
          for (let i = now; i < future + 1; i++) {
            this.pages.push(i);
          }
        } else {
          this.pages = [];
          for (let i = now; i <= (this.totalPage as number) + 1; i++) {
            this.pages.push(i);
          }
        }
      } else {
        const first = this.pages[0];
        this.$store.commit('SET_PAGE', { type: 'userEvent', page: first });
        this.pages = [];
        for (let i = first - 5; i < first; i++) {
          this.pages.push(i + 1);
        }
      }
    },
    setPage(page: number) {
      this.$store.commit('SET_PAGE', { type: 'userEvent', page });
    },
  },
  components: {
    Slide,
    Loading,
    VLazyImage,
  },
  async created() {
    if (this.screen.width < 499) {
      this.height = '100%';
      this.contentHeight = '100%';
      this.textSize = '10vw';
    } else {
      this.height = '238px';
      this.contentHeight = 'calc(50% - 5px)';
      this.textSize = '40px';
    }
    try {
      const {
        data: { data },
      } = await getEvents(6, this.$store.state.page.userEvent - 1, '');
      this.loading = true;
      this.events = data.contents;
      this.slides = data.contents;
      this.totalPage = data.total_page;

      if (this.totalPage > 5) {
        this.pages = [1, 2, 3, 4, 5];
      } else {
        for (let i = 0; i < this.totalPage + 1; i++) {
          this.pages.push(i + 1);
        }
      }
    } catch (e) {
      alert('서버오류입니다. 관리자에게 연락주세요.');
    }
  },
  computed: {
    getPage() {
      return this.$store.getters.getUserEventPage;
    },
  },
  watch: {
    'screen.width': function (width: number) {
      if (width < 499) {
        this.height = '100%';
        this.contentHeight = '100%';
        this.textSize = '10vw';
      } else {
        this.height = '238px';
        this.contentHeight = 'calc(50% - 5px)';
        this.textSize = '40px';
      }
    },
    async getPage(val: number) {
      try {
        const {
          data: { data },
        } = await getEvents(6, val - 1, '');
        this.events = data.contents;
      } catch (e) {
        alert('서버오류입니다. 관리자에게 연락주세요.');
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
  justify-content: space-evenly;

  margin-top: 30px;
  width: 100%;

  .content {
    /* $width: calc(50% - 5px); */
    /* width: $width; */
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
      &:hover {
        border: 10px solid #ff3e9b;
      }
      border: 10px solid transparent;

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
  width: 100%;
  flex-wrap: wrap;
  .pageButton {
    /* padding: 10px; */
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding-bottom: 5px;
    .text {
      font-size: 15px;
      font-weight: 500;
      color: #5a5a5a;
    }
    border-bottom: 2px solid transparent;
  }
  .clicked {
    border-color: #feca1f;
  }
  .not-clicked {
    border-color: transparent;
  }
}

#loading-wrapper {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
