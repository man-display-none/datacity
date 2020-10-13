import React, {useRef, useEffect} from 'react'
import ReactDOM from 'react-dom'
import BuildingInfo from './BuildingInfo'
import mapboxgl from 'mapbox-gl'

//hide access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiamVmZi0wMjI4IiwiYSI6ImNrZzZ4ZW5kbzAxc2cydG16a2syZWh5eW4ifQ.AFSJlXJOrlrnjsLHBCfpbw'

const LandingPage = () => {
  const mapContainerRef = useRef(null)
  const popUpRef = useRef(new mapboxgl.Popup({offset: 15}))
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/jeff-0228/ckg34hbar1c8i19s5gth69huy',
      center: [-74.0066, 40.7135],
      zoom: 13
    })

    map.on('load', function() {
      map.on('click', 'footprint', function(e) {
        // console.log('e.features --->', e.features[0].properties)
        // console.log('e geo--->', e.features[0].geometry.coordinates[0][0,1])
        const lat = e.features[0].geometry.coordinates[0][0]
        const long = e.features[0].geometry.coordinates[0][1]
        //use e.features[0].properties.base_bbl for axios calls
        const popupNode = document.createElement('div')
        const showInfo = ReactDOM.render(
          <BuildingInfo info={e.features[0].properties} />,
          popupNode
        )

        popUpRef.current
          .setLngLat(lat, long)
          .setDOMContent(showInfo)
          .addTo(map)
      })
    })
  })
  return (
    <div>
      <div ref={mapContainerRef} className="mapContainer" />
    </div>
  )
}

export default LandingPage
