import axios from 'axios'
import Building from '../calculator'

//initial state
const initialState = []

//action type
const GET_BUILDING_INFO = 'GET_BUILDING_INFO'

const GET_BUILDING_MODEL = 'GET_BUILDING_MODEL'

//action creator
export const getBuildingInfo = buildData => {
  return {
    type: GET_BUILDING_INFO,
    buildData
  }
}

export const getBuildingModel = modelData => {
  return {
    type: GET_BUILDING_MODEL,
    modelData
  }
}

const totalUse = arr => {
  let total = 0
  arr.forEach(use => {
    if (!isNaN(Number(use))) {
      total += Number(use)
    }
  })
  return total
}

export const updatedModel = bbl => {
  return async dispatch => {
    try {
      const {data: buildData} = await axios.get(
        `https://data.cityofnewyork.us/resource/qb3v-bbre.json?bbl_10_digits=${bbl}`
      )
      const {
        electricity_use_grid_purchase,
        electricity_use_grid_purchase_1,
        fuel_oil_1_use_kbtu,
        fuel_oil_2_use_kbtu,
        fuel_oil_4_use_kbtu,
        fuel_oil_5_6_use_kbtu,
        natural_gas_use_kbtu,
        kerosene_use_kbtu,
        diesel_2_use_kbtu,
        total_ghg_emissions_metric,
        water_use_all_water_sources,
        district_steam_use_kbtu
      } = buildData[0]
      const totalElectricity =
        totalUse([
          electricity_use_grid_purchase,
          electricity_use_grid_purchase_1
        ]) || 'Not Available'

      const totalFuel =
        totalUse([
          fuel_oil_1_use_kbtu,
          fuel_oil_2_use_kbtu,
          fuel_oil_4_use_kbtu,
          fuel_oil_5_6_use_kbtu,
          natural_gas_use_kbtu,
          kerosene_use_kbtu,
          diesel_2_use_kbtu,
          district_steam_use_kbtu
        ]) || 'Not Available'

      const totalWater =
        totalUse([water_use_all_water_sources]) || 'Not Available'

      const ghg = totalUse([total_ghg_emissions_metric]) || 'Not Available'

      const buildingModel = new Building(
        totalElectricity,
        totalFuel,
        totalWater,
        ghg
      )
      dispatch(getBuildingModel(buildingModel))
    } catch (error) {
      console.log(error)
    }
  }
}

//thunk
export const updatedInfo = bbl => {
  return async dispatch => {
    try {
      const {data: buildData} = await axios.get(
        `https://data.cityofnewyork.us/resource/qb3v-bbre.json?bbl_10_digits=${bbl}`
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
      return {
        buildingData: action.buildData[0]
      }
    case GET_BUILDING_MODEL:
      return {buildingModel: action.modelData}
    default:
      return state
  }
}

export default buildingInfoReducer
