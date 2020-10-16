import React, {Component} from 'react'
import {connect} from 'react-redux'
import Graph from './Graphs'
import {updatedInfo} from '../store/buildingInfo'
import {getGraphInfo} from '../store/graphData'

class SingleBuildingDisplay extends Component {
  constructor() {
    super()

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
      data: [20, 30, 40, 50, 10]
    }
    this.electricity = {
      label: 'Electricity Usage',
      backgroundColor: 'rgba(0,0,100,.2)',
      borderColor: 'rgba(0,0,100,1)',
      borderWidth: 2,
      data: [10, 5, 80, 3, 17]
    }
    this.emissions = {
      label: 'emissions GHG',
      backgroundColor: 'rgba(100,100,100,.2)',
      borderColor: 'rgba(100,100,100,1)',
      borderWidth: 2,
      data: [4, 5, 8, 3, 1]
    }
    this.normalized = {
      label: 'Normalized Data',
      backgroundColor: 'rgba(30,30,30,.2)',
      borderColor: 'rgba(30,30,30,1)',
      borderWidth: 2,
      data: [80, 5, 80, 3, 1]
    }
    this.inputConditions = {
      energy: false,
      fuel: false,
      normalized: false,
      electricity: false,
      emissions: false
    }
    this.state = {
      chartData: {
        labels: ['2016', '2017', '2018', '2019'],
        datasets: []
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const buildingId = this.props.match.params.id
    this.props.updateInfo(buildingId)
    this.props.graphInfo(buildingId)
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
    this.setState({chartData: {...currentState, datasets: placeholder}})
  }

  render() {
    console.log('this.props', this.props)
    console.log('this.state', this.state)

    return (
      <div className="card-group">
        <div className="card" style={{height: '30rem'}}>
          <form>
            <div className="form-check form-inline">
              <input
                name="form-check-input"
                type="checkbox"
                value={this.energy}
                onChange={this.handleChange}
                id="energy"
              />
              <label className="form-check-label" htmlFor="Energy Rating">
                <h2>Energy Rating</h2>
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
                <h2>Electricity Usage</h2>
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
                <h2>Fuel Usage</h2>
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
                <h2>Normalized Usage</h2>
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
                <h2>ghg emissions</h2>
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
  return {
    data: state.currentBuildingInfo,
    graphData: state.graphInfo
  }
}
const mapDispatch = dispatch => {
  return {
    updateInfo: buildingId => dispatch(updatedInfo(buildingId)),
    graphInfo: buildingId => dispatch(getGraphInfo(buildingId))
  }
}
export default connect(mapState, mapDispatch)(SingleBuildingDisplay)
