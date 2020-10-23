import React, {Component} from 'react'
import {connect} from 'react-redux'
import Graph from './Graphs'
import ImprovementSimulator from './ImprovementSimulator'
import {updatedInfo, updatedModel} from '../store/buildingInfo'
import {getGraphInfo} from '../store/graphData'
import './singleBuildingDisplay.css'

class SingleBuildingDisplay extends Component {
  constructor() {
    super()

    this.energy = {
      label: 'Energy Star Rating (grade 0-100)',
      backgroundColor: 'rgba(0,100,0,0)', //dark green
      borderColor: 'green',
      borderWidth: 2,
      data: [],
      yAxisID: 'energy'
    }
    this.fuel = {
      label: 'Fuel (Kbtu)',
      backgroundColor: 'rgba(100,0,0,0)',
      borderColor: 'red',
      borderWidth: 2,
      data: [],
      yAxisID: 'fuel'
    }
    this.electricity = {
      label: 'Electricity (kWh)',
      backgroundColor: 'rgba(20,40,109,0)',
      borderColor: 'blue',
      borderWidth: 2,
      data: [],
      yAxisID: 'electricity'
    }
    this.emissions = {
      label: 'GHG Emissions (Tons)',
      backgroundColor: 'rgba(100,100,100,0)',
      borderColor: 'grey',
      borderWidth: 2,
      data: [],
      yAxisID: 'emissions'
    }
    this.normalized = {
      label: 'Weather Normalized (EUI)',
      backgroundColor: 'rgba(20,40,109,0)',
      borderColor: 'purple',
      borderWidth: 2,
      data: [],
      yAxisID: 'normalized'
    }
    this.inputConditions = {
      energy: false,
      fuel: false,
      normalized: false,
      electricity: false,
      emissions: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      chartData: {
        labels: ['2016', '2017', '2018', '2019'],
        datasets: []
      }
    }
  }

  componentDidMount() {
    const buildingId = this.props.match.params.id
    this.props.updateInfo(buildingId)
    this.props.updateModel(buildingId)
    this.props.graphInfo(buildingId)
  }

  handleChange(e) {
    const currentState = this.state.chartData
    const formId = e.target.id
    let placeholder = []
    console.log('on change', this.props)
    this.inputConditions[formId] = !this.inputConditions[formId]
    let inputConditionalsArray = Object.keys(this.inputConditions)
    if (this.props.graphData !== undefined) {
      this.energy.data = this.props.graphData.energyRating
      this.emissions.data = this.props.graphData.ghgEmissions
      this.electricity.data = this.props.graphData.electricityUsage
      this.fuel.data = this.props.graphData.fuelUsage
      this.normalized.data = this.props.graphData.normalizedUsage
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
  render() {
    return (
      <div className="single-page">
        {this.props.buildingModel && (
          <section className="building-info">
            <ImprovementSimulator />
          </section>
        )}
        <div className="graph container">
          <div className="graph-options">
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
                  EnergyStar Score
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
                  Normalized Energy Use
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
                  GHG Emissions
                </label>
              </div>
            </form>
          </div>
          <div style={{width: '55.4rem', height: '30rem'}}>
            <Graph
              data={this.state.chartData}
              id={this.props.match.params.id}
              inputConditions={this.inputConditions}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
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
