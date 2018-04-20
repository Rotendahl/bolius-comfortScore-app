import {
  initialState
} from './initialState.js'
import {
  PICK_ADDRESS,
  UPDATE_CURRENT_SCORE
} from './actions.js'

import {
  combineReducers
} from 'redux'

function actionHandler(state = initialState, action) {
  switch(action.type) {
    case PICK_ADDRESS:
      return Object.assign({}, state, {
        address: action.address
      })
    case UPDATE_CURRENT_SCORE:
      return Object.assign({}, state, {
        score: action.value
      })
    default:
      return state
  }
}

const komfortStore = combineReducers({
  actionHandler
}) 
export default komfortStore