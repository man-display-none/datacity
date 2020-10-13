import React, {Component} from 'react'
import Graph from './Graphs'

export default class SingleBuildingDisplay extends Component {
  constructor() {
    super()
    this.state = {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      datasets: [
        {
          label: 'Energy',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [56, 23, 23, 23, 23]
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.preventDefault()
    console.log(this.state, 'this.state')
    this.setState = {
      ...this.state,
      datasets: [{...this.state.datasets, data: [43, 42, 56, 78, 54]}]
    }
    console.log(this.state)
  }

  render() {
    return (
      <div className="card-group">
        <div className="card" style={{height: '30rem'}}>
          <div className="form-check form-inline">
            <input
              name="form-check-input"
              type="checkbox"
              value={this.state.data}
              id="defaultCheck1"
              onClick={this.handleClick}
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
              id="defaultCheck2"
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
        </div>
        <div
          style={{width: '60rem', border: '1px solid grey', height: '30rem'}}
        >
          <Graph data={this.state} />
        </div>
      </div>
    )
  }
}
