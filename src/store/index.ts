import Vue from 'vue';
import Vuex from 'vuex';
import { user, page } from '@/types/index';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
export interface State {
  user: user;
  page: page;
  update: boolean;
  link: string;
}
export default new Vuex.Store({
  state() {
    return {
      user: {
        accessToken: null,
      },
      page: {
        userEvent: 1,
        adminEvent: 1,
        user: 1,
      },
      update: false,
      link: '',
    };
  },
  getters: {
    getUserEventPage(state: State) {
      return state.page.userEvent;
    },
    getAdminEventPage(state: State) {
      return state.page.adminEvent;
    },
    getUserPage(state: State) {
      return state.page.user;
    },
    getUpdate(state: State) {
      return state.update;
    },
  },
  mutations: {
    SET_PAGE(
      state: State,
      payload: { type: 'userEvent' | 'adminEvent' | 'user'; page: number }
    ) {
      state.page[payload.type] = payload.page;
    },
    SET_TOKEN(state: State, accessToken: string) {
      state.user.accessToken = accessToken;
    },
    SET_UPDATE(state: State, update: boolean) {
      state.update = update;
    },
    SET_LINK(state: State, link: string) {
      state.link = link;
    },
  },

  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
