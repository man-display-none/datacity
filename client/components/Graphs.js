import React from 'react'
import {Line} from 'react-chartjs-2'

export default class Graphs extends React.Component {
  render() {
    return (
      <Line
        data={this.props.data}
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
