import React from 'react'
import {Line} from 'react-chartjs-2'

export default class Graphs extends React.Component {
  render() {
    const id = this.props.id
    return (
      <Line
        data={this.props.data}
        options={{
          title: {
            display: true,
            text: `Building Id:${id}`,
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
