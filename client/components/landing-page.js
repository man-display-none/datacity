import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl'

//hide access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiamVmZi0wMjI4IiwiYSI6ImNrZzZ4ZW5kbzAxc2cydG16a2syZWh5eW4ifQ.AFSJlXJOrlrnjsLHBCfpbw'

export default class LandingPage extends Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/jeff-0228/ckg34hbar1c8i19s5gth69huy',
      center: [-74.0066, 40.7135],
      zoom: 13
    })

    map.on('load', function() {
      map.on('click', 'footprint', function(e) {
        //use e.features[0].properties.base_bbl for axios calls
        console.log('e.features --->', e.features[0].properties)
      })
    })
  }

  render() {
    return (
      <div>
        <div ref={el => (this.mapContainer = el)} className="mapContainer" />
      </div>
    )
  }
}
