import { defineStore } from 'pinia';

export const useConfigUserStore = defineStore('config-user', {
  state: () => ({
    menu: new Array<any>(),
    permisos: new Array<string>(),
    rol: '',
    perfil: new Array<string>(),
  }),
  getters: {
    getRol: (state) => state.rol,
    getPerfil: (state) => state.perfil,
    getMenu: (state) => state.menu,
    getPermisos: (state) => [...state.permisos],
    getFullPermisos: (state) => [...state.permisos, ...state.perfil, ...state.menu],
  },
  actions: {
    resetPermisos() {
      this.rol = '';
      this.permisos = [];
      this.perfil = [];
      this.menu = [];
    },
    updatePermisos(permisos: Array<string>) {
      this.permisos = [...permisos];
    },
    updateRole(rol: string) {
      this.rol = rol;
    },
    updateProfile(perfil: Array<string>) {
      this.perfil = perfil;
    },
    updateMenu(menu: Array<any>) {
      this.menu = [...menu];
    },
  },
});
