import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'perfil/',
        component: () => import('pages/profile/views/ProfileView.vue')
      },
      {
        path: 'asistencia/',
        component: () => import('pages/asistencia/views/AsistenciaView.vue')
      }
    ],
  },
  {
    path: '/login',
    component: () => import('pages/autenticacion/views/LoginView.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
