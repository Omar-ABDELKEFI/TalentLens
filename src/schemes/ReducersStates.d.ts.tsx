import { ModelsLoginInput } from '../myApi';


export interface IReducerStates {
  router?: any
  loggingIn?: boolean
  user?: ModelsLoginInput | string
  error?: string
  loading?: boolean

}
