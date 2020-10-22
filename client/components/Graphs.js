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
            display: true,
            position: 'right'
          },
          scales: {
            yAxes: [
              {
                id: 'energy',
                type: 'linear',
                display: energy,
                ticks: {
                  fontColor: 'green'
                }
              },
              {
                id: 'fuel',
                type: 'linear',
                display: fuel,
                ticks: {
                  fontColor: 'red'
                }
              },
              {
                id: 'electricity',
                type: 'linear',
                display: electricity,
                ticks: {
                  fontColor: 'blue'
                }
              },
              {
                id: 'emissions',
                type: 'linear',
                display: emissions,
                ticks: {
                  fontColor: 'grey'
                }
              },
              {
                id: 'normalized',
                type: 'linear',
                display: normalized,
                ticks: {
                  fontColor: 'purple'
                }
              }
            ]
          }
        }}
      />
    )
  }
}
