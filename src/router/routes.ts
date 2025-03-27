import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'users' },
    children: [
      {
        path: 'users',
        component: () => import('layouts/BaseLayout.vue'),
        children: [
          {
            path: '',
            name: 'users',
            meta: {
              title: 'users',
            },
            component: () => import('pages/UsersPage.vue'),
          },
          {
            path: ':userId',
            component: () => import('layouts/BaseLayout.vue'),
            children: [
              {
                path: 'todos',
                name: 'todos',
                meta: {
                  title: 'todos',
                },
                component: () => import('pages/TodosPage.vue'),
              },
              {
                path: 'posts',
                name: 'posts',
                meta: {
                  title: 'posts',
                },
                component: () => import('pages/PostsPage.vue'),
              },
              {
                path: 'albums',
                name: 'albums',
                meta: {
                  title: 'albums',
                },
                component: () => import('pages/AlbumsPage.vue'),
              },
            ],
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
