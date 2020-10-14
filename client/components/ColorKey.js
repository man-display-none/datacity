import React from 'react'

const ColorKey = () => {
  const red2yellow2green = percentage => {
    let r,
      g,
      b = 0
    if (percentage < 0) {
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
    for (let i = 0; i < 100; i++) {
      red2yellow2green(i)
    }
  }

  return (
    <div className="key">
      <div className="scale"></div>
    </div>
  )
}

export default ColorKey
