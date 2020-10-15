import React from 'react'
import {Colorscale} from 'react-colorscales'

const ColorKey = () => {
  const red2yellow2green = percentage => {
    let r,
      g,
      b = 0
    if (percentage < 50) {
      r = 255
      g = Math.round(5.1 * percentage)
    } else {
      g = 255
      r = Math.round(510 - 5.1 * percentage)
    }
    let h = r * 0x10000 + g * 0x100 + b * 0x1
    return '#' + ('000000' + h.toString(16)).slice(-6)
  }

  const scaleMaker = () => {
    let arr = []
    for (let i = 0; i < 100; i++) {
      arr.push(red2yellow2green(i))
    }
    return arr
  }

  let scale = scaleMaker()
  return (
    <div className="key">
      <div className="key-text">
        <h5>Overview:</h5>
        <p>
          Buildings are colored from red to yellow to green
          <Colorscale colorscale={scale} width={150} /> Red indicates high
          energy use intensity, i.e. a poor EnergyStar score.
        </p>
        <p>
          Please click on a building to see more information and test the impact
          of various system improvements.
        </p>
      </div>
    </div>
  )
}

export default ColorKey
