<template>
  <div id="admin-container">
    <div id="left">
      <div id="headerWrapper">
        <span id="header">관리자 페이지</span>
      </div>
      <div id="navigationWrapper">
        <router-link to="/admin/" class="button">
          <font-awesome-icon
            icon="fa-solid fa-caret-right"
            :style="{
              fontSize: '20px',
              color:
                getRoute === 'admin' || getRoute === 'detail'
                  ? 'black'
                  : '#D9D9D9',
            }"
          />
          <span
            class="text"
            :style="{
              color:
                getRoute === 'admin' || getRoute === 'detail'
                  ? 'black'
                  : '#D9D9D9',
            }"
            >이벤트</span
          >
        </router-link>
        <router-link to="/admin/link" class="button">
          <font-awesome-icon
            icon="fa-solid fa-caret-right"
            :style="{
              fontSize: '20px',
              color: getRoute === 'admin-link' ? 'black' : '#D9D9D9',
            }"
          />
          <span
            class="text"
            :style="{
              color: getRoute === 'admin-link' ? 'black' : '#D9D9D9',
            }"
            >제휴문의 수정</span
          >
        </router-link>
      </div>
    </div>
    <div id="right">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AdminLayoutView',
  computed: {
    getRoute() {
      return this.$route.name;
    },
  },
  //   watch: {
  //     $route(to) {
  //         return
  //     },
  //   },
});
</script>

<style scoped lang="scss">
#admin-container {
  height: 100vh;
  width: 100%;
  display: flex;
  #left {
    flex: 1;
    background-color: white;
    padding: 50px 0 0 70px;
    #headerWrapper {
      display: flex;
      #header {
        font-size: 30px;
        font-weight: 500;
        color: #989898;
        text-align: center;
      }
    }

    #navigationWrapper {
      display: flex;
      gap: 15px 0;
      flex-direction: column;
      margin-top: 50px;
      .button {
        display: flex;
        align-items: center;
        gap: 0 10px;
        border: none;
        outline: none;
        background-color: transparent;
        text-decoration: none;
        cursor: pointer;
        .text {
          font-size: 17px;
          font-weight: 600;
        }
      }
    }
  }
  #right {
    flex: 3;
    background-color: #f8f8f8;
  }
}
</style>
