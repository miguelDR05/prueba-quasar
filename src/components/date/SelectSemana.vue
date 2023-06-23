<template>
  <div>
    <!-- {{ modelSelect }} -->
    <q-select v-model="modelSelect" color="primary" dense :label="label" :options="optionsSelect" input-debounce="0"
      options-dense :multiple="multiple" :clearable="clereable" @blur="changeItems" @filter="filterFn" :use-input="filter"
      borderless map-options>
      <template v-slot:prepend>
        <q-icon name="event" :color="Dark.isActive ? 'secondary' : 'primary'" class="selectItems" />
      </template>
      <!-- <div class="todos">
        <span v-if="modelSelect.length == optionsSelect.length && optionsSelect.length > 0">
          TODOS
        </span>
      </div> -->
      <template v-if="multiple" #before-options>
        <q-item>
          <q-item-section>
            <q-item-label>Todos</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox v-model="allItems" @update:model-value="selectAllItems($event)"></q-checkbox>
          </q-item-section>
        </q-item>
      </template>
      <template v-if="multiple" v-slot:selected-item="{ index, opt }">
        <!-- index{{ index }} -->
        <span class="row" style="width: 100%;" v-if="index == 0">
          <div class="nowrap">{{ opt.label }}</div>
          <div v-if="modelSelect.length > 1" class="q-ml-sm">(+{{ modelSelect.length - 1 }} otras)</div>
        </span>
      </template>
      <template v-if="multiple" v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox v-model="modelSelect" @update:model-value="ItemsSelected" :val="scope.opt.value"></q-checkbox>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, Ref } from 'vue';
import { Dark } from 'quasar';

const dprops = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: Boolean,
    default: false,
  },
  data: {
    type: undefined,
    default: [],
  },
  items: {
    type: undefined,
    default: {
      label: '',
      value: '',
      other: '',
    }
  },
  defaultItem: {
    type: undefined,
    default: {
      item: <any>'',
      value: <any>'',
    }
  },
  clereable: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'Label',
  },
});

const modelSelect = ref<string | Array<any>>([]);
const optionsSelect = ref<Array<any>>([])
const optionsAux = ref<Array<any>>([])
const allItems = ref<boolean>(false)

/****************************************************************************/
/*                                EMITS                                     */
/****************************************************************************/

const emit = defineEmits(['emitModel']);

// mapeo de los items para las opciones del select
const mapItems = async (anio: any = new Date().getFullYear()) => {
  optionsAux.value = dprops.data.map((e: any) => {
    return {
      label: e[dprops.items.label],
      value: e[dprops.items.value],
      here: e[dprops.items.other],
    };
  })
  optionsSelect.value = optionsAux.value
  // obtener el valor por defecto en el select
  var model = optionsSelect.value.filter((item: any) => item[dprops.defaultItem.item] == dprops.defaultItem.value);
  modelSelect.value = dprops.multiple ? model : model[0].value
}
// seleccion de filas
const selectAllItems = (evt: boolean) => {
  if (evt) {
    modelSelect.value = optionsSelect.value.map(v => v.value);
    ItemsSelected();
    return
  }
  modelSelect.value = [];
}
const ItemsSelected = () => {
  allItems.value = modelSelect.value.length === optionsSelect.value.length;
};
// envio de items seleccionados a componente padre
const changeItems = () => {
  console.log(modelSelect.value);
  const modelAux = dprops.multiple ? modelSelect.value.toString() : modelSelect.value
  emit('emitModel', modelAux)
}
// buscar dentro de las opciones
const filterFn = (val: any, update: any) => {
  if (val === '') {
    update(() => {
      optionsSelect.value = optionsAux.value;
    });
    return;
  }
  update(() => {
    const needle: any = val.toLowerCase();
    optionsSelect.value = optionsAux.value.filter(
      (v: any) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

onMounted(async () => {
  await mapItems()
})
</script>
<style lang="sass">
// .selectItems,
//   .q-menu::-webkit-scrollbar
//     width: 6px
//   .q-menu::-webkit-scrollbar-thumb
//     margin-left: 5px
//     border-radius: 5px
//     background-color: #ccc
</style>
