import * as types from './mutation-types'
import { storeLocal, storeSession } from './browserStore'
import initRoutes from './initRoutes'

const mutations = {
  [types.SET_ACCESSID](state, AccessId) {
    storeLocal.set('AccessId', AccessId)
    state.AccessId = AccessId
  },
  [types.SET_DEALERSELECTEDMEMBER](state, DealerSelectedMember) {
    storeSession.set('DealerSelectedMember', DealerSelectedMember)
    state.DealerSelectedMember = DealerSelectedMember
  }
}

export default mutations
