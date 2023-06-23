import { HttpMethods, IHttpResourceOption } from "@/composable/fetch/useFetchHttp";

type KeyResource = 'matrizAcuerdos'

const resources: Record<KeyResource, IHttpResourceOption> = {
  matrizAcuerdos: <IHttpResourceOption>{
    path: '/actas-matriz',
    method: HttpMethods.Get
  },
}
export { resources }
