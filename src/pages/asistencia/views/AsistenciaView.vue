<template>
  <q-page>
    <!-- <q-banner inline-actions class="q-ma-xs">
      Asistencia
      <template v-slot:action>
        <q-btn flat label="Turn ON Wifi" />
      </template>
    </q-banner>
    <q-separator /> -->
    <div class="row justify-between q-mb-md">
      <div v-for="(item, index) in cabezera" :key="index" class="q-my-xs col-xs-12 col-sm-4 col-md-3 col-lg-2">
        <knob-card :item="item" :fontSize="'15px'" :classLabel="'text-grey-7'" class="q-mr-xs" />
      </div>
    </div>
    <data-table :color="'negative'" filter-search btn-exportar-excel btn-full-screen :title="'Registro de asistencias'"
      :data="rows" :columns="columns" flat btnFilterAdvance btnLoadTable :headerFilter="true" :separator="'horizontal'"
      :selection="'multiple'" :visibilityColumns="true" :options="opt">
      <template v-slot:btn-left>
        <div class="col-12 col-xs-12 col-sm-6 col-md-2 col-lg-2">
          <q-checkbox label="Solo Yo" v-model="bandera" @update:model-value="listMatrizAcuerdos(true)" />
          <!-- checked-icon="task_alt" unchecked-icon="highlight_off" -->
        </div>
        <div class="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <range-date @select-range="selectRange" borderless />
        </div>
        <div class="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <select-semana @emit-model="ObtenerSemana" multiple :data="response" :items="valores"
            :default-item="{ item: 'here', value: 1 }" ref="refSelectItems"></select-semana>
        </div>
      </template>
      <template v-slot:btn-right>
        <div class="text-center">
          <q-btn flat round size="md" :color="Dark.isActive ? 'secondary' : 'primary'" :icon="'mdi-cloud-download'"
            @click="exportarListado()" />
        </div>
      </template>
      <template v-slot:filter>
        <div class="text-center">
          <q-btn flat round size="md" color="primary" :icon="'mdi-cloud-download'" @click="exportarListado()" />
        </div>
      </template>
      <template v-slot:body-cell-calories="props">
        <q-td :props="props">
          <q-chip dense square :class="props.value.charAt(0) === '+' ? 'fat-cell1' : 'fat-cell2'">
            <div class="">
              <div>{{ props.value }}</div>
            </div>
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-fat="props">
        <q-td :props="props">
          <q-chip dense square :class="props.value < 10 ? 'fat-cell1' : 'fat-cell2'">
            <div class="" style="width: 20px">
              <div>{{ props.value }}</div>
            </div>
          </q-chip>
        </q-td>
      </template>
    </data-table>

  </q-page>
</template>
<script setup lang="ts">
import DataTable from '@components/data-table/DataTable.vue';
import KnobCard from '@/components/cards/KnobCard.vue';
import RangeDate from '@/components/date/RangeDate.vue';
import SelectSemana from '@/components/date/SelectSemana.vue';
import { resources } from '@/pages/asistencia/api-resource/AsistenciaApiResource';
import { useFetchHttp } from '@composable/fetch/useFetchHttp';
import { ref, onMounted } from 'vue'
import { Dark, Loading } from 'quasar';

const visible = ref<any>(['calories', 'desc', 'fat', 'carbs', 'protein', 'sodium', 'calcium', 'iron'])
//selected es para mandar filas previamente seleccionadas
// :selected="visible"
let opt: any = [{
  text: "hola",
  icon: "mdi-menu-open",
  emit: "emit",
  color: "secondary",
  elementCan: "1",
  separator: "horizontal",
  children: [{
    name: 'number',
  }]
}]
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
const select = ref([])
const bandera = ref(false)
const columns = ref([
  {
    name: 'numero',
    label: 'N°',
    align: 'center',
    field: 'ido',
    sortable: true,
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
const fechaModel = ref<{ from: string; to: string } | any>();
const semanaModel = ref<Array<any> | string>('');
// para select Semana
const response: any = [
  {
    semAnio: "2",
    semana: "Ene-2 al Ene-7",
    here: "0"
  },
  {
    semAnio: "3",
    semana: "Ene-9 al Ene-14",
    here: "0"
  },
  {
    semAnio: "4",
    semana: "Ene-16 al Ene-21",
    here: "0"
  },
  {
    semAnio: "5",
    semana: "Ene-23 al Ene-28",
    here: "0"
  },
  {
    semAnio: "6",
    semana: "Ene-30 al Feb-4",
    here: "0"
  },
  {
    semAnio: "7",
    semana: "Feb-6 al Feb-11",
    here: "0"
  },
  {
    semAnio: "8",
    semana: "Feb-13 al Feb-18",
    here: "0"
  },
  {
    semAnio: "9",
    semana: "Feb-20 al Feb-25",
    here: "0"
  },
  {
    semAnio: "10",
    semana: "Feb-27 al Mar-4",
    here: "0"
  },
  {
    semAnio: "11",
    semana: "Mar-6 al Mar-11",
    here: "0"
  },
  {
    semAnio: "12",
    semana: "Mar-13 al Mar-18",
    here: "0"
  },
  {
    semAnio: "13",
    semana: "Mar-20 al Mar-25",
    here: "0"
  },
  {
    semAnio: "14",
    semana: "Mar-27 al Abr-1",
    here: "0"
  },
  {
    semAnio: "15",
    semana: "Abr-3 al Abr-8",
    here: "0"
  },
  {
    semAnio: "16",
    semana: "Abr-10 al Abr-15",
    here: "0"
  },
  {
    semAnio: "17",
    semana: "Abr-17 al Abr-22",
    here: "0"
  },
  {
    semAnio: "18",
    semana: "Abr-24 al Abr-29",
    here: "0"
  },
  {
    semAnio: "19",
    semana: "May-1 al May-6",
    here: "0"
  },
  {
    semAnio: "20",
    semana: "May-8 al May-13",
    here: "0"
  },
  {
    semAnio: "21",
    semana: "May-15 al May-20",
    here: "0"
  },
  {
    semAnio: "22",
    semana: "May-22 al May-27",
    here: "0"
  },
  {
    semAnio: "23",
    semana: "May-29 al Jun-3",
    here: "0"
  },
  {
    semAnio: "24",
    semana: "Jun-5 al Jun-10",
    here: "0"
  },
  {
    semAnio: "25",
    semana: "Jun-12 al Jun-17",
    here: "0"
  },
  {
    semAnio: "26",
    semana: "Jun-19 al Jun-24",
    here: "1"
  },
  {
    semAnio: "27",
    semana: "Jun-26 al Jul-1",
    here: "0"
  },
  {
    semAnio: "28",
    semana: "Jul-3 al Jul-8",
    here: "0"
  },
  {
    semAnio: "29",
    semana: "Jul-10 al Jul-15",
    here: "0"
  },
  {
    semAnio: "30",
    semana: "Jul-17 al Jul-22",
    here: "0"
  },
  {
    semAnio: "31",
    semana: "Jul-24 al Jul-29",
    here: "0"
  },
  {
    semAnio: "32",
    semana: "Jul-31 al Ago-5",
    here: "0"
  },
  {
    semAnio: "33",
    semana: "Ago-7 al Ago-12",
    here: "0"
  },
  {
    semAnio: "34",
    semana: "Ago-14 al Ago-19",
    here: "0"
  },
  {
    semAnio: "35",
    semana: "Ago-21 al Ago-26",
    here: "0"
  },
  {
    semAnio: "36",
    semana: "Ago-28 al Sep-2",
    here: "0"
  },
  {
    semAnio: "37",
    semana: "Sep-4 al Sep-9",
    here: "0"
  },
  {
    semAnio: "38",
    semana: "Sep-11 al Sep-16",
    here: "0"
  },
  {
    semAnio: "39",
    semana: "Sep-18 al Sep-23",
    here: "0"
  },
  {
    semAnio: "40",
    semana: "Sep-25 al Sep-30",
    here: "0"
  },
  {
    semAnio: "41",
    semana: "Oct-2 al Oct-7",
    here: "0"
  },
  {
    semAnio: "42",
    semana: "Oct-9 al Oct-14",
    here: "0"
  },
  {
    semAnio: "43",
    semana: "Oct-16 al Oct-21",
    here: "0"
  },
  {
    semAnio: "44",
    semana: "Oct-23 al Oct-28",
    here: "0"
  },
  {
    semAnio: "45",
    semana: "Oct-30 al Nov-4",
    here: "0"
  },
  {
    semAnio: "46",
    semana: "Nov-6 al Nov-11",
    here: "0"
  },
  {
    semAnio: "47",
    semana: "Nov-13 al Nov-18",
    here: "0"
  },
  {
    semAnio: "48",
    semana: "Nov-20 al Nov-25",
    here: "0"
  },
  {
    semAnio: "49",
    semana: "Nov-27 al Dic-2",
    here: "0"
  },
  {
    semAnio: "50",
    semana: "Dic-4 al Dic-9",
    here: "0"
  },
  {
    semAnio: "51",
    semana: "Dic-11 al Dic-16",
    here: "0"
  },
  {
    semAnio: "52",
    semana: "Dic-18 al Dic-23",
    here: "0"
  },
  {
    semAnio: "53",
    semana: "Dic-25 al Dic-30",
    here: "0"
  }
]
const valores: any = {
  label: 'semana',
  value: 'semAnio',
  other: 'here',
}
const refSelectItems = ref<any>(null);
/****************************************************************************/
/*                           COMPOSABLE                                     */
/****************************************************************************/
const { fetchHttpResource } = useFetchHttp();

/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
const listMatrizAcuerdos = async (filterGerenciaArea: boolean) => {
  try {
    resources.matrizAcuerdos.params = {
      bandera: bandera.value,  // todos 0 o soloyo 1 -- soloYo.value === true ? 1 : 0,
      inicio: fechaModel.value.from.split('/').reverse().join('-'),
      fin: fechaModel.value.to.split('/').reverse().join('-'),
      idEstados: '',
      idSubareas: '',
    };

    Loading.show();
    const response: any = await fetchHttpResource(resources.matrizAcuerdos, true);
    Loading.hide();

    console.log(response.data);
    cabezera.value = response.data.totales

  } catch (error) {
    console.log('error: ' + error);
  }
}
const exportarListado = async () => {
  refSelectItems.value.alertaHijo()
}

const selectRange = async (fecha: any) => {
  fechaModel.value = fecha
  console.log(fecha);

  // listMatrizAcuerdos(true)
}
const ObtenerSemana = async (nsemana: any) => {
  console.log('recibir semana', nsemana);

  semanaModel.value = nsemana
}

onMounted(async () => {
  // await listMatrizAcuerdos(true)
})

</script>
<style lang="sass">
.bg-custom-table
  background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)
.fat-cell1
  color: #649382
  background-color: #ebfef8
  border-radius: 7px
.fat-cell2
  color: #a27486
  background-color: #fff3f7
  border-radius: 7px
</style>
