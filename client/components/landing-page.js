import React, {useRef, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import Spinner from 'react-bootstrap/Spinner'
import './landing-page.css'
import BuildingInfo from './BuildingInfo'
import {connect} from 'react-redux'

//hide access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiamVmZi0wMjI4IiwiYSI6ImNrZzZ4ZW5kbzAxc2cydG16a2syZWh5eW4ifQ.AFSJlXJOrlrnjsLHBCfpbw'
const LandingPage = props => {
  const mapContainerRef = useRef(null)
  const staticContainerRef = useRef(null)
  const spinnerContainerRef = useRef(null)
  const markerRef = useRef(new mapboxgl.Marker({scale: 0.8}))
  const bounds = [
    [-74.2911533975789, 40.494789727940045], //SW
    [-73.6231598800014, 41.055125778277535] //NE
  ]

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/jeff-0228/ckg744a7n171519noe3lc32jf',
      center: [-73.967516, 40.751108],
      zoom: 12,
      minZoom: 12,
      maxZoom: 16,
      maxBounds: bounds
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: 'Enter the address',
      marker: false,
      mapboxgl: mapboxgl,
      zoom: 16,
      countries: 'us',
      filter: function(item) {
        return item.context
          .map(function(i) {
            return i.id.split('.').shift() === 'region' && i.text === 'New York'
          })
          .reduce(function(acc, cur) {
            return acc || cur
          })
      }
    })
    if (!document.getElementById('geocoder').hasChildNodes()) {
      document.getElementById('geocoder').appendChild(geocoder.onAdd(map))
    }

    mapContainerRef.current.className = 'mapContainer'
    mapContainerRef.current.style.visibility = 'visible'

    //[-73.967516, 40.751108]
    map.on('load', function() {
      staticContainerRef.current.className = 'dontShow'
      spinnerContainerRef.current.className = 'dontShow'
      console.log('A load event occurred.')
      console.log('prop', props.filter)
      if (props.filter.id) {
        if (props.filter.value[2] === '') {
          spinnerContainerRef.current.className = 'spinner-border'
          map.setFilter('footprint', [
            'all',
            ['<', ['get', props.filter.id[0]], Number(props.filter.value[0])],
            ['<', ['get', props.filter.id[1]], Number(props.filter.value[1])],
            ['<', ['get', props.filter.id[3]], Number(props.filter.value[3])]
          ])
          map.on('sourcedata', function(e) {
            if (e.isSourceLoaded) {
              spinnerContainerRef.current.className = 'dontShow'
            }
          })
          console.log(map.loaded())
        } else if (props.filter.value[2] === 'Other') {
          spinnerContainerRef.current.className = 'spinner-border'
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
          map.on('sourcedata', function(e) {
            if (e.isSourceLoaded) {
              spinnerContainerRef.current.className = 'dontShow'
            }
          })
        } else {
          spinnerContainerRef.current.className = 'spinner-border'
          map.setFilter('footprint', [
            'all',
            ['<', ['get', props.filter.id[0]], Number(props.filter.value[0])],
            ['<', ['get', props.filter.id[1]], Number(props.filter.value[1])],
            ['==', ['get', props.filter.id[2]], props.filter.value[2]],
            ['<', ['get', props.filter.id[3]], Number(props.filter.value[3])]
          ])
          map.on('sourcedata', function(e) {
            if (e.isSourceLoaded) {
              spinnerContainerRef.current.className = 'dontShow'
            }
          })
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
      <Spinner ref={spinnerContainerRef} animation="border" />
      <div ref={mapContainerRef} className="mapContainer" />
      <div ref={staticContainerRef} className="staticImg" />
      <div className="color-key">
        <div className="key">
          <div className="key-text"> Energy Star Score</div>
          <ul className="score">
            <li className="min"> 0 </li>
            <li className="max"> 100 </li>
            <li className="legend">
              <div className="graph-mapbox">
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

//function to return building data with un-hyphenated or hyphenated BBL
async function testBBLs(bbl) {
  let {data} = await axios.get(
    `https://data.cityofnewyork.us/resource/wcm8-aq5w.json?nyc_borough_block_and_lot=${bbl}`
  )
  if (data.length) {
    return data
  } else {
    //regex to insert BBl hyphens per BBL syntax (X-XXXXX-XXXX), if un-hyphenated BBL does not return building data
    const bblWithHyphens = bbl.replace(/(\d{1})(\d{5})(\d{4})/, '$1-$2-$3')
    let {data: betterData} = await axios.get(
      `https://data.cityofnewyork.us/resource/wcm8-aq5w.json?nyc_borough_block_and_lot=${bblWithHyphens}`
    )
    return betterData
  }
}

async function fetchData(base_bbl) {
  let bldg = await testBBLs(base_bbl)

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
  console.log('BUILDING CLEAN DATA', building)
  return building
}

const mapState = state => {
  return {
    filter: state.filter
  }
}
export default connect(mapState, null)(LandingPage)
