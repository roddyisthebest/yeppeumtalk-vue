import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { layout: 'User' },
  },
  {
    path: '/detail/:idx',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    meta: { layout: 'User' },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/Privacy.vue'),
    meta: { layout: 'User' },
  },

  {
    path: '/admin/',
    name: 'admin',
    meta: { layout: 'Admin' },
    children: [
      {
        name: 'detail',
        path: 'detail/:idx',
        meta: { layout: 'Admin' },
        component: () => import('../views/AdminDetail.vue'),
      },
    ],
    component: () => import('../views/Admin.vue'),
  },
  {
    path: '/admin/link',
    name: 'admin-link',
    meta: { layout: 'Admin' },
    component: () => import('../views/Link.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'Auth' },
    component: () => import('../views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = store.state.user.accessToken;

  if ((to.meta?.layout as string) === 'Admin') {
    if (accessToken) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
  // next();
  // if ((to.meta?.layout as string) === 'admin' && accessToken) {
  //   next();
  // } else {
  //   next('/login');
  // }
});

export default router;
