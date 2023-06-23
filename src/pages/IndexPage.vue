<template>
  <q-page>
    <div class="q-ma-lg">
      <div class="row justify-around">
        <div v-for="(item, index) in cabezera" :key="index" class="q-my-xs col-xs-12 col-sm-4 col-md-3 col-lg-2">
          <knob-card :item="item" :fontSize="'15px'" :classLabel="'text-grey-7'" class="q-mx-xs" />
        </div>
      </div>
      <div>
        <custom-card>
          <template v-slot:btn-right>
            <q-btn dense round icon="mdi-eye" flat />
          </template>
        </custom-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomCard from '@/components/cards/CustomCard.vue';
import KnobCard from '@/components/cards/KnobCard.vue';

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

</script>
