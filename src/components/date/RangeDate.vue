<template>
  <div>
    <q-input :dense="dense" v-model="fechaLabel" :label="label" :outlined="outlined" :filled="filled" :style="style"
      :borderless="borderless">
      <template v-slot:prepend>
        <q-icon :name="icon" class="cursor-pointer" :color="Dark.isActive ? 'secondary' : 'primary'">
          <q-popup-proxy prepend transition-show="scale" transition-hide="scale"
            @before-hide="convertString(), changeRangeDate()">
            <q-date v-model="fechaModel" :mask="mask" :range="range" :landscape="landscape">
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Dark } from 'quasar';

/****************************************************************************/
/*                                VARIABLES                                    */
/****************************************************************************/

interface Props {
  label?: string;
  mask?: string;
  icon?: string;
  emit: string;
  color?: string;
  style?: any;
  range?: boolean;
  dense?: boolean;
  borderless?: boolean;
  outlined?: boolean;
  filled?: boolean;
  landscape?: boolean;
}
const defaultProps = withDefaults(defineProps<Props>(), {
  label: 'Rango de fechas',
  mask: "DD/MM/YYYY",
  icon: 'mdi-calendar',
  emit: '',
  color: `${Dark.isActive ? 'secondary' : 'primary'}`,
  style: { 'border': 'none', },
  // style: { 'border': '1px solid #f5f', 'background-color': 'orange' },
  range: true,
  dense: true,
  borderless: false,
  outlined: false,
  filled: false,
  landscape: false,

});

const fechaModel = ref<{ from: string; to: string } | any>({
  from: new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('en-GB'),
  to: new Date().toLocaleDateString('en-GB'),
});
const fechaLabel = ref<string | any>(fechaModel.value.from + ' ~ ' + fechaModel.value.to);

/****************************************************************************/
/*                                EMITS                                     */
/****************************************************************************/

const emits = defineEmits(['selectRange']);

/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
// convertir el rango de fechas a string
const convertString = () => {
  const from = new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('en-GB');
  const to = new Date().toLocaleDateString('en-GB');
  if (fechaModel.value == null) {
    fechaLabel.value = from + ' ~ ' + to;
    fechaModel.value.from = from
    fechaModel.value.to = to
  } else if (Object.entries(fechaModel.value).length == 2) {
    fechaLabel.value = fechaModel.value.from + ' ~ ' + fechaModel.value.to;
  } else if (fechaModel.value.length > 2) {
    fechaLabel.value = fechaModel.value;
  }
};

const changeRangeDate = async () => {
  emits('selectRange', fechaModel.value);
};

onMounted(async () => {
  changeRangeDate()
});

</script>
<style lang="sass">

</style>
