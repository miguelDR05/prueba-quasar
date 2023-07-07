import { Dialog, Notify, QSpinnerGears, useDialogPluginComponent } from 'quasar'
import { ref, defineComponent, watch, nextTick, defineAsyncComponent } from 'vue'
import alert from '@components/alerts/alert.vue'
import AlertTemplate from '@components/alerts/AlertTemplate.vue'

export function useAlert() {

  /****************************************************************************/
  /*                             METHODS                                      */
  /****************************************************************************/
  interface PropsAlert {
    title?: string,
    mensaje?: string,
    type?: "success" | "error" | "question" | "information" | "warning",
    cancel?: boolean,
    position?: "standard" | "top" | "right" | "bottom" | "left" | undefined
    persistent?: boolean,
    width?: number,
  }

  const singleAlert = async ({ title = '', mensaje = 'Nuevo Mensaje', type = 'success', cancel = false, position = 'standard', persistent = false,
    width = 400 }: PropsAlert) => {
    return new Promise((resolve, reject) => {
      Dialog.create({
        component: AlertTemplate,
        componentProps: {
          title: title,
          mensaje: mensaje,
          type: type,
          cancel: cancel,
          position: position,
          persistent: persistent,
          width: width,
        },
      }).onOk((data) => {
        resolve(true);
      }).onCancel(() => {
        resolve(false);
      }).onDismiss(() => {
        // console.log('Hide Dialog');
      });
    });
  }

  interface Prompt {
    state: boolean,
    type?: string,
    label?: string,
    isValid?: Array<any>
  }

  interface Options {
    state: boolean,
    type?: string,
    model?: string,
    inline?: boolean,
    items?: Array<any>
  }

  interface PromptOptions {
    title?: string;
    spinner?: boolean;
    position?: "standard" | "top" | "right" | "bottom" | "left" | undefined;
    width?: number;
    cardClass?: string;
    innerLoading?: boolean;
    // prompt?: Prompt;
    // options?: Options;
    prompt?: {
      state?: boolean;
      type?: "number" | "search" | "textarea" | "time" | "text" | "password" | "email" | "tel" | "file" | "url" | "date" | undefined;
      label?: string;
      model?: string | number;
      isValid?: ((val: any) => boolean | string)[];
      clearable?: boolean,
      hint?: string,
      fillMask?: string,
      mask?: string,
    };
    options?: {
      state?: boolean;
      type?: "radio" | "checkbox" | "toggle" | undefined;
      model?: string;
      inline?: boolean;
      items?: { label: string; value: string; color?: string; disable?: boolean }[];
    };
    propmtFile?: {
      state?: boolean;
      model?: string;
    };
  }

  const promptAlert = async ({ title = 'Aqui va el titulo', spinner = false, position = 'standard', width = 400, prompt = {}, options = {}, propmtFile = { state: false, model: 'a' },
    cardClass = 'bg-white', innerLoading = false }: PromptOptions) => {
    const defaultPrompt = {
      state: false,
      type: 'text',
      label: '',
      isValid: [],
      model: '',
      //(val: any) => val.length <= 3 || 'Maximo 3 digitos',
      //(val: any) => val.length > 0 || 'Minimo 1 digito'
      clearable: false,
      hint: '',
      fillMask: '',
      mask: ''
    };
    const defaultOptions = {
      state: false,
      type: 'checkbox',
      model: 'multiple',
      inline: true,
      items: [
        { label: 'Option 1', value: 'opt1', color: 'secondary' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3', disable: true }
      ],
      props: [
        { checked_icon: "visibility" }
      ],
    };

    return new Promise((resolve, reject) => {
      Dialog.create({
        component: alert,
        componentProps: {
          title: title,
          spinner: spinner,
          position: position,
          width: width,
          prompt: { ...defaultPrompt, ...prompt },
          options: { ...defaultOptions, ...options },
          cardClass: cardClass,
          innerLoading: innerLoading,
          propmtFile: propmtFile,
        },
      }).onOk((data) => {
        resolve({ state: true, data: data });
        // Notify.create({ type: 'positive', message: `Successfully ${data.prompt} saved!` })
      }).onCancel(() => {
        resolve(false);
        Notify.create({ type: 'info', message: `Cancelado!` })
      }).onDismiss(() => {
        console.log('Hide Dialog');
      });
    })
  }

  return { promptAlert, singleAlert }
}
