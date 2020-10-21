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
      lowFlowInstalled: false,
      roofInsulationInstalled: false,
      vfdInstalled: false,
      windowsInstalled: false,
      unRendered: true
    }
    this.lightingImprovement = this.lightingImprovement.bind(this)
    this.solarInstall = this.solarInstall.bind(this)
    this.airSealing = this.airSealing.bind(this)
    this.lowFlow = this.lowFlow.bind(this)
    this.roofInsulation = this.roofInsulation.bind(this)
    this.vfd = this.vfd.bind(this)
    this.windows = this.windows.bind(this)
    this.reset = this.reset.bind(this)
  }
  componentDidMount() {
    this.renderModel()
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
  lowFlow() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.lowFlowInstalled === false) {
      this.setState({
        electricity: electricity * 0.93,
        fuel: fuel * 0.93,
        emissions: emissions * 0.93,
        cost: cost * 0.93,
        lowFlowInstalled: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.93,
        fuel: fuel / 0.93,
        emissions: emissions / 0.93,
        cost: cost / 0.93,
        lowFlowInstalled: false
      })
    }
  }
  roofInsulation() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.roofInsulationInstalled === false) {
      this.setState({
        electricity: electricity * 0.97,
        fuel: fuel * 0.97,
        emissions: emissions * 0.97,
        cost: cost * 0.97,
        roofInsulationInstalled: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.97,
        fuel: fuel / 0.97,
        emissions: emissions / 0.97,
        cost: cost / 0.97,
        roofInsulationInstalled: false
      })
    }
  }
  vfd() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.vfdInstalled === false) {
      this.setState({
        electricity: electricity * 0.96,
        fuel: fuel * 0.96,
        emissions: emissions * 0.96,
        cost: cost * 0.96,
        vfdInstalled: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.96,
        fuel: fuel / 0.96,
        emissions: emissions / 0.96,
        cost: cost / 0.96,
        vfdInstalled: false
      })
    }
  }
  windows() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.windowsInstalled === false) {
      this.setState({
        electricity: electricity * 0.96,
        fuel: fuel * 0.96,
        emissions: emissions * 0.96,
        cost: cost * 0.96,
        windowsInstalled: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.96,
        fuel: fuel / 0.96,
        emissions: emissions / 0.96,
        cost: cost / 0.96,
        windowsInstalled: false
      })
    }
  }
  reset() {
    document.getElementById('lighting').checked = false
    document.getElementById('airsealing').checked = false
    document.getElementById('solar').checked = false
    document.getElementById('lowflow').checked = false
    document.getElementById('roof-insulation').checked = false
    document.getElementById('VFD').checked = false
    document.getElementById('windows').checked = false
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
        <div className="projected">
          <h3>Projected</h3>
          <h5>Electricity: {this.state.electricity.toFixed(0)} kWh</h5>
          <h5>Fuel: {this.state.fuel.toFixed(0)} Kbtu</h5>
          <h5>Water: {this.state.water.toFixed(0)} Gallons</h5>
          <h5>GHG Emissions: {this.state.emissions.toFixed(0)} Tons</h5>
          <h5>Total cost: {formatter.format(this.state.cost).slice(0, -3)}</h5>
        </div>
        <form className="improvement-options">
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
          <input
            name="lowflow"
            type="checkbox"
            id="lowflow"
            onChange={this.lowFlow}
          />
          <label>Install lowflow faucets + showerheads</label>
          <input
            name="roof-insulation"
            type="checkbox"
            id="roof-insulation"
            onChange={this.roofInsulation}
          />
          <label>Improve roof insulation</label>
          <input name="VFD" type="checkbox" id="VFD" onChange={this.vfd} />
          <label>Improve motors/install VFDs</label>
          <input
            name="windows"
            type="checkbox"
            id="windows"
            onChange={this.windows}
          />
          <label>Replace windows</label>
          <button type="button" onClick={this.reset}>
            Reset
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
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
