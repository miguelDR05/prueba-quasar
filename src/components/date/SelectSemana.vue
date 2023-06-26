<template>
  <div>
    <q-select v-model="modelSelect" color="primary" dense :label="label" :options="optionsSelect" input-debounce="0"
      options-dense :multiple="multiple" :clearable="clereable" @clear="clearSelect()"
      @blur="multiple ? changeItems(false) : ''" @filter="filterFn" :use-input="filter" borderless map-options
      class="select-items" @update:model-value="!multiple ? changeItems(false) : ''"
      :options-selected-class="Dark.isActive ? 'text-secondary' : 'text-primary'">
      <template v-slot:prepend>
        <q-icon :name="icon" :color="Dark.isActive ? 'secondary' : 'primary'" class="selectItems" />
      </template>
      <!-- <template v-if="modelSelect && clereable" v-slot:append>
        <q-icon name="cancel" @click.stop.prevent="modelSelect = []" class="cursor-pointer" />
      </template> -->
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
        <span class="row" style="width: 100%;" v-if="index == 0">
          <div class="nowrap">{{ opt.label }}</div>
          <div v-if="modelSelect.length > 1" class="q-ml-sm">(+{{ modelSelect.length - 1 }} otras)</div>
        </span>
      </template>
      <template v-if="multiple" v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label>{{ opt.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox :model-value="selected" @update:model-value="() => { toggleOption(opt), ItemsSelected() }"
              :val="opt.value"></q-checkbox>
          </q-item-section>
        </q-item>
      </template>
      <!-- <template v-if="multiple" v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox v-model="modelSelect" @update:model-value="ItemsSelected" :val="scope.opt.value"></q-checkbox>
          </q-item-section>
        </q-item>
      </template> -->
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-italic text-grey">
            No hay opciones...
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, Ref } from 'vue';
import { Dark } from 'quasar';

const refSelectItems: Ref<any> = ref(null);
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
  mapOptions: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: 'event'
  }

});

const modelSelect = ref<any>([]);
const optionsSelect = ref<Array<any>>([])
const optionsAux = ref<Array<any>>([])
const allItems = ref<boolean>(false)

const changed = ref(false);
const clean = ref(false);

/****************************************************************************/
/*                                EMITS                                     */
/****************************************************************************/

const emit = defineEmits(['emitModel']);

const alertaHijo = () => {
  alert('ALERTAAAAA')
}
// mapeo de los items para las opciones del select
const mapItems = async () => {
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
  // modelSelect.value = model
}
// seleccion de filas
const selectAllItems = (evt: boolean) => {
  if (evt) {
    modelSelect.value = optionsSelect.value //.map(v => v.value);
    ItemsSelected();
    return
  }
  modelSelect.value = [];
  ItemsSelected()
}
//marcar checkbox de todos
const ItemsSelected = () => {
  allItems.value = modelSelect.value.length === optionsSelect.value.length;
};

// envio de items seleccionados a componente padre
const changeItems = async (firstCharge: boolean) => {
  if (changed.value) {
    var modelAux: any
    /*
      if (firstCharge) {
        modelAux = dprops.multiple ? modelSelect.value[0].value : modelSelect.value;
      } else {
        modelAux = dprops.multiple ? modelSelect.value.toString() : modelSelect.value
      }
    */
    //  si map options esta activado se enviaran solo los valores de cada select, de lo contrario se enviare todo el array de objetos
    modelAux = dprops.mapOptions && !clean.value ? modelSelect.value.map((item: any) => item.value).toString() : modelSelect.value
    await emit('emitModel', modelAux)
    clean.value = false
    changed.value = false
  }
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

const clearSelect = () => {
  modelSelect.value = []
  allItems.value = false
  clean.value = true
  changeItems(true)
  // emit('emitModel', modelSelect.value)
}

// Exponer la referencia al componente

defineExpose({ alertaHijo, refSelectItems });

watch(modelSelect, (newVal: any, oldVal: any) => {
  if (newVal != oldVal) {
    changed.value = true;
  }
});

onMounted(async () => {
  await mapItems()
  changeItems(true)
})
/*
  !TODOS
    - Los primero emit son solo value en el caso de la seleccion multiple y simple
*/
</script>
<style lang="sass">
.select-items

.q-menu::-webkit-scrollbar
  width: 5px
.q-menu::-webkit-scrollbar-thumb
  border-radius: 5px
  background-color: #ccc
  top:20px

</style>
