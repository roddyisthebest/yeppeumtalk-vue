<template>
  <div id="container-detail">
    <template v-if="!loading">
      <VLazyImage
        :src="data.contentImageUri"
        :src-placeholder="require('@/assets/img/loading.gif')"
        id="img-view"
        alt=""
      />
      <div class="header-wrapper">
        <div class="header">
          <div class="text" :style="{ fontSize: $data.textSize }">
            #예뻐지는 시간
          </div>
        </div>
      </div>
      <Slide :style="{ paddingBottom: '30px' }" :slides="slides"></Slide>
      <div id="inputWrapper">
        <input type="text" v-model="name" class="input" placeholder="이름" />
        <input type="text" v-model="phone" class="input" placeholder="연락처" />
        <div id="checkColumn">
          <input type="checkbox" name="color" v-model="clauseAgree" />
          <span id="text">개인정보 처리방침 동의</span>
          <router-link to="/privacy" id="check-button">상세보기</router-link>
        </div>
        <button id="button" @click="submit" :disabled="buttonLoading">
          이벤트 신청하기
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
import Slide from '../components/Slide.vue';
import { useScreen } from 'vue-screen';
import VLazyImage from 'v-lazy-image';
import { getEventByIdx, getEvents } from '@/api/event';
import { event } from '@/types/index';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { saveApply } from '@/api/event';

export default Vue.extend({
  name: 'DetailView',
  components: { Slide, VLazyImage, Loading },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    async submit() {
      var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
      try {
        this.buttonLoading = true;
        if (!this.clauseAgree) {
          alert(`개인정보 처리방침에 대해 동의하지 않았습니다.`);
          return;
        }
        if (this.name.length < 2) {
          alert('올바른 형식의 이름을 입력해주세요. (2글자 이상)');
          return;
        }
        if (!regPhone.test(this.phone)) {
          alert('올바른 형식의 전화번호를 입력해주세요.');
          return;
        }
        await saveApply(
          this.$route.params.idx,
          this.name,
          this.phone,
          this.clauseAgree
        );
        alert(`${this.name}님! 연락처 ${this.phone} 으로 신청 완료되었습니다.`);
      } catch (e) {
        alert('서버오류입니다. 관리자에게 연락주세요.');
      } finally {
        this.phone = '';
        this.name = '';
        this.clauseAgree = false;
        this.buttonLoading = false;
      }
    },
  },
  async created() {
    this.scrollToTop();
    try {
      const {
        data: { data: detail },
      } = await getEventByIdx(this.$route.params.idx);
      const {
        data: { data: slides },
      } = await getEvents(6, 0, '');
      this.data = detail;
      this.slides = slides.contents;
    } catch (e) {
      alert('서버오류입니다. 관리자에게 연락하세요.');
    } finally {
      this.loading = false;
    }
  },
  data() {
    return {
      textSize: '40px',
      screen: useScreen(),
      data: null as event | object | null,
      loading: true,
      slides: [] as event[],
      name: '',
      phone: '',
      clauseAgree: false,
      buttonLoading: false,
    };
  },
  watch: {
    'screen.width': function (width: number) {
      if (width < 499) {
        this.textSize = '10vw';
      } else {
        this.textSize = '40px';
      }
    },
    '$route.params.idx': async function () {
      this.scrollToTop();
      this.phone = '';
      this.name = '';
      this.clauseAgree = false;

      try {
        this.loading = true;
        const {
          data: { data: detail },
        } = await getEventByIdx(this.$route.params.idx);
        this.data = detail;
      } catch {
        alert('서버오류입니다. 관리자에게 연락하세요.');
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped lang="scss">
#container-detail {
  background-color: #f5f5f5;
  /* height: 500px; */
  padding-bottom: 40px;
  #img-view {
    width: 100%;
    height: 100%;
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
        padding: 0 5px;
        color: white;
        font-weight: 700;
      }
    }
  }
  #inputWrapper {
    position: fixed;
    bottom: 0;
    max-width: 450px;
    padding: 25px;
    width: calc(100% - 50px);
    height: 180px;
    background-color: #f7f7f7;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .input {
      width: calc(100% - 20px);
      padding: 10px;
      font-size: 15px;
      color: black;
      outline: none;
      border: 1px solid #bfbfbf;
    }
    #checkColumn {
      width: 100%;
      display: flex;
      gap: 0 8px;
      align-items: center;

      #text {
        font-size: 12px;
        font-weight: 400;
        color: #ab909f;
      }

      #check-button {
        width: 40px;
        height: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        font-size: 5px;
        background-color: black;
        color: white;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
      }
    }

    #button {
      width: 100%;
      padding: 10px;
      font-size: 15px;
      background-color: #f0097b;
      outline: none;
      color: white;
      font-weight: 600;
      border: 1px solid #f0097b;
    }
  }
  #loading-wrapper {
    height: 411px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
