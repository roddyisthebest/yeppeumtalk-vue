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
          <button class="button" @click="setEdit">저장</button>
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
        <div
          :to="`/admin/detail/${index}`"
          class="item"
          v-for="index in 7"
          :key="index"
        >
          <span class="text zero">{{ index }}</span>
          <span class="text one">제목</span>
          <span class="text two">01051529445</span>
        </div>
      </div>
      <div id="pageWrapper">
        <button class="button clicked">1</button>
        <button class="button not-clicked">2</button>
        <button class="button not-clicked">3</button>
        <button class="button not-clicked">4</button>
        <button class="button not-clicked">5</button>
        <button class="button">></button>
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
    };
  },
  created() {
    this.$data.idx = this.$route.params.idx;
  },
  watch: {
    $route() {
      this.$data.idx = this.$route.params.idx;
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
  overflow-y: scroll;
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
