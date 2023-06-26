<template>
  <q-card class="custom-tab" flat bordered>
    <q-splitter v-model="splitterModel" :horizontal="Screen.xs" :before-class="'background:red'">
      <template v-slot:before>
        <q-tabs v-model="tab" :vertical="!Screen.xs" active-color="primary" active-bg-color="secondary" no-caps
          indicator-color="transparent" outside-arrows>
          <q-tab v-for="(item, index) in itemsMenu" :key="index" :name="item.name" :label="item.label"
            :class="item.name == 'eliminarCuenta' ? 'text-red text-bold' : ''" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels v-model="tab" swipeable vertical transition-prev="jump-up" transition-next="jump-up"
          v-for="(item, index) in itemsMenu" :key="index">
          <q-tab-panel :name="item.name">
            <div class="text-h6 q-mb-md">{{ item.label }}</div>
            <slot :name="item.name"></slot>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Screen } from 'quasar'
const dprops = defineProps({
  itemsMenu: {
    type: Array<any>,
    default: [],
  },
})

const firstItem = ref<any>(dprops.itemsMenu[0].name)
const tab = ref<string>(firstItem)
const splitterModel = ref<number>(20)

</script>
<style lang="sass">
.custom-tab
  border-radius: 20px
  height: 100% !important
  margin-top: 10px
.q-splitter__panel
  border-radius: 20px
.q-splitter__before
  width: 200px !important
.q-splitter--vertical > .q-splitter__panel
  height: 100%
  .q-tab
    padding: 5px 15px
    margin: 10px 15px
    border-radius: 15px
    min-height: 35px
    justify-content: start
    min-width: max-content !important
    .q-focus-helper
      border-radius: 15px
    .q-focus-helper:before
      border-radius: 15px
    .q-focus-helper:after
      border-radius: 15px
  .q-tab:before
    background: red
  .q-tab-panels
    background: none
@media (max-width: 600px)
  .q-splitter__before
    width: 100% !important
    margin: 5px
    .q-tab
      border-radius: 15px
      margin: 5px
      min-height: 35px
</style>
