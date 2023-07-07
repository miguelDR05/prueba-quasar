<template>
  <q-page>
    {{ columns.length }}
    <q-markup-table class="scroll-table">
      <thead class="bg-teal">
        <tr>
          <th :colspan="columns.length">
            <div class="row no-wrap items-center">
              <q-img style="width: 70px" :ratio="1" class="rounded-borders" src="https://cdn.quasar.dev/img/donuts.png" />

              <div class="text-h4 q-ml-md text-white">Treats</div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left" v-for="(col, index) in columns" :key="index">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="text-left" data-th="Name" v-for="(value, index) in getObjectValues(row)" :key="index">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>

  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { QMarkupTableProps } from 'node_modules/quasar/dist/types/index';

const columns = ref<Array<any>>([
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
    required: true,
  },
  {
    name: 'sodium',
    label: 'Sodio',
    align: 'center',
    field: 'sodium',
    sortable: true,
    required: true,
  },
  {
    name: 'calcium',
    label: 'Calcio',
    align: 'center',
    field: 'calcium',
    sortable: true,
    required: true,
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

const getObjectValues = (obj: Record<string, any>): Array<any> => {
  return Object.values(obj);
}

</script>
<style lang="sass">
.q-table__container
  position: relative
  height: 85vh

thead
  position: sticky
  z-index: 100
  top: 0
  background-color: #321

tbody
  max-height: 20px
  width: 100vw

.scroll-table::-webkit-scrollbar
  width: 5px
.scroll-table::-webkit-scrollbar-thumb
  margin-left: 5px
  border-radius: 5px
  background-color: #ccc
.scroll-table::-webkit-scrollbar:horizontal
  height: 6px
.scroll-table::-webkit-scrollbar-thumb:horizontal
  border-radius: 5px
  background-color: #ccc
</style>
