<template>
  <q-layout view="lHr Lpr lff">
    <q-header :class="Dark.isActive ? 'text-white bg-dark' : 'background-toolbar'" style="z-index: 100;">
      <q-toolbar style="padding: 10px 25px">
        <!-- class="text-white toolbar1" -->
        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" /> -->

        <q-toolbar-title class="row justify-start item-center">
          <q-icon color="secondary" name="mdi-database-outline" size="md" />Registro de Materias
        </q-toolbar-title>
        <!-- <q-btn flat size="sm" round :icon="iconTheme" @click="changeTheme()"></q-btn> -->
        <q-btn flat round icon="mdi-cog">
          <q-menu fit @update:model-value="limpiarColores">
            <div class="row no-wrap q-pa-md">
              <div class="column" style="width: 200px">
                <div class="text-h6">Configuraciones</div>
                <q-separator class="q-mb-md" />
                <!-- <q-toggle v-model="themeDark" label="Tema Dark" /> -->
                <!-- <q-toggle v-model="miniSidebar" label="Mini Sidebar" /> -->
                <div class="q-gutter-sm">
                  <q-btn round class="toolbar1" icon="colorize">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color v-model="primaryColor" @update:model-value="changeColorBarra(primaryColor, 1)" />
                      <!--   @update:model-value="changeColorBarra(primaryColor, 1)" -->
                    </q-popup-proxy>
                  </q-btn>
                  <q-btn round class="toolbar2" icon="colorize">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color v-model="secondaryColor" @update:model-value="changeColorBarra(secondaryColor, 2)" />
                      <!-- @update:model-value="changeColorBarra(secondaryColor, 2)"  -->
                    </q-popup-proxy>
                  </q-btn>
                  <q-btn color="primary" no-caps label="Guardar Cambios" size="small" v-close-popup
                    @click="resetSaveColor(false)" />
                  <q-btn push color="primary" round icon="mdi-restore" v-close-popup @click="resetSaveColor(true)">
                    <q-tooltip transition-show="scale" transition-hide="scale">
                      Resetear Colores
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>

              <q-separator vertical class="q-mx-md" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <!-- <q-icon name="mdi-account-circle" color="grey" size="72px" />-->

                  <img src="https://drive.google.com/uc?export=download&id=1ticnzRbZ1dnKkAmiNFzF-YFc-0DRLEAk" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-sm q-mb-xs">
                  {{ usuario }}
                </div>

                <q-btn color="primary" no-caps label="Logout" size="small" v-close-popup @click="logout" />
                <!--  @click="logout" -->
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above :breakpoint="1160" bordered :width="250"
      :mini="!leftDrawerOpen || miniState" @click.capture="drawerClick" :mini-width="70">
      <!--mini-to-overlay @mouseover="miniState = false" @mouseout="miniState = true" -->
      <q-scroll-area class="fit" :class="Dark.isActive ? '' : miniState ? 'bg-dark text-white' : 'bg-drawer'">

        <q-list>
          <q-item-label class="text-weight-medium text-subtitle1 q-px-md q-py-sm">
            <q-avatar size="46px" class="cursor-pointer" @click="$router.push('/perfil')">
              <!-- <q-icon name="mdi-account-circle" color="" size="30px" /> -->
              <img src="https://drive.google.com/uc?export=download&id=1ticnzRbZ1dnKkAmiNFzF-YFc-0DRLEAk" />
              <q-badge color="positive" floating
                style="border:1px solid #fff; border-radius: 50%; position: absolute; z-index: 100; top: 30px;"></q-badge>
            </q-avatar>
            <span class="q-ml-md">{{ usuario }}</span>
          </q-item-label>
          <q-separator class="q-mb-sm" />
          <MenuLink v-for="link in itemsMenu" :key="link.title" v-bind="link" :dense="false" :separator="false"
            :mini-state="miniState" />
        </q-list>
        <div class="text-center toggle-theme">
          <q-separator />
          <div class="text-center q-pt-sm">
            <!-- <q-btn dense unelevated :icon="Dark.mode ? 'dark_mode' : 'light_mode'" @click="Dark.toggle()" /> -->
            <q-toggle dense v-model="modeState" color="secondary" keep-color size="xl"
              :icon="Dark.mode ? 'dark_mode' : 'light_mode'" @click="Dark.toggle()" />
            <!-- <q-btn unelevated icon="light_mode" @click="Dark.set(false)" /> -->
            <!-- <q-btn unelevated icon="dark_mode" @click="Dark.set(true)" /> -->
          </div>
        </div>
      </q-scroll-area>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn dense round unelevated class="btn-drawer-background" icon="chevron_left" @click="miniState = true" />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<!-- @click="$router.push('/ruta-de-destino')" -->
<script setup lang="ts">
import { useRouter, useRoute, } from 'vue-router';
import { ref, watch, onMounted, onUpdated } from 'vue';
import { Dark } from 'quasar';
import MenuLink from '@/components/MenuLink.vue';
import { useConfigUserStore } from '@stores/config-user';
import { Loading, setCssVar } from 'quasar';

/****************************************************************************/
/*                               VARIABLES                                  */
/****************************************************************************/
// store
const storex = useConfigUserStore();
// router
const router = useRouter();
// colors
const primaryColor = ref()
const secondaryColor = ref()
const primaryColorAux = ref('--primary')
const secondaryColorAux = ref('--secondary')
// dark theme
const modeState = ref<boolean>(false)
//drawer
const leftDrawerOpen = ref(false)
const miniState = ref(false)
// data for page
const itemsMenu = ref([
  {
    idModuleAuth: "e5928a89-8221-4ff7-a8d1-099174454fb4",
    title: "Actas",
    level: 1,
    code: "gpr-act",
    icon: "mdi-view-dashboard-outline",
    link: "",
    sequence: 1,
    color: "#83cae2",
    parentId: "fdf1023a-a8ab-438b-b005-f24bd2a04275",
    children: [
      {
        idModuleAuth: "1b522f99-afc1-4959-85bd-a4884a70286b",
        title: "Home",
        level: 2,
        code: "gpr-act-dash",
        icon: "mdi-view-dashboard",
        link: "/",
        sequence: 1,
        parentId: "e5928a89-8221-4ff7-a8d1-099174454fb4",
        children: []
      },
      {
        idModuleAuth: "b2f84ac7-44ee-4d76-8ad1-dbf78aba5e1f",
        title: "Asistencia",
        level: 2,
        code: "gpr-act-act_reu",
        icon: "mdi-book-open-variant",
        link: "/asistencia",
        sequence: 2,
        parentId: "e5928a89-8221-4ff7-a8d1-099174454fb4",
        children: []
      },
      {
        idModuleAuth: "46f883ba-ddf2-44c6-bf0c-07ef52524d0f",
        title: "Matriz Aac",
        level: 2,
        code: "gpr-act-mat_aac",
        icon: "mdi-folder-table",
        link: "/actas/matriz-aac",
        sequence: 4,
        parentId: "e5928a89-8221-4ff7-a8d1-099174454fb4",
        children: []
      },
      {
        idModuleAuth: "02ceb800-0060-4614-ba92-880b64a0ea76",
        title: "Mis actas",
        level: 2,
        code: "gpr-act-mis_actas",
        icon: "mdi-folder-table",
        link: "/actas/mis-actas",
        sequence: 5,
        parentId: "e5928a89-8221-4ff7-a8d1-099174454fb4",
        children: []
      }
    ]
  },
  {
    idModuleAuth: "9fe60d67-6888-4bb2-a847-00a54589aef2",
    title: "Iniciativas",
    level: 1,
    code: "gpr-inic",
    icon: "mdi-lightbulb-on-outline",
    link: "",
    sequence: 2,
    color: "#e4ad71",
    parentId: "fdf1023a-a8ab-438b-b005-f24bd2a04275",
    children: [
      {
        idModuleAuth: "320063da-722a-4433-978a-0e225b8bcc15",
        title: "Crear meta",
        level: 2,
        code: "gpr-inic-cre_inic",
        icon: "mdi-lightbulb-on",
        link: "/iniciativa/registro",
        sequence: 1,
        parentId: "9fe60d67-6888-4bb2-a847-00a54589aef2",
        children: []
      },
      {
        idModuleAuth: "2f760ae8-9e42-4927-9c70-683953b8dd4f",
        title: "Matriz de seguimiento",
        level: 2,
        code: "gpr-inic-mat_seg",
        icon: "mdi-align-horizontal-left",
        link: "/iniciativa/matriz-seguimiento",
        sequence: 2,
        parentId: "9fe60d67-6888-4bb2-a847-00a54589aef2",
        children: []
      },
      {
        idModuleAuth: "6f29d154-c7d6-43d7-a476-e9b70248d98e",
        title: "Mis metas e iniciativas",
        level: 2,
        code: "gpr-inic-mis_inic",
        icon: "mdi-align-horizontal-left",
        link: "/iniciativa/mis-iniciativas",
        sequence: 3,
        parentId: "9fe60d67-6888-4bb2-a847-00a54589aef2",
        children: []
      }
    ]
  },
  {
    idModuleAuth: "9d71af57-6913-4e39-90fb-b32ec7a9c1fd",
    title: "Okr",
    level: 1,
    code: "gpr-okr",
    icon: "mdi-circle-edit-outline",
    link: "",
    sequence: 3,
    color: "#9577d3",
    parentId: "fdf1023a-a8ab-438b-b005-f24bd2a04275",
    children: [
      {
        idModuleAuth: "4ca45ca9-02fa-4469-a8b0-fcc6928ea496",
        title: "Dashboard",
        level: 2,
        code: "gpr-okr-dash",
        icon: "mdi-lightbulb-on",
        link: "/okr/dashboard",
        sequence: 1,
        parentId: "9d71af57-6913-4e39-90fb-b32ec7a9c1fd",
        children: []
      },
      {
        idModuleAuth: "4c33cb43-3059-4fa5-a392-b5e32f52a65d",
        title: "Crear Okr",
        level: 2,
        code: "gpr-okr-cre_okr",
        icon: "mdi-circle-edit-outline",
        link: "/okr/metodologia-okr",
        sequence: 2,
        parentId: "9d71af57-6913-4e39-90fb-b32ec7a9c1fd",
        children: []
      },
      {
        idModuleAuth: "3273d7f0-f76e-4863-8a94-d4224c194bba",
        title: "Matriz de seguimiento",
        level: 2,
        code: "gpr-okr-mat_seg",
        icon: "mdi-bulletin-board",
        link: "/okr/matriz-seguimiento",
        sequence: 3,
        parentId: "9d71af57-6913-4e39-90fb-b32ec7a9c1fd",
        children: []
      },
      {
        idModuleAuth: "fc70c86c-8de0-41fc-b193-4e00f09ae7e9",
        title: "Okrs",
        level: 2,
        code: "gpr-okr-okrs",
        icon: "mdi-bulletin-board",
        link: "/okr/matriz",
        sequence: 4,
        parentId: "9d71af57-6913-4e39-90fb-b32ec7a9c1fd",
        children: []
      }
    ]
  },
  {
    idModuleAuth: "c59e56a5-b32d-4399-8bc9-434217477a12",
    title: "Permisos",
    level: 1,
    code: "gpr-perm",
    icon: "mdi-account-group-outline",
    link: "",
    sequence: 4,
    color: "#f8729b",
    parentId: "fdf1023a-a8ab-438b-b005-f24bd2a04275",
    children: [
      {
        idModuleAuth: "3dbe47b4-d36e-413f-af5e-f24bd42d6e6e",
        title: "Permisos por usuario",
        level: 2,
        code: "gpr-perm-usuario",
        icon: "mdi-account-group",
        link: "/permiso/usuarios",
        sequence: 1,
        parentId: "c59e56a5-b32d-4399-8bc9-434217477a12",
        children: []
      }
    ]
  }
])
const usuario = ref('Miguel');

/****************************************************************************/
/*                              METHODS                                     */
/****************************************************************************/
// FUNCION PARA EL COMPONENTE MINIDRAWER
const drawerClick = (e: any) => {
  if (miniState.value) {
    miniState.value = false
    e.stopPropagation()
  }
}
// configuracion y permisos de usuario
const getConfigUser = async (loadColor: boolean) => {
  console.log('Cargando Permisos y Colores Goblales');
  // PETICION
  const data = {
    config: {
      sidebarColor: '#495a69',
      themeColor: '#aadadf',
    }
  }
  document.body.style.setProperty('--primary', data.config.sidebarColor)
  // setCssVar('primary', data.config.sidebarColor)
  document.body.style.setProperty('--secondary', data.config.themeColor)

  if (loadColor) {
    console.log('Cargando Colores para picker');
    primaryColor.value = data.config.sidebarColor
    secondaryColor.value = data.config.themeColor
    primaryColorAux.value = data.config.sidebarColor
    secondaryColorAux.value = data.config.themeColor
  }
}
//veriicamos si tenemos token en el local storage y si no lo tiene se redirige a /login
const loadMenu = async () => {
  getConfigUser(false)
}
const resetSaveColor = async (reset: boolean) => {
  // si es verdadero reinicio los colores para guardarlos
  if (reset) {
    primaryColor.value = '#495a69';
    secondaryColor.value = '#aadadf';
  }
  primaryColorAux.value = primaryColor.value
  secondaryColorAux.value = secondaryColor.value
  // si es falso entonces guardo los colores con sus cambios respectivos
  // PETICION
}
const changeColorBarra = async (val: any, item: any) => {
  await document.body.style.setProperty(item === 1 ? '--primary' : '--secondary', val);
  // if (item == 1) setCssVar('primary', val);
}
const limpiarColores = async (val: boolean) => {
  console.log(val, 'limpiar colores');
  if (!val) {
    await document.body.style.setProperty('--primary', primaryColorAux.value);
    // setCssVar('primary', primaryColorAux.value);
    await document.body.style.setProperty('--secondary', secondaryColorAux.value);
    primaryColor.value = primaryColorAux.value;
    secondaryColor.value = secondaryColorAux.value;
  }
}
const logout = () => {
  localStorage.clear();
  storex.updatePermisos([]);
  storex.updateMenu([]);
  router.push({ path: '/login' });
};

/****************************************************************************/
/*                                CYCLE LIFE                                     */
/****************************************************************************/

/*
const changeTheme = async () => {
  Dark.toggle()
}

watch(() => Dark.isActive, val => {
  iconTheme.value = val ? 'dark_mode' : 'light_mode'
  bgToolbar.value = val ? 'bg-dark' : 'bg-drawer'
})
*/
onMounted(async () => {
  await getConfigUser(true);
  await loadMenu();
});

onUpdated(async () => {
  await loadMenu();
});

</script>
<style lang="sass">
.bg-drawer
  background-color: #fcfbfe //#aadadf
  color: #495a69
.toggle-theme
  position: absolute
  margin: 10px
  bottom: 0
  right: 0
  left: 0
</style>
