/*
 * Action Types
 */
export const UPDATE_CURRENT_SCORE = 'UPDATE_CURRENT_SCORE'
export const UPDATE_POTENTIAL_SCORE = 'UPDATE_POTENTIAL_SCORE'
export const UPDATE_SLIDER = 'UPDATE_SLIDER_VALUE'

export const PICK_ADDRESS = 'PICK_ADDRESS'


/*
 * Action creators
 */
export function updateScore(value) {
  return {
    type: UPDATE_CURRENT_SCORE,
    value
  }
}

export function pickAddress(address) {
  return {
    type: PICK_ADDRESS,
    address
  }
}