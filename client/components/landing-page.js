import React, {useRef, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import BuildingInfo from './BuildingInfo'
import ColorKey from './ColorKey'
import Building from '../calculator'

//hide access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiamVmZi0wMjI4IiwiYSI6ImNrZzZ4ZW5kbzAxc2cydG16a2syZWh5eW4ifQ.AFSJlXJOrlrnjsLHBCfpbw'
const LandingPage = props => {
  const mapContainerRef = useRef(null)
  const markerRef = useRef(new mapboxgl.Marker({scale: 0.8}))
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // container: 'map',
      style: 'mapbox://styles/jeff-0228/ckg744a7n171519noe3lc32jf',
      center: [-73.967516, 40.751108],
      zoom: 12
    })

    map.on('load', function() {
      map.on('click', 'footprint', async function(e) {
        console.log(e.features[0].properties)
        console.log(e.lngLat)
        const bbl = e.features[0].properties.base_bbl
        // const lat = e.features[0].geometry.coordinates[0][0]
        // const long = e.features[0].geometry.coordinates[0][1]
        const lngLat = e.lngLat
        const {data: bldg} = await axios.get(
          `https://data.cityofnewyork.us/resource/28fi-3us3.json?bbl_10_digits=${bbl}`
        )
        //some multiple bbl results need to be accounted for
        // console.log(bldg)
        const {
          electricity_use_grid_purchase,
          electricity_use_grid_purchase_1,
          fuel_oil_1_use_kbtu,
          fuel_oil_2_use_kbtu,
          fuel_oil_4_use_kbtu,
          fuel_oil_5_6_use_kbtu,
          natural_gas_use_kbtu,
          kerosene_use_kbtu,
          diesel_2_use_kbtu,
          total_ghg_emissions_metric,
          water_use_all_water_sources,
          energy_star_score,
          bbl_10_digits
        } = bldg[0]

        //check if values are 'number strings' or not and then add
        const totalUse = arr => {
          let total = 0
          arr.forEach(use => {
            if (!isNaN(Number(use))) {
              total += Number(use)
            }
          })
          return total
        }

        const totalElectricity = totalUse([
          electricity_use_grid_purchase,
          electricity_use_grid_purchase_1
        ])

        const totalFuel = totalUse([
          fuel_oil_1_use_kbtu,
          fuel_oil_2_use_kbtu,
          fuel_oil_4_use_kbtu,
          fuel_oil_5_6_use_kbtu,
          natural_gas_use_kbtu,
          kerosene_use_kbtu,
          diesel_2_use_kbtu
        ])

        const totalWater = Number(water_use_all_water_sources)

        const ghg = Number(total_ghg_emissions_metric)

        const building = new Building(
          totalElectricity,
          totalFuel,
          totalWater,
          ghg,
          energy_star_score,
          bbl_10_digits
        )

        //use e.features[0].properties.base_bbl for axios calls
        const popupNode = document.createElement('div')
        const showInfo = ReactDOM.render(
          <BuildingInfo info={building} />,

          popupNode
        )

        markerRef.current.setLngLat([lngLat.lng, lngLat.lat]).addTo(map)
      })
    })
    console.log('this.props', props)
  })
  return (
    <div>
      <div ref={mapContainerRef} className="mapContainer" />
      <div className="color-key">
        <ColorKey />
      </div>
    </div>
  )
}
export default LandingPage
