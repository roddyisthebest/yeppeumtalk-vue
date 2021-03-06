<template>
  <div id="container">
    <div id="left">
      <div id="searchBarWrapper">
        <div id="searchBar">
          <input
            class="input"
            placeholder="이벤트 제목으로 검색해보세요."
            v-model="query"
          />
          <button id="button" @click="getData">
            <font-awesome-icon icon="fa-solid fa-search" />
          </button>
        </div>
        <button id="button" @click="$data.popup = true">생성</button>
      </div>
      <div id="itemWrapper">
        <div id="itemHeader">
          <span class="text zero">No</span>
          <span class="text one">제목</span>
          <span class="text two">생성날짜</span>
        </div>
        <template v-if="loading">
          <template v-if="events.length">
            <router-link
              :to="`/admin/detail/${event.idx}`"
              class="item"
              :class="event.idx === parseInt(idx) ? 'clicked' : 'not-clicked'"
              v-for="event in events"
              :key="event.idx"
            >
              <span class="text zero">{{ event.idx }}</span>
              <span class="text one">{{ event.title }}</span>
              <span class="text two">{{
                event.createdAt.replace('T', ' ')
              }}</span>
            </router-link>
          </template>
          <template v-else>
            <div id="loading-wrapper">
              <span>이벤트가 없습니다.</span>
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
      <div id="pageWrapper" v-if="events.length">
        <button
          class="button"
          v-if="Math.max(...pages) > 5"
          @click="movePage(false)"
        >
          <font-awesome-icon icon="fa-solid fa-caret-left" />
        </button>
        <button
          class="button"
          v-for="index in pages"
          :class="getPage === index ? 'clicked' : 'not-clicked'"
          :key="index"
          @click="setPage(index)"
        >
          {{ index }}
        </button>

        <button
          class="button"
          v-if="!pages.includes(totalPage)"
          @click="movePage(true)"
        >
          <font-awesome-icon icon="fa-solid fa-caret-right" />
        </button>
      </div>
    </div>
    <div id="block"></div>
    <div id="right">
      <router-view></router-view>
    </div>

    <div id="popup" v-if="popup">
      <div id="popup-container">
        <div id="buttonWrapper">
          <template v-if="!saveLoading">
            <button class="button notLoading" @click="submit">생성</button>
            <button class="button notLoading" @click="reset">취소</button>
          </template>
          <button class="button loading" v-else>생성중</button>
        </div>
        <span class="sectionTitle">제목</span>
        <input type="text" class="input" v-model="$data.title" />
        <span class="sectionTitle">썸네일 이미지</span>
        <div class="inputWrapper">
          <input
            type="text"
            class="input"
            :disabled="true"
            :value="$data.thumbUrl"
          />
          <input
            type="file"
            ref="thumb"
            style="display: none"
            name="thumb"
            @change="setFile"
            accept="image/*"
          />

          <button class="button" @click="$refs.thumb.click()">
            <font-awesome-icon icon="fa-solid fa-image" />
          </button>
        </div>
        <span class="sectionTitle">슬라이드 이미지</span>
        <div class="inputWrapper">
          <input
            type="text"
            class="input"
            :disabled="true"
            :value="$data.slideUrl"
          />
          <input
            type="file"
            ref="slide"
            style="display: none"
            name="slide"
            @change="setFile"
            accept="image/*"
          />
          <button class="button" @click="$refs.slide.click()">
            <font-awesome-icon icon="fa-solid fa-image" />
          </button>
        </div>
        <span class="sectionTitle">게시물 이미지</span>
        <div class="inputWrapper">
          <input
            type="text"
            class="input"
            :disabled="true"
            :value="$data.contentUrl"
          />
          <input
            type="file"
            ref="content"
            style="display: none"
            name="content"
            @change="setFile"
            accept="image/*"
          />
          <button class="button" @click="$refs.content.click()">
            <font-awesome-icon icon="fa-solid fa-image" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getEvents, saveEvent } from '@/api/event';
import { event } from '@/types/index';
import Loading from 'vue-loading-overlay';

export default Vue.extend({
  name: 'AdminView',
  data() {
    return {
      title: '',
      thumbFile: {},
      slideFile: {},
      contentFile: {},
      thumbUrl: '',
      slideUrl: '',
      contentUrl: '',
      popup: false,
      events: [] as event[],
      pages: [] as number[],
      totalPage: null as null | number,
      loading: false,
      idx: null as null | number,
      saveLoading: false,
      query: '',
      page: 1 as number,
    };
  },
  methods: {
    setFile(e: any) {
      if (e.target.files[0].size / 1000000 > 10) {
        alert('첨부한 파일의 사이즈가 10mb를 초과하였습니다.');
        return;
      }
      if (!e.target.files[0].type.includes('image')) {
        alert('첨부한 파일 타입이 옳바르지 않습니다.');
        return;
      }
      if (e.target.name === 'thumb') {
        this.$data.thumbFile = e.target.files[0];
        this.$data.thumbUrl = e.target.files[0].name;
      } else if (e.target.name === 'slide') {
        this.$data.slideFile = e.target.files[0];
        this.$data.slideUrl = e.target.files[0].name;
      } else {
        this.$data.contentFile = e.target.files[0];
        this.$data.contentUrl = e.target.files[0].name;
      }
    },
    reset() {
      this.$data.title = '';
      this.$data.thumbFile = {};
      this.$data.slideFile = {};
      this.$data.contentFile = {};
      this.$data.thumbUrl = '';
      this.$data.slideUrl = '';
      this.$data.contentUrl = '';
      this.$data.popup = false;
      this.$data.query = '';
    },
    setPage(page: number) {
      this.$data.page = page;
    },
    movePage(plus: boolean) {
      const future = this.$data.pages[this.$data.pages.length - 1] + 5;
      const now = this.$data.pages[this.$data.pages.length - 1];
      if (plus) {
        this.$data.page = now;
        if ((this.$data.totalPage as number) > future) {
          this.$data.pages = [];
          for (let i = now; i < future; i++) {
            this.$data.pages.push(i);
          }
        } else {
          this.$data.pages = [];
          for (let i = now; i < (this.$data.totalPage as number) + 1; i++) {
            this.$data.pages.push(i);
          }
        }
      } else {
        const first = this.$data.pages[0];
        this.$data.page = first;
        this.$data.pages = [];
        for (let i = first - 5; i < first; i++) {
          this.$data.pages.push(i + 1);
        }
      }
      this.$data.idx = null;
    },
    async submit() {
      const formData = new FormData();
      formData.append('title', this.$data.title);
      formData.append(`square`, this.$data.thumbFile);
      formData.append(`content`, this.$data.contentFile);
      formData.append(`slide`, this.$data.slideFile);
      this.$data.saveLoading = true;
      try {
        await saveEvent(formData);
      } catch (e: any) {
        if (e.response.status === 401 || e.response.status === 400) {
          alert('토큰이 만료되었습니다! 다시 로그인해주세요.');
          this.$router.push('/login');
          return;
        }
        alert(e.response.data.errorMessage);
      } finally {
        await this.getData();
        this.reset();
        alert('이벤트가 성공적으로 등록되었습니다.');
        this.$data.saveLoading = false;
        this.$data.popup = false;
      }
    },
    async getData(page: number) {
      this.$data.page = 1;
      try {
        this.$data.loading = false;
        const {
          data: { data },
        } = await getEvents(7, page - 1, this.$data.query);
        this.$data.events = data.contents;
        this.$data.totalPage = data.total_page + 1;
        this.$data.pages = [];

        if (this.$data.totalPage > 4) {
          this.$data.pages = [1, 2, 3, 4, 5];
        } else {
          for (let i = 0; i < this.$data.totalPage; i++) {
            this.$data.pages.push(i + 1);
          }
        }
        this.$data.loading = true;
      } catch (e) {
        alert('서버오류입니다. 관리자에게 연락주세요.');
      } finally {
        this.$router.push('/admin');
      }
    },
    // async search() {
    //   try {
    //     const { data } = await getEvents(7, 0, '');
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
  },
  async created() {
    this.$data.idx = this.$route.params.idx;
    try {
      const {
        data: { data },
      } = await getEvents(7, this.$data.page - 1, this.$data.query);
      this.$data.loading = true;
      this.$data.events = data.contents;
      this.$data.slides = data.contents;
      this.$data.totalPage = data.total_page + 1;

      if (this.$data.totalPage > 4) {
        this.$data.pages = [1, 2, 3, 4, 5];
      } else {
        for (let i = 0; i < this.$data.totalPage; i++) {
          this.$data.pages.push(i + 1);
        }
      }
    } catch (e) {
      alert('서버오류입니다. 관리자에게 연락주세요.');
    }
  },
  components: {
    Loading,
  },
  computed: {
    getPage() {
      return this.$data.page;
    },
    getUpdate() {
      return this.$store.getters.getUpdate;
    },
  },
  watch: {
    async getPage(val: number) {
      try {
        const {
          data: { data },
        } = await getEvents(7, val - 1, this.$data.query);
        this.$data.events = data.contents;
      } catch (e) {
        alert('서버오류입니다. 관리자에게 연락주세요.');
      }
    },
    $route(to) {
      this.$data.idx = to.params.idx;
      console.log(this.$data.idx);
    },
    async getUpdate(val: boolean) {
      if (val) {
        this.$data.page = 1;
        this.$store.commit('SET_UPDATE', false);
        this.reset();
        this.getData(1);
      }
    },
  },
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
  position: relative;
  #left {
    flex: 1;
    height: 85%;
    display: flex;
    flex-direction: column;
    gap: 20px 0;

    #searchBarWrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      #searchBar {
        height: 100%;
        width: calc(85% - 20px);
        border: 1px solid #d9d9d9;
        background-color: white;
        display: flex;
        align-items: center;
        padding-left: 20px;
        #button {
          background-color: #8c8c8c;
          color: white;
          font-size: 15px;
        }

        .input {
          width: 90%;
          font-size: 20px;
          outline: none;
          border: none;
        }
      }
      #button {
        height: 100%;
        width: 50px;
        color: white;
        background-color: #8c8c8c;
      }
    }

    #itemWrapper {
      display: flex;
      gap: 10px 0;
      flex-direction: column;
      flex: 50;
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
      .clicked {
        background-color: lightgray;
      }
      .not-clicked {
        background-color: transparent;
      }
      #loading-wrapper {
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
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

  #popup {
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.346);
    z-index: 100;

    #popup-container {
      height: calc(85% - 60px);
      border: 1px solid #d9d9d9;
      overflow-y: scroll;
      background-color: white;
      width: 440px;
      display: flex;
      gap: 18.5px 0;
      flex-direction: column;
      padding: 30px;
      .sectionTitle {
        font-size: 15px;
        display: inline-flex;
        font-weight: 400;
        color: black;
      }

      .input {
        border: 1px solid #cacaca;
        padding: 15px;
        outline: none;
        background-color: transparent;
      }
      .inputWrapper {
        display: flex;
        align-items: center;
        gap: 0 15px;
        height: 47.5px;
        .input {
          border: 1px solid #cacaca;
          padding: 15px;
          outline: none;
          background-color: transparent;
          width: 80%;
        }
        .button {
          border: 1px solid #cacaca;
          background-color: transparent;
          width: 47.5px;
          height: 100%;
        }
      }

      #buttonWrapper {
        display: flex;
        align-items: center;
        gap: 0 10px;
        justify-content: flex-end;
        .button {
          width: 50px;
          height: 25px;

          font-size: 10px;
          font-weight: 500;
        }
        .notLoading {
          background-color: #8c8c8c;
          color: white;
        }
        .loading {
          background-color: white;
          color: #8c8c8c;
        }
      }
    }
  }
}
</style>
