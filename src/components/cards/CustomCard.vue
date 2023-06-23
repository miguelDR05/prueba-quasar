<template>
  <div>
    <q-card class="my-card row justify-center items-center" flat bordered>
      <q-card-section horizontal>
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

    </q-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const lorem = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')

</script>
<style lang="sass" scoped>
.my-card
  padding: 5px
  width: 100%
  max-width: 270px
  border-radius: 18px
.icon
  border-radius: 8px
  padding: 16px
  background-color: #f5f5f5
  color: #bbb
  font-size: 10px
</style>
