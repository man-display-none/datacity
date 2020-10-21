import React from 'react'

const ChevronToggle = React.forwardRef(({children, onClick}, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      console.log(e.altKey)
      console.log(e)
      console.log(onClick.e)
      e.preventDefault()
      onClick(e)
    }}
  >
    &#x25bc;
    {children}
  </a>
))

export default ChevronToggle
