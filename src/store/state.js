import {storeLocal} from './browserStore'
import initRoutes from './initRoutes'

const state = {
  AccessId: storeLocal.get('AccessId') || ''
}

export default state
