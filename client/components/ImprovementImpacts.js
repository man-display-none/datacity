import React, {useRef} from 'react'
import {connect} from 'react-redux'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const ImprovementImpacts = props => {
  const {cost, electricity, emissions, fuel, water} = props.changes
  const {
    totalEnergyCost,
    electricityUse,
    ghgEmissions,
    fuelUse,
    waterUse
  } = props.buildingModel
  const electricityImprovement = electricityUse - electricity
  const fuelImprovement = fuelUse - fuel
  const emissionsImprovement = ghgEmissions - emissions
  const costImprovement = totalEnergyCost - cost
  const waterImprovment = waterUse - water
  return (
    <section className="impacts">
      <h3>Savings</h3>
      <h5 className={electricityImprovement === 0 ? 'unChanged' : 'changed'}>
        Electricity: {electricityImprovement.toFixed(0)} kWh
      </h5>
      <h5 className={fuelImprovement === 0 ? 'unChanged' : 'changed'}>
        Fuel: {fuelImprovement.toFixed(0)} Kbtu
      </h5>
      <h5 className={waterImprovment === 0 ? 'unChanged' : 'changed'}>
        Water: {waterImprovment.toFixed(0)} Gallons
      </h5>
      <h5 className={emissionsImprovement === 0 ? 'unChanged' : 'changed'}>
        GHG Emissions: {emissionsImprovement.toFixed(0)} Tons
      </h5>
      <h5 className={costImprovement === 0 ? 'unChanged' : 'changed'}>
        Total cost: {formatter.format(costImprovement).slice(0, -3)}
      </h5>
    </section>
  )
}

function mapState(state) {
  return {
    buildingModel: state.buildingInfoReducer.buildingModel
  }
}

export default connect(mapState)(ImprovementImpacts)
