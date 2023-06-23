<template>
  <div>
    <q-card flat bordered class="my-card">
      <q-item>
        <q-item-section avatar>
          <q-knob readonly :show-value="showValue" :font-size="fontSize" v-model="$props.item.porcentaje" :size="size"
            :color="item.color" :track-color="trackColor" :class="customlClass">
            <div class="row justify-center items-center">
              <q-icon v-if="icon" :name="item.icon" class="col-12" />
              <div class="col-12 text-center">{{ item.porcentaje }}%</div>
            </div>
          </q-knob>
        </q-item-section>
        <q-item-section class="text-start">
          <q-item-label :class="Dark.isActive ? '' : classLabel">
            <div :style="Screen.lg ? 'font-size:0.7vw' : ''">{{ item.descripcion }}</div>
            {{ }}
          </q-item-label>
          <q-item-label>
            <strong>{{ item.cantidad }}</strong>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Screen, Dark } from 'quasar';

interface Props {
  showValue?: boolean;
  fontSize?: string;
  size?: string;
  trackColor?: string;
  customlClass?: string;
  classLabel?: string;
  item?: any;
  icon?: boolean;
  // otrhe props
  color?: string;
  style?: any;
  range?: boolean;
}

withDefaults(defineProps<Props>(), {
  showValue: true,
  fontSize: "15px",
  size: "70px",
  trackColor: "grey-3",
  customlClass: "q-ma-none",
  classLabel: "text-subtitle1 text-grey-7",
  icon: true,
  item: {
    porcentaje: 20,
    color: 'orange',
    cantidad: 5,
    descripcion: 'Atrasados',
    icon: 'mdi-cube-outline'
  },
});

</script>
<style lang="sass" scoped>
.my-card
  padding: 5px
  width: 100%
  border-radius: 10px

</style>
