import Vue from 'vue';
import Router from 'vue-router';
import appRouter from './appRouter/appRouter';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/components/layout/Index'),
      redirect: '/home',
      children: appRouter,
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
});
