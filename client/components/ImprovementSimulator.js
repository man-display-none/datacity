import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updatedInfo, updatedModel} from '../store/buildingInfo'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

class ImprovementSimulator extends Component {
  constructor() {
    super()
    this.state = {
      emissions: 0,
      electricity: 0,
      fuel: 0,
      water: 0,
      cost: 0,
      lightingChecked: false,
      airSealed: false,
      solarInstalled: false,
      unRendered: true
    }
    this.lightingImprovement = this.lightingImprovement.bind(this)
    this.solarInstall = this.solarInstall.bind(this)
    this.airSealing = this.airSealing.bind(this)
    this.reset = this.reset.bind(this)
  }
  renderModel() {
    console.log('impsim')
    const {
      electricityUse,
      fuelUse,
      waterUse,
      ghgEmissions,
      totalEnergyCost
    } = this.props.buildingModel
    if (this.state.unRendered === true) {
      this.setState({
        electricity: electricityUse,
        fuel: fuelUse,
        water: waterUse,
        emissions: ghgEmissions,
        cost: totalEnergyCost,
        unRendered: false
      })
    }
  }
  lightingImprovement() {
    const {electricity, emissions, cost} = this.state
    if (this.state.lightingChecked === false) {
      this.setState({
        electricity: electricity * 0.98,
        emissions: emissions * 0.98,
        cost: cost * 0.98,
        lightingChecked: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.98,
        emissions: emissions / 0.98,
        cost: cost / 0.98,
        lightingChecked: false
      })
    }
  }
  solarInstall() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.solarInstalled === false) {
      this.setState({
        electricity: electricity * 0.8,
        fuel: fuel * 0.8,
        emissions: emissions * 0.8,
        cost: cost * 0.8,
        solarInstalled: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.8,
        fuel: fuel / 0.8,
        emissions: emissions / 0.8,
        cost: cost / 0.8,
        solarInstalled: false
      })
    }
  }
  airSealing() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.airSealed === false) {
      this.setState({
        electricity: electricity * 0.96,
        fuel: fuel * 0.96,
        emissions: emissions * 0.96,
        cost: cost * 0.96,
        airSealed: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.96,
        fuel: fuel / 0.96,
        emissions: emissions / 0.96,
        cost: cost / 0.96,
        airSealed: false
      })
    }
  }
  reset() {
    document.getElementById('lighting').checked = false
    document.getElementById('airsealing').checked = false
    document.getElementById('solar').checked = false
    this.setState({
      unRendered: true,
      lightingChecked: false,
      solarInstalled: false,
      airSealed: false
    })
  }
  render() {
    return (
      <div className="simulator">
        <div className="calculator">
          <form>
            <h3>Improvement Options</h3>
            <input
              name="lighting"
              type="checkbox"
              id="lighting"
              onChange={this.lightingImprovement}
            />
            <label>Lighting improvement</label>
            <input
              name="airsealing"
              type="checkbox"
              id="airsealing"
              onChange={this.airSealing}
            />
            <label>Insulation improvement</label>
            <input
              name="solar"
              type="checkbox"
              id="solar"
              onChange={this.solarInstall}
            />
            <label>Install solar</label>
            <button type="button" onClick={this.reset}>
              Reset
            </button>
          </form>
        </div>
        <div className="model-info">
          {this.props.buildingModel && this.renderModel()}
        </div>
        <div id="experiment">
          <div>
            {/* <BuildingModel /> */}
            <h3>Projected</h3>
            <h5>Electricity: {this.state.electricity.toFixed(0)} kWh</h5>
            <h5>Fuel: {this.state.fuel.toFixed(0)} Kbtu</h5>
            <h5>Water: {this.state.water.toFixed(0)} Gallons</h5>
            <h5>GHG Emissions: {this.state.emissions.toFixed(0)} Tons</h5>
            <h5>
              Total cost: {formatter.format(this.state.cost).slice(0, -3)}
            </h5>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log(state)
  return {
    buildingData: state.buildingInfoReducer.buildingData,
    buildingModel: state.buildingInfoReducer.buildingModel
  }
}
const mapDispatch = dispatch => {
  return {
    updateInfo: buildingId => dispatch(updatedInfo(buildingId)),
    updateModel: buildingId => dispatch(updatedModel(buildingId))
  }
}
export default connect(mapState, mapDispatch)(ImprovementSimulator)
