<template>
  <div id="container">
    <div id="left">
      <div id="searchBarWrapper">
        <div id="searchBar">
          <input class="input" placeholder="이벤트 제목으로 검색해보세요." />
          <button id="button">
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
        <router-link
          :to="`/admin/detail/${index}`"
          class="item"
          v-for="index in 7"
          :key="index"
        >
          <span class="text zero">{{ index }}</span>
          <span class="text one">제목</span>
          <span class="text two">2022/01/24 12:01:20</span>
        </router-link>
      </div>
      <div id="pageWrapper">
        <button class="button clicked">1</button>
        <button class="button not-clicked">2</button>
        <button class="button not-clicked">3</button>
        <button class="button not-clicked">4</button>
        <button class="button not-clicked">5</button>
        <button class="button">></button>
      </div>
    </div>
    <div id="block"></div>
    <div id="right">
      <router-view></router-view>
    </div>

    <div id="popup" v-if="popup">
      <div id="popup-container">
        <div id="buttonWrapper">
          <button class="button">생성</button>
          <button class="button" @click="reset">취소</button>
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
        this.thumbUrl = e.target.files[0].name;
      } else if (e.target.name === 'slide') {
        this.$data.slideFile = e.target.files[0];
        this.slideUrl = e.target.files[0].name;
      } else {
        this.$data.contentFile = e.target.files[0];
        this.contentUrl = e.target.files[0].name;
      }
    },
    reset() {
      this.title = '';
      this.thumbFile = {};
      this.slideFile = {};
      this.contentFile = {};
      this.thumbUrl = '';
      this.slideUrl = '';
      this.contentUrl = '';
      this.popup = false;
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
          background-color: #8c8c8c;
          color: white;
          font-size: 10px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
