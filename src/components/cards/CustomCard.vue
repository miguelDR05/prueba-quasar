<template>
  <div>
    <q-card class="my-card" :class="template ? 'row justify-center items-center' : ''" flat bordered
      :style="'max-width:' + maxWidth">
      <q-card-section horizontal v-if="template">
        <slot name="header"></slot>
        <q-card-section class="row col-4 items-center justify-center">
          <q-icon name="mdi-cube-outline" size="sm" class="icon" />
          <slot name="body"></slot>
        </q-card-section>
        <q-card-section class="row items-center justify-start">
          <div class="text-subtitle1 text-grey-7">Total resource</div>
          <div class="text-h6 row justify-between full-width">
            <strong>127</strong>
            <div class="row justify-end">
              <slot name="btn-right"></slot>
            </div>
          </div>
          <slot name="bottom"></slot>
        </q-card-section>
      </q-card-section>
      <slot name="content"></slot>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

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
  template?: boolean;
  maxWidth?: string;
}
withDefaults(defineProps<Props>(), {
  showValue: true,
  fontSize: "15px",
  size: "70px",
  trackColor: "grey-3",
  customlClass: "q-ma-none",
  classLabel: "text-subtitle1 text-grey-7",
  template: false,
  maxWidth: '',
});
</script>
<style lang="sass" scoped>
.my-card
  margin-top: 16px
  padding: 24px
  width: 100%
  border-radius: 20px
.icon
  border-radius: 8px
  padding: 16px
  background-color: #f5f5f5
  color: #bbb
  font-size: 10px
</style>
