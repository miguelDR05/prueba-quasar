<template>
  <q-chip :icon="icon" :icon-right="iconRight" class="custom-chip" :label="label" :square="square" :dense="dense"
    text-color="'white'" :outline="outline"
    :style="border ? 'border: 1px solid ' + color + ';' + 'color:' + color + ';' + 'background-color:' + background : 'color:' + color + ';' + 'background-color:' + background"
    :clickable="clickable" :size="size">
    <slot name="body"></slot>
  </q-chip>
</template>
<script setup lang="ts">
import { ref, useSlots } from 'vue';
import { Screen, Dark } from 'quasar';

interface Props {
  label?: string;
  square?: boolean;
  dense?: boolean;
  outline?: boolean;
  color?: string;
  background?: string;
  border?: boolean;
  icon?: string | undefined;
  iconRight?: string;
  clickable?: boolean;
  size?: string;
}

withDefaults(defineProps<Props>(), {
  label: '',
  square: false,
  dense: false,
  outline: false,
  color: '',
  background: '',
  border: false,
  clickable: false,
  size: ''
})
</script>
<style lang="sass">
.custom-chip
  .q-chip__icon
    color: none
</style>
