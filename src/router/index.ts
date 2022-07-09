import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
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

  {
    path: '/signup',
    name: 'signup',
    meta: { layout: 'Auth' },
    component: () => import('../views/Signup.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
