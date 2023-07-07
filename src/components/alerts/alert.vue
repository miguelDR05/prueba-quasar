<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" :persistent="persistent" :position="position">
    <q-card flat class="card-dialog" :class="cardClass" :style="'width:' + width + 'px'">
      <q-card-section class="row justify-between items-center">
        <div class="text-h6">{{ title }}</div>
        <q-spinner-gears color="primary" size="3rem" v-if="spinner"></q-spinner-gears>
      </q-card-section>
      <q-separator />
      <q-card-section :style="'max-height:' + maxHeight" :class="scroll + ' scroll-area '">
        <!-- options &&  -->
        <div v-if="prompt.state" class="q-mb-md">
          <q-input filled outlined dense ref="inputRef" :type="prompt.type" :label="prompt.label" v-model="inputModel"
            @keyup.enter="onOKClick()" :rules="prompt.isValid" color="primary" :mask="prompt.mask"
            :fill-mask="prompt.fillMask" :hint="prompt.hint">
            <template v-if="prompt.clearable && inputModel" v-slot:append>
              <q-icon name="cancel" @click.stop.prevent="inputModel = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <!-- options &&  -->
        <div v-if="options.state" class="q-mb-md">
          <q-option-group checked-icon="visibility" :options="options.items" :type="options.type" v-model="optionsModel"
            :inline="options.inline" :multiple="false">
            <template v-slot:label="opt">
              <div class="row items-center">
                <span class="text-teal">{{ opt.label }}</span>
                <q-icon :name="opt.icon" color="teal" size="1.5em" class="q-ml-sm" />
              </div>
            </template>
            <template v-slot:label-0="opt">
              <span class="text-weight-bold">{{ opt.label }}</span>
              <span> (has QTooltip)</span>
              <q-tooltip class="bg-primary" :offset="[0, 0]">Tooltip</q-tooltip>
            </template>
          </q-option-group>
        </div>
        <div v-if="propmtFile.state" class="q-mb-md">
          <q-file dense v-model="fileModel" label="Evidencia" clearable
            accept=".zip,.rar,.7zip,.pdf,.png,.jpg,.jpeg,.pptx,.docx,.xlsx">
            <!-- :rules="[rules.required,rules.fileSize]" -->
            <!-- style="max-width: 300px;padding-right: 10px;" -->
            <template v-if="fileModel === null" v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
            <template v-slot:file="{ file }">
              <q-chip class="full-width q-my-xs" square>
                <q-avatar>
                  <q-icon :name="file.type.indexOf('video/') === 0
                    ? 'movie'
                    : (file.type.indexOf('image/') === 0
                      ? 'photo'
                      : (file.type.indexOf('audio/') === 0
                        ? 'audiotrack'
                        : 'insert_drive_file'
                      )
                    )" />
                </q-avatar>
                <div class="ellipsis relative-position">
                  {{ file.name }}
                </div>
                <q-tooltip>
                  {{ file.name }}
                </q-tooltip>
              </q-chip>
            </template>
          </q-file>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="primary" flat dense label="Aceptar"
          @click="prompt.state || options.state ? inputRef.validate() ? onOKClick() : '' : onOKClick()" />
        <q-btn color="negative" flat dense label="Cancelar" @click="onCancelClick" />
      </q-card-actions>
      <q-inner-loading v-if="innerLoading" color="primary" :dark="false" class="bg-white" :showing="visible"
        label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em">
        <q-spinner-gears size="3rem" color="primary" />
        <div class="q-my-md text-subtitle1 text-primary">Please wait...</div>
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { useDialogPluginComponent, QSpinner, QDialogProps, QDialog } from 'quasar'
import { ref, onMounted, computed } from 'vue';
import type { Prop, PropType } from 'vue'

interface Props {
  title?: string;
  persistent?: boolean;
  position?: "standard" | "top" | "right" | "bottom" | "left";
  width?: number;
  maxHeight?: string;
  scroll?: string;
  spinner?: boolean;
  cardClass?: string;
  innerLoading?: boolean;
  someFn?: any;
  prompt: {
    state?: boolean;
    type?: "number" | "search" | "textarea" | "time" | "text" | "password" | "email" | "tel" | "file" | "url" | "date";
    label?: string;
    model?: string | number;
    clearable?: boolean;
    isValid?: ((val: any) => boolean | string)[];
    hint?: string;
    fillMask?: string;
    mask?: string;
  };
  options: {
    state: boolean;
    type?: "radio" | "checkbox" | "toggle";
    model?: string;
    inline?: boolean;
    items?: Array<any>;
  };
  propmtFile: {
    state: boolean;
    model?: string;
  };
}

const opts = withDefaults(defineProps<Props>(), {
  title: 'Default Title',
  persistent: true,
  position: 'standard',
  width: 400,
  maxHeight: '60vh',
  scroll: 'scroll',
  spinner: false,
  cardClass: '',
  innerLoading: false,
})

// const opts = defineProps({
//   title: {
//     type: String,
//     default: 'Titulo'
//   },
//   persistent: {
//     type: Boolean,
//     default: true
//   },
//   position: Object as PropType<Position>,
//   width: {
//     type: Number,
//     default: 400
//   },
//   maxHeight: {
//     type: String,
//     default: '60vh'
//   },
//   scroll: {
//     type: String,
//     default: 'scroll',
//   },
//   prompt: Object as PropType<Prompt>,
//   options: Object as PropType<Options>,
//   spinner: {
//     type: Boolean,
//     default: false
//   },
//   cardClass: {
//     type: String,
//     default: ''
//   },
//   innerLoading: {
//     type: Boolean,
//     default: false,
//   },
//   someFn: Function,
// })
// vars para prompt
const props = ref<any>(opts);
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
defineEmits([...useDialogPluginComponent.emits])

const inputRef = ref<any>(null)
const inputModel = ref<any>(props.value.prompt.model)
// vars para file
const fileModel = ref<any>(null)
//vars para options
const optionsModel = ref<any>([]);
// vars para inner loading
const visible = ref<boolean>(false);

// METHODS
const onOkClickLoading = (payload: any) => {
  visible.value = true
  // showSimulatedReturnData.value = false
  setTimeout(() => {
    visible.value = false
    // showSimulatedReturnData.value = true
    onDialogOK(payload)
  }, 2000)
}

const onOKClick = () => {

  const payload = {
    prompt: inputModel.value,
    options: optionsModel.value,
    file: fileModel.value
  };

  if (props.value.innerLoading) {
    onOkClickLoading(payload)
  } else {
    onDialogOK(payload)
  }
}

const onCancelClick = () => {
  onDialogCancel()
}

const onOKInvald = () => {
  alert('Invalido')
}

</script>
<style lang="sass">

.scroll-area::-webkit-scrollbar
  width: 5px
.scroll-area::-webkit-scrollbar-thumb
  border-radius: 5px
  background-color: #ccc

</style>
