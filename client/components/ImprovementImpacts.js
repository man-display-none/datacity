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
      <h3>Est. Savings</h3>
      <h5
        className={
          electricityImprovement <= 0 || isNaN(electricityImprovement)
            ? 'unChanged'
            : 'changed'
        }
      >
        Electricity:{' '}
        {isNaN(electricityImprovement)
          ? 'N/A'
          : electricityImprovement.toFixed(0) + ' kWh'}
      </h5>
      <h5
        className={
          fuelImprovement <= 0 || isNaN(fuelImprovement)
            ? 'unChanged'
            : 'changed'
        }
      >
        Fuel:{' '}
        {isNaN(fuelImprovement) ? 'N/A' : fuelImprovement.toFixed(0) + ' Kbtu'}
      </h5>
      <h5
        className={
          waterImprovment <= 0 || isNaN(waterImprovment)
            ? 'unChanged'
            : 'changed'
        }
      >
        Water:{' '}
        {isNaN(waterImprovment)
          ? 'N/A'
          : waterImprovment.toFixed(0) + ' Gallons'}
      </h5>
      <h5
        className={
          emissionsImprovement <= 0 || isNaN(emissionsImprovement)
            ? 'unChanged'
            : 'changed'
        }
      >
        GHG Emissions:{' '}
        {isNaN(emissionsImprovement)
          ? 'N/A'
          : emissionsImprovement.toFixed(0) + ' Tons'}
      </h5>
      <h5 className={costImprovement <= 0 ? 'unChanged' : 'changed'}>
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
