import { inject, Ref, ref } from 'vue'
import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useCrypto } from '@composable/crypto/useCrypto'

const { decryptAES, encryptAES } = useCrypto();

export enum HttpMethods {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export interface IHttpResourceOption {
  baseUrl?: string
  path: string
  method: HttpMethods
  headers?: Record<string, any>
  header?: Record<string, any>
  params?: Record<string, any>
  data?: Record<string, any>
  timeout?: number
  auth?: Record<string, any>
  responseType?: string
  token?: string
  nameToken?: string
  download?: boolean
  nameDocument?: string
}

export interface IHttpResponse {
  responseCode: string
  responseAction: string
  status: boolean
  data: any[]
  title?: string
  message: string
  otherMessage: string
  otherData: any[]
}

export function useFetchHttp() {
  /****************************************************************************/
  /*                             VARIABLES                                    */
  /****************************************************************************/

  const loading: Ref<boolean> = ref<boolean>(false)


  /****************************************************************************/
  /*                             METHODS                                      */
  /****************************************************************************/

  const _onRequestSuccess = async (response: any) => {
    //console.log('RESPONSE: ', response);
    return response;
  }

  const _onRequestFailure = async (error: any) => {
    const { response } = error;
    console.log('ERROR: ', response);
    if (response.status == 401) {
      localStorage.clear();
      console.log(import.meta.env.VITE_CLIENT_URL, 'ingresa aca -----');
      console.log(window.URL + 'url antes de login');
      //window.location.href = import.meta.env.VITE_CLIENT_URL + 'login?toUrl=' + window.location.href;
    } else {
      return Promise.reject(error);
    }
  };

  const fetchHttpResource = async (options: IHttpResourceOption, loading = true): Promise<IHttpResponse> => {
    //console.log(options, 'options');
    //const token = decryptAES(localStorage.getItem(options.nameToken ?? import.meta.env.VITE_NAME_TOKEN))

    const token: string | null = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL2xvZ2luIiwiaWF0IjoxNjg3NDY4Mzk3LCJleHAiOjE2ODc1NTQ3OTcsIm5iZiI6MTY4NzQ2ODM5NywianRpIjoibEtkcWVjZGRIQ0Q4TmQyYSIsInN1YiI6IntcImlkdXN1YXJpb1wiOjF9IiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.V8hc5jNOn3EkRqDbXvWORcDM0LQkesAH6NxrFKdZNEk'
    // options.token ? options.token : decryptAES(localStorage.getItem(options.nameToken ?? import.meta.env.VITE_NAME_TOKEN))
    const authorization: { authorization?: string } = {}

    if (token !== null && token !== '') {
      authorization['authorization'] = `Bearer ${token}`
    }

    const url = `${options.baseUrl ?? import.meta.env.VITE_CLIENT_API_URL}${options.path}`
    const method: string = options.method
    const headers: Record<string, any> =
      options.headers ?? false
        ? { ...authorization, ...options.headers }
        : {
          'content-type': 'application/json; charset=utf-8',
          ...authorization,
        }
    const params: Record<string, any> = options.params ?? {}
    const data: Record<string, any> = options.data ?? {}
    const timeout: number = options.timeout ?? 0
    const auth: Record<string, any> | null = options.auth ?? null
    const download: boolean = options.download ?? false
    const responseType: string = options.responseType ?? download ? 'blob' : 'json'
    let response: AxiosResponse | null
    let body: IHttpResponse

    if (loading) showLoad()

    try {
      const response = await axios(<AxiosRequestConfig>{ url, method, headers, params, data, timeout, auth, responseType });
      if (download) {
        body = await downloadResource(response, response?.headers['file-name'])
      } else {
        body = response?.data as IHttpResponse
      }
    } catch (err) {
      if (loading) hideLoad()
      body = await catchAxiosError(err)
    }

    if (loading) hideLoad()

    return body
  }

  const showLoad = () => {
    loading.value = true
    //showLoading()
  }

  const hideLoad = () => {
    loading.value = false
    //hideLoading()
  }

  const downloadResource = async (response: AxiosResponse | null, name: string): Promise<IHttpResponse> => {
    if (response === null)
      return {
        responseCode: 'IKERR',
        responseAction: '',
        status: false,
        data: [],
        message: 'No se pudo descargar el recurso específico',
        otherMessage: '',
        otherData: [],
      } as IHttpResponse

    //console.log(response, 'responseeee');
    if (response?.headers['content-type'] === 'application/json') {
      const blob: Blob = new Blob([response?.data])
      const text: string = await blob.text()
      const res: IHttpResponse = JSON.parse(text)
      //console.log('-> dw ->', res)
      if (!res.status) {
        /*await showAlert({
          dismissible: true,
          title: 'IKube',
          text: res?.message ?? 'No se pudo descargar el recurso específico',
          showCloseButton: true,
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: 'Cerrar',
          confirmButtonText: 'Confirmar',
        })*/
        return res
      }
    }

    const url = window.URL.createObjectURL(new Blob([response?.data]))
    const link = document.createElement('a')
    link.href = url

    link.setAttribute('download', name)
    link.click()
    link.remove()

    return {
      responseCode: 'IKSUC',
      responseAction: '',
      status: true,
      data: [],
      message: 'Descarga realizada',
      otherMessage: '',
      otherData: [],
    } as IHttpResponse
  }

  const catchAxiosError = async (err: any): Promise<IHttpResponse> => {
    let body: IHttpResponse = {
      responseCode: 'IKERR',
      responseAction: '',
      status: false,
      data: [],
      message: 'Ha sucedido un inconveniente en la solicitud HTTP',
      otherMessage: '',
      otherData: [],
    }

    if (axios.isAxiosError(err)) {
      const error: AxiosError = err
      const response = err.response as AxiosResponse
      body = response?.data ?? body
      if (error?.code === 'ERR_NETWORK') {
        return onNetworkError()
      } else if (error?.code === 'ERR_BAD_REQUEST' && error.response?.status === 401) {
        return onUnauthorized(response)
      } else if (error?.code === 'ERR_BAD_REQUEST' && error.response?.status === 404) {
        return onNotFound(response)
      }
    }

    return body
  }

  const onNetworkError = (): IHttpResponse => {
    return {
      responseCode: 'IKERR',
      responseAction: '',
      status: false,
      data: [],
      message: 'Ha sucedido un error en la red, se recomienda revisar su conexión a internet',
      otherMessage: '',
      otherData: [],
    }
  }

  const onUnauthorized = (response: AxiosResponse): IHttpResponse => {
    return {
      responseCode: 'IKERR',
      responseAction: '',
      status: false,
      data: [],
      message: response?.data?.message ?? 'Recurso no autorizado',
      otherMessage: '',
      otherData: [],
    }

    //localStorage.removeItem(import.meta.env.VITE_NAME_TOKEN ?? '')
    //window.location.href = import.meta.env.VITE_CLIENT_LOGIN_URL
  }

  const onNotFound = (response: AxiosResponse): IHttpResponse => {
    return {
      responseCode: 'IKERR',
      responseAction: '',
      status: false,
      data: [],
      message: response?.data?.message ?? 'No se encontró el recurso específico',
      otherMessage: '',
      otherData: [],
    }
  }

  /****************************************************************************/
  /*                              INJECT                                      */
  /****************************************************************************/
  /*const { showAlert } = inject('$ex-alert', {
    showAlert: (options: IExAlertOptions) => Promise,
  })*/
  axios.interceptors.response.use(_onRequestSuccess, _onRequestFailure);

  return { loading, fetchHttpResource }
}
