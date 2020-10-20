import React, {useRef, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import BuildingInfo from './BuildingInfo'
import {connect} from 'react-redux'

//hide access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiamVmZi0wMjI4IiwiYSI6ImNrZzZ4ZW5kbzAxc2cydG16a2syZWh5eW4ifQ.AFSJlXJOrlrnjsLHBCfpbw'
const LandingPage = props => {
  const mapContainerRef = useRef(null)
  const markerRef = useRef(new mapboxgl.Marker({scale: 0.8}))
  const bounds = [
    [-74.2911533975789, 40.494789727940045], //SW
    [-73.6231598800014, 41.055125778277535] //NE
  ]
  // -73.74825446387773 40.99700217739027 -73.6231598800014,41.055125778277535
  //zoom higher the number the more zoomed in you are
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/jeff-0228/ckg744a7n171519noe3lc32jf',
      center: [-73.967516, 40.751108],
      zoom: 12,
      minZoom: 12,
      maxZoom: 14,
      maxBounds: bounds
    })
    //[-73.967516, 40.751108]
    map.on('load', function() {
      if (props.filter.id) {
        if (props.filter.value[2] === '') {
          map.setFilter('footprint', [
            'all',
            ['<', ['get', props.filter.id[0]], Number(props.filter.value[0])],
            ['<', ['get', props.filter.id[1]], Number(props.filter.value[1])],
            ['<', ['get', props.filter.id[3]], Number(props.filter.value[3])]
          ])
        } else if (props.filter.value[2] === 'Other') {
          map.setFilter('footprint', [
            'all',
            ['<', ['get', props.filter.id[0]], Number(props.filter.value[0])],
            ['<', ['get', props.filter.id[1]], Number(props.filter.value[1])],
            ['!=', ['get', props.filter.id[2]], 'Multifamily Housing'],
            ['!=', ['get', props.filter.id[2]], 'Office'],
            ['!=', ['get', props.filter.id[2]], 'K-12 School'],
            ['!=', ['get', props.filter.id[2]], 'Hotel'],
            ['<', ['get', props.filter.id[3]], Number(props.filter.value[3])]
          ])
        } else {
          map.setFilter('footprint', [
            'all',
            ['<', ['get', props.filter.id[0]], Number(props.filter.value[0])],
            ['<', ['get', props.filter.id[1]], Number(props.filter.value[1])],
            ['==', ['get', props.filter.id[2]], props.filter.value[2]],
            ['<', ['get', props.filter.id[3]], Number(props.filter.value[3])]
          ])
        }
      }
      map.on('click', 'footprint', async function(e) {
        const {
          base_bbl,
          energy_star_score,
          cnstrct_yr,
          address_1_self_reported,
          largest_property_use_type,
          dof_gross_floor_area_ft
        } = e.features[0].properties
        const lngLat = e.lngLat
        const building = await fetchData(base_bbl)
        const newBuilding = {
          ...building,
          ...{
            base_bbl,
            energy_star_score,
            cnstrct_yr,
            address_1_self_reported,
            largest_property_use_type,
            dof_gross_floor_area_ft
          }
        }
        //use e.features[0].properties.base_bbl for axios calls
        const popupNode = document.createElement('div')
        ReactDOM.render(<BuildingInfo info={newBuilding} />, popupNode)

        markerRef.current.setLngLat([lngLat.lng, lngLat.lat]).addTo(map)
      })
    })
  })
  return (
    <div>
      <div ref={mapContainerRef} className="mapContainer" />
      <div className="color-key">
        <div className="key">
          <div className="key-text"> Energy Star Score</div>
          <ul className="score">
            <li className="min"> 0 </li>
            <li className="max"> 100 </li>
            <li className="legend">
              <div className="graph">
                <div className="continuous"></div>
                <div className="prompt">
                  Click on a building for more information
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

async function fetchData(base_bbl) {
  const {data: bldg} = await axios.get(
    `https://data.cityofnewyork.us/resource/28fi-3us3.json?bbl_10_digits=${base_bbl}`
  )
  //some multiple bbl results need to be accounted for
  //use last index from search results
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
    water_use_all_water_sources
  } = bldg[bldg.length - 1]

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

  const totalElectricity =
    totalUse([
      electricity_use_grid_purchase,
      electricity_use_grid_purchase_1
    ]) || 'Not Available'

  const totalFuel =
    totalUse([
      fuel_oil_1_use_kbtu,
      fuel_oil_2_use_kbtu,
      fuel_oil_4_use_kbtu,
      fuel_oil_5_6_use_kbtu,
      natural_gas_use_kbtu,
      kerosene_use_kbtu,
      diesel_2_use_kbtu
    ]) || 'Not Available'

  const totalWater = Number(water_use_all_water_sources) || 'Not Available'

  const ghg = Number(total_ghg_emissions_metric) || 'Not Available'

  const building = {
    totalElectricity,
    totalFuel,
    totalWater,
    ghg
  }

  return building
}

const mapState = state => {
  return {
    filter: state.filter
  }
}
export default connect(mapState, null)(LandingPage)
