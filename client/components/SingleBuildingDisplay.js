import React, {Component} from 'react'
import {connect} from 'react-redux'
import Graph from './Graphs'
import {updatedInfo, updatedModel} from '../store/buildingInfo'
import {getGraphInfo} from '../store/graphData'
import BuildingModel from './BuildingModel'

class SingleBuildingDisplay extends Component {
  constructor() {
    super()
    this.state = {
      chartData: {
        labels: ['2016', '2017', '2018', '2019'],
        datasets: []
      },
      emissions: 0,
      electricity: 0,
      fuel: 0,
      water: 0,
      cost: 0,
      lightingChecked: false,
      airSealed: false,
      solarInstalled: false
    }
    this.energy = {
      label: 'Energy Star Rating',
      backgroundColor: 'rgba(0,100,0,.2)', //dark green
      borderColor: 'rgba(0,100,0,1)',
      borderWidth: 2,
      data: []
    }
    this.fuel = {
      label: 'Fuel',
      backgroundColor: 'rgba(100,0,0,.2)',
      borderColor: 'rgba(100,0,0,1)',
      borderWidth: 2,
      data: []
    }
    this.electricity = {
      label: 'Electricity Usage',
      backgroundColor: 'rgba(20,40,109,1)',
      borderColor: 'rgba(20,40,109,1)',
      borderWidth: 2,
      data: []
    }
    this.emissions = {
      label: 'emissions GHG',
      backgroundColor: 'rgba(100,100,100,.2)',
      borderColor: 'rgba(100,100,100,1)',
      borderWidth: 2,
      data: []
    }
    this.normalized = {
      label: 'Normalized Data',
      backgroundColor: 'rgba(20,40,109,1)',
      borderColor: 'rgba(20,40,109,1)',
      borderWidth: 2,
      data: []
    }
    this.inputConditions = {
      energy: false,
      fuel: false,
      normalized: false,
      electricity: false,
      emissions: false
      //   solarInstalled: false,
      //   unRendered: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.lightingImprovement = this.lightingImprovement.bind(this)
    this.solarInstall = this.solarInstall.bind(this)
    this.airSealing = this.airSealing.bind(this)
    this.reset = this.reset.bind(this)
  }
  componentDidMount() {
    const buildingId = this.props.match.params.id
    this.props.updateInfo(buildingId)
    this.props.updateModel(buildingId)
    this.props.graphInfo(buildingId)
  }
  renderModel() {
    const {
      electricityUse,
      fuelUse,
      waterUse,
      ghgEmissions,
      totalEnergyCost
    } = this.props.buildingModel
    if (this.state.unRendered === true) {
      console.log('rendermodel')
      this.setState({
        electricity: electricityUse,
        fuel: fuelUse,
        water: waterUse,
        emissions: ghgEmissions,
        cost: totalEnergyCost,
        unRendered: false
      })
    }
    return (
      <div>
        <BuildingModel />
      </div>
    )
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
  handleChange(e) {
    const currentState = this.state.chartData
    const formId = e.target.id
    let placeholder = []

    this.inputConditions[formId] = !this.inputConditions[formId]
    let inputConditionalsArray = Object.keys(this.inputConditions)
    if (this.props.graphData !== undefined) {
      this.energy.data = this.props.graphData.energyRating
      //this.emissions.data = this.props.graphData.ghgEmissions
    }
    for (let i = 0; i < inputConditionalsArray.length; i++) {
      if (this.inputConditions[inputConditionalsArray[i]] == true) {
        placeholder.push(this[inputConditionalsArray[i]])
      }
    }
    this.setState({
      chartData: {...currentState, datasets: placeholder}
    })
  }
  reset() {
    document.getElementById('lighting').checked = false
    document.getElementById('airsealing').checked = false
    document.getElementById('solar').checked = false
    this.setState({
      unRendered: true
    })
  }
  render() {
    return (
      <div className="card-group">
        <div className="card">
          <form>
            <h3>Graph Options</h3>
            <div className="form-check form-inline">
              <input
                name="form-check-input"
                type="checkbox"
                value={this.energy}
                onChange={this.handleChange}
                id="energy"
              />
              <label className="form-check-label" htmlFor="Energy Rating">
                Energy Rating
              </label>
            </div>
            <div className="form-check form-inline">
              <input
                name="form-check-input"
                type="checkbox"
                value={this.electricity}
                onChange={this.handleChange}
                id="electricity"
              />
              <label className="form-check-label" htmlFor="Electricity Usage">
                Electricity Usage
              </label>
            </div>
            <div className="form-check form-inline">
              <input
                name="form-check-input"
                type="checkbox"
                value=""
                onChange={this.handleChange}
                id="fuel"
              />
              <label className="form-check-label" htmlFor="Fuel Usage">
                Fuel Usage
              </label>
            </div>
            <div className="form-check form-inline">
              <input
                name="form-check-input"
                type="checkbox"
                value={this.normalized}
                onChange={this.handleChange}
                id="normalized"
              />
              <label className="form-check-label" htmlFor="Normalized Usage">
                Normalized Usage
              </label>
            </div>
            <div className="form-check form-inline">
              <input
                name="form-check-input"
                type="checkbox"
                value={this.emissions}
                onChange={this.handleChange}
                id="emissions"
              />
              <label className="form-check-label" htmlFor="ghg emissions">
                ghg emissions
              </label>
            </div>
          </form>
        </div>
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
            <h3>Projected annual consumption</h3>
            <h5>Electricity: {this.state.electricity} kWh</h5>
            <h5>Fuel: {this.state.fuel} Kbtu</h5>
            <h5>Water: {this.state.water} Gallons</h5>
            <h5>GHG Emissions: {this.state.emissions} Tons</h5>
            <h5>Total cost: ${this.state.cost}</h5>
          </div>
        </div>
        <div
          style={{width: '60rem', border: '1px solid grey', height: '30rem'}}
        >
          <Graph data={this.state.chartData} id={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log(state)
  return {
    buildingData: state.buildingInfoReducer.buildingData,
    buildingModel: state.buildingInfoReducer.buildingModel,
    graphData: state.graphInfo
  }
}
const mapDispatch = dispatch => {
  return {
    updateInfo: buildingId => dispatch(updatedInfo(buildingId)),
    updateModel: buildingId => dispatch(updatedModel(buildingId)),
    graphInfo: buildingId => dispatch(getGraphInfo(buildingId))
  }
}
export default connect(mapState, mapDispatch)(SingleBuildingDisplay)
