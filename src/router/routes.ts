import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'Home',
      },
      {
        path: 'perfil/',
        component: () => import('pages/profile/views/ProfileView.vue'),
        name: 'Configuraciones de la cuenta',
      },
      {
        path: 'asistencia/',
        component: () => import('pages/asistencia/views/AsistenciaView.vue'),
        name: 'Asistencia',
      },
      {
        path: 'horario/',
        component: () => import('pages/horario/views/HorarioView.vue'),
        name: 'Horario',
      }
    ],
  },
  {
    path: '/login',
    component: () => import('pages/autenticacion/views/LoginView.vue'),
    name: 'login',
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
