<template>
  <q-page style="min-height: 100% !important">
    <div class="q-mx-lg">
      <!-- <div class="row justify-around">
        <div v-for="(item, index) in cabezera" :key="index" class="q-my-xs col-xs-12 col-sm-4 col-md-3 col-lg-2">
          <knob-card :item="item" :fontSize="'15px'" :classLabel="'text-grey-7'" class="q-mx-xs" />
        </div>
      </div> -->
      <!-- <div>
        <custom-card>
          <template v-slot:btn-right>
            <q-btn dense round icon="mdi-eye" flat />
          </template>
        </custom-card>
      </div> -->
      <data-table class="table2" dense flat filter-search btn-exportar-excel btn-full-screen :title="'Title table'"
        :data="rows" :columns="columns" :separator="'none'">
        <template v-slot:body-cell-calories="props">
          <q-td :props="props">
            <!-- <q-chip dense square :class="props.value < 10 ? 'fat-cell1' : 'fat-cell2'" :label="props.value"> -->
            <colored-chips :label="props.value" dense square
              :color="props.value.charAt(0) === '+' ? '#649382' : '#a27486'"
              :background="props.value.charAt(0) === '+' ? '#ebfef8' : '#fff3f7'" border
              :clickable="props.value.charAt(0) === '+'" @click="alerta('Aqui hago funcicones')">
            </colored-chips>
            <!-- <div class="" style="width: 20px">
                <div>{{ props.value }}</div>
              </div> -->
          </q-td>
        </template>
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <colored-chips square @click="alerta('lol')">
              <template v-slot:body>
                <q-avatar @click="alerta('lol')">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                {{ props.value }}
                <q-tooltip>{{ props.value }}</q-tooltip>
              </template>
            </colored-chips>
          </q-td>

        </template>
        <template v-slot:body-cell-fat="props">
          <q-td :props="props">
            <colored-chips square :label="props.value" dense :icon="'star'" :color="'orange'" outline>
            </colored-chips>
          </q-td>
        </template>
        <template v-slot:body-cell-carbs="props">
          <q-td :props="props">
            <colored-chips dense :color="'#1a3'">
              <template v-slot:body>
                <q-avatar color="red" text-color="white" @click="alerta('lol')">
                  C
                </q-avatar>
                {{ props.value }}%
              </template>
            </colored-chips>
          </q-td>
        </template>
        <template v-slot:body-cell-sodium="props">
          <q-td :props="props">
            <colored-chips dense :color="'#495a69'" :background="'#aadadf'" :label="props.value" :icon-right="'cake'">
            </colored-chips>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat dense icon="mdi-plus-thick" size="sm" color="primary" class="mini-btn"></q-btn>
            <q-btn flat dense icon="delete" size="sm" color="negative" class="mini-btn"></q-btn>
          </q-td>
        </template>
      </data-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomCard from '@/components/cards/CustomCard.vue';
import KnobCard from '@/components/cards/KnobCard.vue';
import DataTable from '@components/data-table/DataTable.vue';
import ColoredChips from '@components/chips/ColoredChip.vue'
import { stringify } from 'querystring';

const cabezera = ref([
  {
    cantidad: 20,
    porcentaje: 100,
    idestado: "TH",
    descripcion: "ACUERDOS TOTALES",
    color: "primary",
    orden: 0,
    icon: "mdi-cube-outline"
  },
  {
    cantidad: 30,
    porcentaje: 50,
    idestado: "RE",
    descripcion: "REALIZADO",
    color: "positive",
    orden: 1,
    icon: "mdi-cube-outline"
  },
  {
    cantidad: 5,
    porcentaje: 40,
    idestado: "NR",
    descripcion: "NO REALIZADO",
    color: "warning",
    orden: 2,
    icon: "mdi-cube-outline"
  },
  {
    cantidad: 10,
    porcentaje: 30,
    idestado: "PV",
    descripcion: "POR VENCER",
    color: "negative",
    orden: 3,
    icon: "mdi-cube-outline"
  },
  {
    cantidad: 2,
    porcentaje: 20,
    idestado: "CA",
    descripcion: "CANCELADO",
    color: "dark",
    orden: 4,
    icon: "mdi-cube-outline"
  }
])

const columns = ref([
  {
    name: 'numero',
    label: 'N°',
    align: 'center',
    field: 'ido',
    required: true,
    hasFilter: true
  },
  {
    name: 'name',
    label: 'Nombre',
    align: 'left',
    field: 'name',
    sortable: true,
    required: true,
  },
  {
    name: 'calories',
    label: 'Money',
    align: 'center',
    field: 'calories',
    sortable: true,
    required: true,
  },
  {
    name: 'fat',
    label: 'Grasas',
    align: 'center',
    field: 'fat',
    sortable: true,
    required: false,
  },
  {
    name: 'carbs',
    label: 'Carbohidratos',
    align: 'center',
    field: 'carbs',
    sortable: true,
    required: false,
  },
  {
    name: 'protein',
    label: 'Proteinas',
    align: 'center',
    field: 'protein',
    sortable: true,
    required: false,
  },
  {
    name: 'sodium',
    label: 'Sodio',
    align: 'center',
    field: 'sodium',
    sortable: true,
    required: false,
  },
  {
    name: 'calcium',
    label: 'Calcio',
    align: 'center',
    field: 'calcium',
    sortable: true,
    required: false,
  },
  {
    name: 'iron',
    label: 'Hierro',
    align: 'center',
    field: 'iron',
    sortable: true,
    required: false,
  },
  {
    name: 'actions',
    label: 'Acciones',
    align: 'center',
    field: 'actions',
    sortable: true,
    required: false,
  },

])
const rows = ref<Array<any>>([
  {
    name: 'Frozen Yogurf',
    calories: '-$20,000.00',
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
    hasFilter: true,
  },
  {
    name: 'Ice cream sandwich',
    calories: '+$12,850.00',
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: '-$10,973.00',
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: '-$14,300.00',
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: '+$38,257.00',
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: '+$18,500.00',
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: '+$15,000.00',
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: '-$08,500.00',
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: '+$13,100.00',
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: '+$10,100.00',
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  },
  {
    name: 'Donut',
    calories: '-$26,130.00',
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: '+$33,164.00',
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }

])
function alerta(param: string) {
  alert(param)
}
</script>
<style lang="sass">
.table2
  .q-table__middle
    height: 70vh
.mini-btn
  background: #fcfbfe
  padding: 4px
  margin: 4px
  border-radius: 7px
</style>
