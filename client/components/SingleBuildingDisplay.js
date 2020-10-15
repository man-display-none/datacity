import React, {Component} from 'react'
import {connect} from 'react-redux'
import Graph from './Graphs'
import {updatedInfo} from '../store/buildingInfo'

class SingleBuildingDisplay extends Component {
  constructor() {
    super()
    this.chart1 = {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      datasets: [
        {
          label: 'Energy',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: []
        }
      ]
    }
    this.chart2 = {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      datasets: [
        {
          label: 'Energy',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [40, 20, 34, 45, 60]
        }
      ]
    }
    this.state = {chartData: this.chart1}
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const buildingId = this.props.match.params.id
    this.props.updateInfo(buildingId)
  }
  handleChange(e) {
    //blocker: no change in state
    e.preventDefault()
    let chartTwo = this.chart2
    console.log('event values', e)
    //thunk creator pull data
    this.setState({chartData: chartTwo})
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
                value={this.state.data}
                onChange={this.handleChange}
                id="Energy"
              />
              <label className="form-check-label" htmlFor="defaultCheck1">
                <h2>Energy Rating</h2>
              </label>
            </div>
            <div className="form-check form-inline">
              <input
                name="form-check-input"
                type="checkbox"
                value=""
                onChange={this.handleChange}
                id="Electricy"
              />
              <label className="form-check-label" htmlFor="defaultCheck2">
                <h2>Electricity Usage</h2>
              </label>
            </div>
            <div className="form-check form-inline">
              <input
                name="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck2"
              />
              <label className="form-check-label" htmlFor="defaultCheck2">
                <h2>Fuel Usage</h2>
              </label>
            </div>
            <div className="form-check form-inline">
              <input
                name="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck2"
              />
              <label className="form-check-label" htmlFor="defaultCheck2">
                <h2>Normalized Usage</h2>
              </label>
            </div>
            <div className="form-check form-inline">
              <input
                name="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck2"
              />
              <label className="form-check-label" htmlFor="defaultCheck2">
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
