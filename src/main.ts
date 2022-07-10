import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyload from 'vue-lazyload';
// import { VLazyImagePlugin } from 'v-lazy-image';

// Vue.use(VLazyImagePlugin);
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret,
  faBars,
  faXmark,
  faAngleRight,
  faUpLong,
  faCaretRight,
  faSearch,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/* add icons to the library */
library.add(
  faUserSecret,
  faBars,
  faXmark,
  faAngleRight,
  faUpLong,
  faCaretRight,
  faSearch,
  faImage
);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadimage = require('@/assets/img/loading.gif');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const errorimage = require('@/assets/img/error.png');
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
});
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
