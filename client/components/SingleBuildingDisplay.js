import React, {Component} from 'react'
import {connect} from 'react-redux'
import Graph from './Graphs'
import BuildingModel from './BuildingModel'
import ImprovementSimulator from './ImprovementSimulator'
import {updatedInfo, updatedModel} from '../store/buildingInfo'
import {getGraphInfo} from '../store/graphData'

class SingleBuildingDisplay extends Component {
  constructor() {
    super()

    this.energy = {
      label: 'Energy Star Rating',
      backgroundColor: 'rgba(0,100,0,.2)', //dark green
      borderColor: 'rgba(0,100,0,1)',
      borderWidth: 2,
      data: [],
      yAxisID: 'energy'
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
      data: [],
      yAxisID: 'emissions'
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
  renderModel() {
    return (
      <section className="building-info">
        <BuildingModel />
        {/* <ImprovementSimulator /> */}
      </section>
    )
  }
  handleChange(e) {
    const currentState = this.state.chartData
    const formId = e.target.id
    let placeholder = []
    console.log('onChange')
    this.inputConditions[formId] = !this.inputConditions[formId]
    let inputConditionalsArray = Object.keys(this.inputConditions)
    if (this.props.graphData !== undefined) {
      this.energy.data = this.props.graphData.energyRating
      this.emissions.data = this.props.graphData.ghgEmissions
      this.electricity.data = this.props.graphData.electrictyUsage
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
      <div className="card-group">
        <div className="model-info">
          {this.props.buildingModel && this.renderModel()}
        </div>
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
