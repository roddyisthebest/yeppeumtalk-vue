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
      <template v-if="slides.length !== 0">
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
            <font-awesome-icon icon="fa-solid fa-caret-left" class="text" />
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
            <font-awesome-icon class="text" icon="fa-solid fa-caret-right" />
          </button>
        </div>
      </template>
      <template v-else>
        <div id="loading-wrapper" :style="{ height: '500px' }">
          <span id="text">등록된 이벤트가 없습니다.</span>
        </div>
      </template>
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
    height: '100%',
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
        console.log(this.totalPage);
        if ((this.totalPage as number) > future) {
          this.pages = [];
          for (let i = now; i < future; i++) {
            this.pages.push(i);
          }
        } else {
          this.pages = [];
          for (let i = now; i < (this.totalPage as number) + 1; i++) {
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
    console.log(this.screen.width);
    if (this.screen.width < 499) {
      this.height = '100%';
      this.contentHeight = 'calc(50% - 5px)';
      this.textSize = '10vw';
    } else {
      this.contentHeight = 'calc(50% - 5px)';
      this.textSize = '40px';
    }
    try {
      const {
        data: { data },
      } = await getEvents(4, this.$store.state.page.userEvent - 1, '');
      this.loading = true;
      this.events = data.contents;
      this.slides = data.contents;
      this.totalPage = data.total_page + 1;

      if (this.$store.state.page.userEvent !== 1) {
        const power = Math.floor(this.$store.state.page.userEvent / 5);
        if (power === 0) {
          for (let i = 1; i < 6; i++) {
            if (i < this.totalPage + 1) {
              this.pages.push(i);
            }
          }
          return;
        }
        var stand = 0;
        if (power > 1) {
          stand = power * 5 - 1;
        } else {
          stand = power * 5;
        }
        for (let i = stand; i < stand + 5; i++) {
          if (i > this.totalPage) {
            break;
          }

          this.pages.push(i);
        }
        return;
      }
      if (this.totalPage > 4) {
        this.pages = [1, 2, 3, 4, 5];
      } else {
        for (let i = 0; i < this.totalPage; i++) {
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
        this.contentHeight = 'calc(50% - 5px)';
        this.textSize = '10vw';
      } else {
        // this.height = '238px';
        this.contentHeight = 'calc(50% - 5px)';
        this.textSize = '40px';
      }
    },
    async getPage(val: number) {
      try {
        const {
          data: { data },
        } = await getEvents(4, val - 1, '');
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
  justify-content: space-between;
  gap: 10px 0;
  margin-top: 30px;
  width: 100%;
  padding: 0 40px;
  width: calc(100% - 80px);
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
      width: 100%;
      border-radius: 30px;
      /* border: 10px solid transparent; */
      &:hover {
        border: 10px solid #ff3e9b;
      }
      /* border: 10px solid transparent; */
      display: flex;
      align-items: center;
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

  #text {
    font-size: 25px;
    font-weight: 500;
    color: black;
  }
}
</style>
