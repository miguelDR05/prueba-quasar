<template>
  <q-page>
    <custom-tab :items-menu="itemsMenu">
      <template v-slot:perfil>
        <custom-card>
          <template v-slot:content>
            <div class="row justify-between items-center q-gutter-y-sm">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="row items-center" :class="Screen.xs ? 'justify-between' : 'q-gutter-x-sm'">
                  <q-avatar :size="Screen.xs ? '90px' : '100px'" class="cursor-pointer">
                    <img :src="'https://drive.google.com/uc?export=download&id=' + itemsProfile.idAvatar" />
                  </q-avatar>
                  <div class="q-gutter-y-xs q-px-sm">
                    <div v-for="(item, index) in perfil" :key="index">
                      <div :class="item.id == 'nombres' ? 'text-bold' : ''">{{ item.value }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="row justify-end items-center">
                  <q-btn outline icon="mdi-account-edit-outline" rounded style="text-transform: none;"> Edit
                    <q-tooltip class="bg-tool-tip">Editar perfil</q-tooltip>
                  </q-btn>
                </div>
              </div>

            </div>
          </template>
        </custom-card>
        <custom-card>
          <template v-slot:content>
            <div class="row justify-between">
              <div class="text-subtitle1"><strong>Informacion Personal</strong></div>
              <div><q-btn outline icon="mdi-account-edit-outline" rounded style="text-transform: none;"> Edit
                  <q-tooltip class="bg-tool-tip">Editar informacion personal</q-tooltip>
                </q-btn></div>
            </div>
            <div class="row justify-between">
              <q-field class="col-6  q-gutter-y-xs" v-for="(item, index) in informacionPersonal" :key="index" borderless
                :label="item.label" stack-label>
                {{ item.value }}
              </q-field>
            </div>
          </template>
        </custom-card>
        <custom-card>
          <template v-slot:content>
            <div class="row justify-between">
              <div class="text-subtitle1"><strong>Direccion</strong></div>
              <div><q-btn outline icon="mdi-account-edit-outline" rounded style="text-transform: none;"> Edit
                  <q-tooltip class="bg-tool-tip">Editar direccion</q-tooltip>
                </q-btn></div>
            </div>
            <div class="row justify-between">
              <q-field class="col-6  q-gutter-y-xs" v-for="(item, index) in direccion" :key="index" borderless
                :label="item.label" stack-label>
                {{ item.value }}
              </q-field>
            </div>
          </template>
        </custom-card>
      </template>
    </custom-tab>
    <!-- <custom-card>
      <template v-slot:content>
        <q-card-section horizontal>
          <q-card-section vertical class="q-mr-xs" style="padding: 0px !important;">
            <q-list>
              <q-item class="items-profile" clickable v-for="(item, index) in itemsMenu" :key="index">
                <q-item-section>{{ item.name }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-separator vertical />
          <q-card-section>
          </q-card-section>
        </q-card-section>
      </template>
    </custom-card> -->

  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Screen } from 'quasar';
import CustomCard from '@/components/cards/CustomCard.vue';
import CustomTab from '@components/tabs/CustomTab.vue'

const itemsMenu = ref<any>([
  {
    name: 'perfil',
    label: 'Mi Perfil',
    icon: '',
  },
  {
    name: 'seguridad',
    label: 'Seguridad',
    icon: '',
  },
  {
    name: 'notificaciones',
    label: 'Notificaciones',
    icon: '',
  },
  {
    name: 'equipo',
    label: 'Equipo',
    icon: '',
  },
  {
    name: 'eliminarCuenta',
    label: 'Eliminar Cuenta',
    icon: '',
  },
])
const itemsProfile = ref<any>({
  idAvatar: '1T1iylp1_q8aveqTcAk_pLwgSGSC7kZCL',
  perfil: [
    { id: 'nombres', value: 'Segundo Miguel' },
    { id: 'puesto', value: 'Desarrollador' },
    { id: 'direccion', value: 'Lambayeque, Peru' },
  ],
  informacionPersonal: [
    { label: 'Primer Nombre', value: 'Segundo' },
    { label: 'Segundo Nombre', value: 'Miguel' },
    { label: 'Apellidos', value: 'Delgado Ruiz' },
    { label: 'Correo', value: 'geralon19@gmail.com' },
    { label: 'Telefono', value: '+51 912096964' },
    { label: 'Puesto', value: 'Desarrollador' },
  ],
  direccion: [
    { label: 'Pais', value: 'Peru', id: 'pais' },
    { label: 'Departamento', value: 'Lambayeque', id: 'departamento' },
    { label: 'Provincia/Distrito', value: 'Chiclayo - Picsi', id: 'provinciaDistrito' },
    { label: 'Codigo postal', value: '14301', id: 'codigoPostal' },
  ]
})
const perfil = ref<Array<any>>(itemsProfile.value.perfil)
const informacionPersonal = ref<Array<any>>(itemsProfile.value.informacionPersonal)
const direccion = ref<Array<any>>(itemsProfile.value.direccion)

</script>
<style lang="sass">
.items-profile
.q-card__section--vert
  .q-item
    padding: 5px 10px
    min-height: 35px
    border-radius: 20px
    margin: 10px 0px
</style>
