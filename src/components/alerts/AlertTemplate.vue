<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" :persistent="persistent" :position="position">
    <q-card flat class="card-dialog" :class="'bg-white'" :style="'width:' + width + 'px'">
      <q-card-section class="row justify-center items-center">
        <div class="text-h5">{{ title }}</div>
      </q-card-section>
      <q-card-section>
        <!-- body -->
        <div class="col-12 text-center q-pa-sm">
          <img width="100" :src="arrImg[indexImg].src">
        </div>
        <div class="col-12 text-center">
          <div class="q-ma-sm text-subtitle2">{{ mensaje }}</div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" flat label="Aceptar" @click="onOKClick()"></q-btn>
        <q-btn v-if="cancel" color="negative" flat label="Cancelar" @click="onCancelClick()"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue';

interface Props {
  title?: string,
  mensaje?: string,
  type?: "success" | "error" | "question" | "information" | "warning",
  cancel?: boolean,
  position?: "standard" | "top" | "right" | "bottom" | "left" | undefined
  persistent?: boolean,
  width?: number,
}

const props = withDefaults(defineProps<Props>(), {
  title: 'ESTE ES EL TITULO',
  mensaje: 'mensaje',
  type: 'success',
  cancel: false,
  position: 'top',
  persistent: false,
  width: 400,
});

const arrImg: Array<{ src: string, type: string }> = [
  { src: 'src/assets/alert-icons/positive.png', type: 'success' },
  { src: 'src/assets/alert-icons/negative.png', type: 'error' },
  { src: 'src/assets/alert-icons/question.png', type: 'question' },
  { src: 'src/assets/alert-icons/information.png', type: 'information' },
  { src: 'src/assets/alert-icons/warning.png', type: 'warning' },
];

const indexImg = ref<number>(arrImg.findIndex((obj) => obj.type === props.type));

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
defineEmits([...useDialogPluginComponent.emits])

const onOKClick = () => {
  onDialogOK()
}

const onCancelClick = () => {
  onDialogCancel()
}

</script>
<style lang="sass">

.scroll-area::-webkit-scrollbar
  width: 5px
.scroll-area::-webkit-scrollbar-thumb
  border-radius: 5px
  background-color: #ccc

</style>
