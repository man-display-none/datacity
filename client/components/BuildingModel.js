import React from 'react'
import {connect} from 'react-redux'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
  // minimumFractionDigits: 1
})

const BuildingModel = ({buildingModel}) => {
  const {
    electricityUse,
    fuelUse,
    waterUse,
    ghgEmissions,
    totalEnergyCost
  } = buildingModel
  return (
    <div>
      <h3>Current</h3>
      <h5>Electricity: {electricityUse.toFixed(0)} kWh</h5>
      <h5>Fuel: {fuelUse.toFixed(0)} Kbtu</h5>
      <h5>Water: {waterUse.toFixed(0)} Gallons</h5>
      <h5>GHG Emissions: {ghgEmissions.toFixed(0)} Tons</h5>
      <h5>Total cost: {formatter.format(totalEnergyCost).slice(0, -3)}</h5>
    </div>
  )
}

function mapState(state) {
  return {
    buildingModel: state.buildingInfoReducer.buildingModel
  }
}

export default connect(mapState)(BuildingModel)
