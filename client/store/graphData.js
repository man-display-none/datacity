import axios from 'axios'

//action types
const GOT_ENERGY_RATING = 'GOT_ENERGY_RATING'
const GOT_ELECTRICITY_USAGE = 'GOT_ELECTRICITY_USAGE'
const GOT_FUEL_USAGE = 'GOT_FUEL_USAGE'
const GOT_NORMALIZED_USAGE = 'GOT_NORMALIZED_USAGE'
const GOT_EMISSIONS_USAGE = 'GOT_EMISSIONS_USAGE'

//action creators
export const getEnergyRating = energyData => {
  return {
    type: GOT_ENERGY_RATING,
    energyData
  }
}
export const getElectricyUsage = electricityData => {
  return {
    type: GOT_ELECTRICITY_USAGE,
    electricityData
  }
}
export const getFuelUsage = fuelData => {
  return {
    type: GOT_FUEL_USAGE,
    fuelData
  }
}
export const getNormalizedUsage = normalizedData => {
  return {
    type: GOT_NORMALIZED_USAGE,
    normalizedData
  }
}
export const getEmissionsUsage = emissionsData => ({
  type: GOT_EMISSIONS_USAGE,
  emissionsData
})
//thunk
export const getGraphInfo = baseBbl => {
  return async dispatch => {
    try {
      //Promise.all()
      const {data: data2019} = await axios.get(
        `https://data.cityofnewyork.us/resource/28fi-3us3.json?bbl_10_digits=${baseBbl}`
      )
      const {data: data2018} = await axios.get(
        `https://data.cityofnewyork.us/resource/vdzd-yy49.json?bbl_10_digits=${baseBbl}`
      )
      const {data: data2017} = await axios.get(
        `https://data.cityofnewyork.us/resource/n2mv-q2ia.json?bbl_10_digits=${baseBbl}`
      )
      const {data: data2016} = await axios.get(
        `https://data.cityofnewyork.us/resource/8u86-bviy.json?bbl_10_digits=${baseBbl}`
      )
      //const {data: data2015} = await axios.get(
      //   `https://data.cityofnewyork.us/resource/hypw-js3b.json?bbl_10_digits=${baseBbl}`
      // )

      const allData = [data2016[0], data2017[0], data2018[0], data2019[0]]
      const dispatchData = (data, key) => {
        // let x = Object.from(...args)
        // console.log(x)
        return data.map(value => {
          let result = 0
          if (
            value === undefined ||
            value === 'Not Available' ||
            value == null
          ) {
            return result
          } else {
            return +value[key]
          }
        })
      }
      dispatch(getEnergyRating(dispatchData(allData, 'energy_star_score')))
      dispatch(
        getEmissionsUsage(dispatchData(allData, 'total_ghg_emissions_metric'))
      )
      dispatch(
        getElectricyUsage(
          dispatchData(allData, 'electricity_use_grid_purchase')
        )
      )

      //   dispatch(getFuelUsage())
      //   dispatch(getNormalizedUsage())
    } catch (error) {
      console.log(error)
    }
  }
}

const graphInfoReducer = (
  state = {
    energyRating: [],
    electrictyUsage: [],
    fuelUsage: [],
    normalizedUsage: [],
    ghgEmissions: []
  },
  action
) => {
  switch (action.type) {
    case GOT_ENERGY_RATING: {
      return {...state, energyRating: action.energyData}
    }
    case GOT_ELECTRICITY_USAGE: {
      return {...state, electricityUsage: action.electricityData}
    }
    case GOT_FUEL_USAGE: {
      return {...state, fuelUsage: action.fuelData}
    }
    case GOT_NORMALIZED_USAGE: {
      return {...state, normalizedUsage: action.normalizedData}
    }
    case GOT_EMISSIONS_USAGE: {
      return {...state, ghgEmissions: action.emissionsData}
    }
    default:
      return state
  }
}

export default graphInfoReducer
