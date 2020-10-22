import Bluebird from 'bluebird'
import React from 'react'
import {Line} from 'react-chartjs-2'

export default class Graphs extends React.Component {
  render() {
    console.log(this.props)
    const {
      energy,
      fuel,
      normalized,
      electricity,
      emissions
    } = this.props.inputConditions
    const id = this.props.id
    return (
      <Line
        data={this.props.data}
        options={{
          title: {
            display: true,
            text: `Building Id: ${id}`,
            fontSize: 20
          },
          legend: {
            display: true
          },
          scales: {
            yAxes: [
              {
                id: 'energy',
                type: 'linear',
                display: energy,
                labelString: 'EnergyStar Score'
              },
              {
                id: 'fuel',
                type: 'linear',
                display: fuel
              },
              {
                id: 'electricity',
                type: 'linear',
                display: electricity
              },
              {
                id: 'emissions',
                type: 'linear',
                display: emissions
              },
              {
                id: 'normalized',
                type: 'linear',
                display: normalized
              }
            ]
          }
        }}
      />
    )
  }
}
