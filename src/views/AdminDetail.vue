<template>
  <div id="detail-container">
    <div id="titleWrapper">
      <span id="title">이벤트 idx:{{ $data.idx }}</span>
      <div id="buttonWrapper">
        <template v-if="!$data.edit">
          <button class="button notLoading" @click="deleteEvent">삭제</button>
          <button class="button notLoading" @click="setEdit">수정</button>
        </template>
        <template v-else>
          <button class="button notLoading" @click="submit" v-if="!saveLoading">
            저장
          </button>
          <button class="button loading" v-else>저장중</button>
        </template>
      </div>
    </div>
    <template v-if="!$data.edit">
      <span class="sectionTitle">제목</span>
      <input type="text" class="input" v-model="$data.title" :disabled="true" />
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
      >
        <span class="sectionTitle">썸네일 이미지</span>
        <a :href="$data.thumbUrl" target="_blank">미리보기</a>
      </div>
      <input
        type="text"
        class="input"
        :disabled="true"
        :value="$data.thumbUrl"
      />

      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
      >
        <span class="sectionTitle">슬라이드 이미지</span>
        <a :href="$data.slideUrl" target="_blank">미리보기</a>
      </div>
      <input
        type="text"
        class="input"
        :disabled="true"
        :value="$data.slideUrl"
      />
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
      >
        <span class="sectionTitle">게시물 이미지</span>
        <a :href="$data.contentUrl" target="_blank">미리보기</a>
      </div>
      <input
        type="text"
        class="input"
        :disabled="true"
        :value="$data.contentUrl"
      />
      <span class="sectionTitle">신청자 정보</span>
      <div id="itemWrapper">
        <div id="itemHeader">
          <span class="text zero">No</span>
          <span class="text one">이름</span>
          <span class="text two">번호</span>
        </div>
        <div class="item" v-for="apply in applies" :key="apply.idx">
          <span class="text zero">{{ apply.idx }}</span>
          <span class="text one">{{ apply.name }}</span>
          <span class="text two">{{ apply.phone }}</span>
        </div>
      </div>
      <div id="pageWrapper">
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
          v-if="!pages.includes(totalPage) && totalPage !== 0"
          @click="movePage(true)"
        >
          <font-awesome-icon icon="fa-solid fa-caret-right" />
        </button>
      </div>
    </template>
    <template v-else>
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
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getEventByIdx, getApply, updateEvent, deleteEvent } from '@/api/event';
import { applicant } from '@/types';
export default Vue.extend({
  name: 'AdminDetailView',
  data() {
    return {
      idx: null as null | number,
      edit: false,
      title: '',
      thumbFile: {},
      slideFile: {},
      contentFile: {},
      thumbUrl: '',
      slideUrl: '',
      contentUrl: '',
      applies: [] as applicant[],
      totalPage: null as null | number,
      loading: false,
      pages: [] as number[],
      zero: false,
      saveLoading: false,
    };
  },
  async created() {
    this.$data.idx = this.$route.params.idx;
    await this.setData();

    this.$data.loading = true;
  },
  watch: {
    async $route() {
      this.$data.idx = this.$route.params.idx;
      await this.setData();
    },
    async getPage(val: number) {
      try {
        const {
          data: { data },
        } = await getApply(this.$route.params.idx, val - 1, 10);
        this.applies = data.contents;
      } catch (e: any) {
        if (e.response.status === 401 || e.response.status === 400) {
          alert('토큰이 만료되었습니다! 다시 로그인해주세요.');
          this.$router.push('/login');
          return;
        }
        alert('서버오류입니다. 관리자에게 연락주세요.');
      }
    },
  },
  methods: {
    setEdit() {
      this.$data.edit = !this.$data.edit;
    },
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
        this.thumbUrl = e.target.files[0].name;
      } else if (e.target.name === 'slide') {
        this.$data.slideFile = e.target.files[0];
        this.slideUrl = e.target.files[0].name;
      } else {
        this.$data.contentFile = e.target.files[0];
        this.contentUrl = e.target.files[0].name;
      }
    },
    async submit() {
      const formData = new FormData();
      this.saveLoading = true;
      if (this.thumbUrl.includes('http')) {
        console.log(this.thumbUrl);
        formData.append('square', await this.dataURItoBlob(this.thumbUrl));
      } else {
        formData.append('square', this.$data.thumbFile);
      }
      if (this.slideUrl.includes('http')) {
        formData.append('slide', await this.dataURItoBlob(this.slideUrl));
      } else {
        formData.append('slide', this.$data.slideFile);
      }
      if (this.contentUrl.includes('http')) {
        formData.append('content', await this.dataURItoBlob(this.contentUrl));
      } else {
        formData.append('content', this.$data.contentFile);
      }
      formData.append('title', this.$data.title);

      try {
        await updateEvent(formData, this.$route.params.idx);
        alert('이벤트 정보가 성공적으로 변경되었습니다.');
        await this.setData();
        this.setEdit();
      } catch (e: any) {
        if (e.response.status === 401 || e.response.status === 400) {
          alert('토큰이 만료되었습니다! 다시 로그인해주세요.');
          this.$router.push('/login');
          return;
        }
        alert('서버오류입니다. 관리자에게 연락주세요.');
      } finally {
        this.saveLoading = false;
      }
    },
    async deleteEvent() {
      try {
        if (window.confirm('정말 삭제하기를 원하십니까?')) {
          await deleteEvent(this.$route.params.idx);
          await this.$store.commit('SET_UPDATE', true);
          await this.$router.push('/admin');
        }
      } catch (e: any) {
        if (e.response.status === 401 || e.response.status === 400) {
          alert('토큰이 만료되었습니다! 다시 로그인해주세요.');
          this.$router.push('/login');
          return;
        }
        alert('서버오류입니다. 관리자에게 연락주세요.');
      }
    },
    async setData() {
      this.$data.pages = [];
      this.$store.commit('SET_PAGE', { type: 'user', page: 1 });

      try {
        const {
          data: { data: event },
        } = await getEventByIdx(this.$route.params.idx);
        this.title = event.title;
        this.thumbUrl = event.squareImageUri;
        this.slideUrl = event.slideImageUri;
        this.contentUrl = event.contentImageUri;

        const {
          data: { data: apply },
        } = await getApply(
          this.$route.params.idx,
          this.$store.state.page.user - 1,
          10
        );
        this.applies = apply.contents;
        this.totalPage = apply.total_page + 1;
        if (this.$data.totalPage > 5) {
          this.$data.pages = [1, 2, 3, 4, 5];
        } else {
          console.log(this.$data.totalPage);
          for (let i = 0; i < this.$data.totalPage; i++) {
            this.$data.pages.push(i + 1);
          }
        }
        console.log(apply.total_page);
        if (apply.total_page === 0) {
          this.zero = false;
        }
      } catch (e: any) {
        if (e.response.status === 401 || e.response.status === 400) {
          alert('토큰이 만료되었습니다! 다시 로그인해주세요.');
          this.$router.push('/login');
          return;
        }
        alert('서버오류입니다. 관리자에게 연락주세요.');
      }
    },
    movePage(plus: boolean) {
      const future = this.pages[this.pages.length - 1] + 5;
      const now = this.pages[this.pages.length - 1];

      if (plus) {
        this.$store.commit('SET_PAGE', { type: 'user', page: now });

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
        console.log(this.pages, this.totalPage);
      } else {
        const first = this.pages[0];
        this.$store.commit('SET_PAGE', { type: 'user', page: first });
        this.pages = [];
        for (let i = first - 5; i < first; i++) {
          this.pages.push(i + 1);
        }
      }
    },
    setPage(page: number) {
      this.$store.commit('SET_PAGE', { type: 'user', page });
    },
    async dataURItoBlob(url: any) {
      const response = await fetch(url);
      const data = await response.blob();
      const ext = 'png'; // url 구조에 맞게 수정할 것
      const filename = 'before'; // url 구조에 맞게 수정할 것
      const metadata = { type: `image/${ext}` };
      return new File([data], filename!, metadata);
    },
  },
  computed: {
    getPage() {
      return this.$store.getters.getUserPage;
    },
  },
});
</script>

<style scoped lang="scss">
a {
  color: blue;
}
#detail-container {
  flex: 1;
  display: flex;
  background-color: white;
  padding: 30px;
  flex-direction: column;
  gap: 18.5px 0;

  #titleWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid #d9d9d9;
    #title {
      font-size: 20px;
      font-weight: 500;
      color: black;
    }

    #buttonWrapper {
      display: flex;
      align-items: center;
      gap: 0 10px;
      .notLoading {
        background-color: #8c8c8c;
        color: white;
      }
      .loading {
        background-color: white;
        color: #8c8c8c;
      }
      .button {
        width: 50px;
        height: 25px;

        font-size: 10px;
        font-weight: 500;
      }
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

      .text {
        color: black;
        font-size: 10px;
        font-weight: 500;
        text-align: start;
      }
    }
  }
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

  .zero {
    flex: 0.5;
  }
  .one {
    flex: 1;
  }
  .two {
    flex: 2;
  }
}
</style>
