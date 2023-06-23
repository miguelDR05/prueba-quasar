<template>
    <template v-for="(option, index) of optionsTable" :key="index">
      <q-item clickable v-if="option?.elementCan ? rowTable[option.elementCan] : true" :v-close-popup="option.children.length > 0" @click="optionAction(option.emit)" dense>
        <q-item-section avatar>
          <q-icon :color="option.color ?? 'primary' " size="xs" :name="option.icon" />
        </q-item-section>
        <q-item-section>{{ option.text }}</q-item-section>
        <q-item-section avatar v-if="option.children.length > 0">
          <q-icon  size="xs" name="keyboard_arrow_right" />
        </q-item-section>
        <q-menu anchor="top end" self="top start" v-if="option.children.length > 0">
          <q-list>
            <data-table-option :options="option.children"></data-table-option>
          </q-list>
        </q-menu>
      </q-item>
      <q-separator v-if="option?.separator"/>
    </template>
  </template>
  
  <script setup lang="ts">
    import { OptionTable } from './models';
    import { ref, watch } from 'vue';
    import type { Ref } from 'vue';
  
    /****************************************************************************/
    /*                                PROPS                                     */
    /****************************************************************************/
  
    const props = defineProps({
      options: {
        type: Array<OptionTable>,
        default: []
      },
      row: {
        type: Object,
        default: null
      }
    });
  
    /****************************************************************************/
    /*                                EMITS                                     */
    /****************************************************************************/
    
    const emit = defineEmits(['optionAction']);
    
    /****************************************************************************/
    /*                             VARIABLES                                    */
    /****************************************************************************/
  
    const optionsTable: Ref<Array<OptionTable>> = ref(props.options);
    const rowTable = ref(props.row);
    
    /****************************************************************************/
    /*                             WATCH                                        */
    /****************************************************************************/
  
    watch(
      () => props.options,
      (v: Array<OptionTable>) => {
        optionsTable.value = v;
      }
    );
  
    watch(
      () => props.row,
      (v: any) => {
        rowTable.value = v;
      }
    );
  
    /****************************************************************************/
    /*                           METHODS                                        */
    /****************************************************************************/
  
    const optionAction = (action: string) => {
      emit('optionAction', { action: action, row: rowTable.value })
    };
  
  </script>