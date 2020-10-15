import React, {Component} from 'react'
import {connect} from 'react-redux'
import Graph from './Graphs'
import {updatedInfo} from '../store/buildingInfo'

class SingleBuildingDisplay extends Component {
  constructor() {
    super()
    // this.chart1 = {
    //   labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    //   datasets: [
    //     {
    //       label: 'Energy',
    //       backgroundColor: 'rgba(75,192,192,1)',
    //       borderColor: 'rgba(0,0,0,1)',
    //       borderWidth: 2,
    //       data: []
    //     }
    //   ]
    // }
    // this.chart2 = {
    //   labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    //   datasets: [
    //     {
    //       label: 'Energy',
    //       backgroundColor: 'rgba(75,192,192,1)',
    //       borderColor: 'rgba(0,0,0,1)',
    //       borderWidth: 2,
    //       data: [40, 20, 34, 45, 60]
    //     }
    //   ]
    // }
    //this.state = {chartData: this.chart1}
    this.energy = {
      label: 'Energy Star Rating',
      // backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
      data: [70, 80, 90, 100, 110]
    }
    this.fuel = {
      label: 'Fuel',
      // backgroundColor: 'rgba(60,100,100,1)',
      borderColor: 'rgba(60,100,100,1)',
      borderWidth: 2,
      data: [20, 30, 40, 50, 10]
    }
    this.electricity = {
      label: 'Electricity Usage',
      // backgroundColor: 'rgba(20,40,109,1)',
      borderColor: 'rgba(20,40,109,1)',
      borderWidth: 2,
      data: [10, 5, 80, 3, 17]
    }
    this.emmisions = {
      label: 'Electricity Usage',
      // backgroundColor: 'rgba(20,40,109,1)',
      borderColor: 'rgba(20,40,109,1)',
      borderWidth: 2,
      data: [4, 5, 8, 3, 1]
    }
    this.normalized = {
      label: 'Electricity Usage',
      // backgroundColor: 'rgba(20,40,109,1)',
      borderColor: 'rgba(20,40,109,1)',
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
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: []
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const buildingId = this.props.match.params.id
    this.props.updateInfo(buildingId)
  }
  handleChange(e) {
    //blocker: no change in state
    e.preventDefault()
    const currentState = this.state.chartData
    const formId = e.target.id
    this.inputConditions[formId] = !this.inputConditions[formId]

    let inputConditionalsArray = Object.keys(this.inputConditions)
    let placeholder = []
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
                value={this.fuel}
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
                id="emmissions"
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
          <Graph data={this.state.chartData} />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    data: state.buildInfoReducer
  }
}
const mapDispatch = dispatch => {
  return {
    updateInfo: buildingId => dispatch(updatedInfo(buildingId))
  }
}
export default connect(mapState, mapDispatch)(SingleBuildingDisplay)
