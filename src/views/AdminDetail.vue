<template>
  <div id="detail-container">
    <div id="titleWrapper">
      <span id="title">이벤트 idx:{{ $data.idx }}</span>
      <div id="buttonWrapper">
        <template v-if="!$data.edit">
          <button class="button">삭제</button>
          <button class="button" @click="setEdit">수정</button>
        </template>
        <template v-else>
          <button class="button" @click="submit">저장</button>
        </template>
      </div>
    </div>
    <template v-if="!$data.edit">
      <span class="sectionTitle">제목</span>
      <input type="text" class="input" v-model="$data.title" :disabled="true" />
      <span class="sectionTitle">썸네일 이미지</span>
      <input
        type="text"
        class="input"
        :disabled="true"
        :value="$data.thumbUrl"
      />
      <span class="sectionTitle">슬라이드 이미지</span>
      <input
        type="text"
        class="input"
        :disabled="true"
        :value="$data.slideUrl"
      />
      <span class="sectionTitle">게시물 이미지</span>
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
          v-if="Math.max(...pages) < totalPage + 1 && totalPage !== -1"
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
import { getEventByIdx, getApply, updateEvent } from '@/api/event';
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
        } = await getApply(this.$route.params.idx, val - 1, 1);
        this.applies = data.contents;
      } catch (e) {
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
      if (this.thumbUrl.includes('http')) {
        //
      }
      if (this.slideUrl.includes('http')) {
        //
      }
      if (this.contentUrl.includes('http')) {
        //
      }
      const formData = new FormData();
      formData.append('title', this.title);

      console.log(this.$data.thumbFile);
      console.log(this.$data.contentFile);
      console.log(this.$data.slideFile);
      formData.append('square', this.$data.thumbFile);
      formData.append('content', this.$data.contentFile);
      formData.append('slide', this.$data.slideFile);

      const { data } = await updateEvent(formData, this.$route.params.idx);
      console.log(data);
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
          1
        );
        this.applies = apply.contents;
        this.totalPage = apply.total_page;
        if (this.$data.totalPage > 5) {
          this.$data.pages = [1, 2, 3, 4, 5];
        } else {
          console.log(this.$data.totalPage);
          for (let i = 0; i < this.$data.totalPage + 1; i++) {
            this.$data.pages.push(i + 1);
          }
        }
        console.log(apply.total_page);
        if (apply.total_page === 0) {
          this.zero = false;
        }
      } catch (e: any) {
        alert(e.response.data.errorMessage);
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
          for (let i = now; i < (this.totalPage as number) + 2; i++) {
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
  },
  computed: {
    getPage() {
      return this.$store.getters.getUserPage;
    },
  },
});
</script>

<style scoped lang="scss">
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

      .button {
        width: 50px;
        height: 25px;
        background-color: #8c8c8c;
        color: white;
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
