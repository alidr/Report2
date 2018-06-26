import * as types from './mutation-types'
import { storeLocal } from './browserStore'
import initRoutes from './initRoutes'

const mutations = {
  [types.SET_ACCESSID](state, AccessId) {
    storeLocal.set('AccessId', AccessId)
    state.AccessId = AccessId
  }
}

export default mutations
