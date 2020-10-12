import React from 'react'
import {Line} from 'react-chartjs-2'

const state = {
  labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
  datasets: [
    {
      label: 'Energy',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56, 60]
    }
  ]
}

export default class Graphs extends React.Component {
  render() {
    return (
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: 'Energy Values of Building Id: 12345',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    )
  }
}
