import axios from 'axios'

//initial state
const initialState = []

//action type
const GET_BUILDING_INFO = 'GET_BUILDING_INFO'

//action creator
export const getBuildingInfo = buildData => {
  return {
    type: GET_BUILDING_INFO,
    buildData
  }
}

//thunk
export const updatedInfo = baseBbl => {
  return async dispatch => {
    try {
      const {data: buildData} = await axios.get(
        `https://data.cityofnewyork.us/resource/s75a-ei9u.json?$where=base_bbl=${baseBbl}`
      )
      dispatch(getBuildingInfo(buildData))
    } catch (error) {
      console.log(error)
    }
  }
}

const buildingInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUILDING_INFO:
      return action.buildData
    default:
      return state
  }
}

export default buildingInfoReducer
