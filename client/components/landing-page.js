import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
const mapboxgl = require('mapbox-gl')

//hide access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiamVmZi0wMjI4IiwiYSI6ImNrZzZ4ZW5kbzAxc2cydG16a2syZWh5eW4ifQ.AFSJlXJOrlrnjsLHBCfpbw'
/**
 * COMPONENT
 */
export default class LandingPage extends Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/jeff-0228/ckg34hbar1c8i19s5gth69huy',
      center: [-74.0066, 40.7135],
      zoom: 13
    })
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    return (
      <div>
        <div ref={el => (this.mapContainer = el)} className="mapContainer" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     email: state.user.email,
//   }
// }

// export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string,
// }
