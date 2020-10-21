//ACTION TYPE
export const FILTER_APPLIED = 'FILTER_APPLIED'
//ACTION CREATOR
export const filterApplied = filter => ({type: FILTER_APPLIED, filter})
//THUNK CREATOR
export const filterApply = filter => dispatch => {
  dispatch(filterApplied(filter))
}
//INITIAL STATE
const initialState = {}
//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case FILTER_APPLIED:
      return action.filter
    default:
      return state
  }
}
