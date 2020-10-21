import React, {Component} from 'react'
import {connect} from 'react-redux'
import Graph from './Graphs'
import BuildingModel from './BuildingModel'
import ImprovementSimulator from './ImprovementSimulator'
import {updatedInfo, updatedModel} from '../store/buildingInfo'
import './singleBuildingDisplay.css'
import ImprovementImpacts from './ImprovementImpacts'

class SingleBuildingDisplay extends Component {
  constructor() {
    super()
    this.state = {
      chartData: {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: []
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const buildingId = this.props.match.params.id
    this.props.updateInfo(buildingId)
    this.props.updateModel(buildingId)
  }
  handleChange(e) {
    const currentState = this.state.chartData
    const formId = e.target.id
    let placeholder = []
    this.inputConditions[formId] = !this.inputConditions[formId]
    let inputConditionalsArray = Object.keys(this.inputConditions)
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
    console.log(this.props)
    return (
      <div className="card-group">
        {this.props.buildingModel && (
          <section className="building-info">
            <ImprovementSimulator />
          </section>
        )}
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
                value={this.emmissions}
                onChange={this.handleChange}
                id="emmissions"
              />
              <label className="form-check-label" htmlFor="ghg emissions">
                ghg emissions
              </label>
            </div>
          </form>
          <div
            style={{width: '60rem', border: '1px solid grey', height: '30rem'}}
          >
            <Graph
              data={this.state.chartData}
              id={this.props.match.params.id}
            />
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
export default connect(mapState, mapDispatch)(SingleBuildingDisplay)
