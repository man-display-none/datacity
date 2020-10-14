const router = require('express').Router()
const {Building, Footprint} = require('../db/models')
const axios = require('axios')
const bluebird = require('bluebird')

//handling Building model
router.post('/energy', async (req, res, next) => {
  try {
    //get all buildings with desired information from energy data
    const energyResponse = await axios.get(
      'https://data.cityofnewyork.us/resource/28fi-3us3.json?$limit=30000&$select=energy_star_score,bbl_10_digits,borough,dof_gross_floor_area_ft,address_1_self_reported,largest_property_use_type'
    )

    //add data to building table
    energyResponse.data.map(async building => {
      await Building.create(building)
    })

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
  }
})

//handling Footprint model
router.post('/footprints', async (req, res, next) => {
  try {
    //get all buildings in Building model
    const bblEnergy = await Building.findAll()
    //creating an array of bbl
    const bblArray = bblEnergy.map(el => {
      let bbl = el.dataValues.bbl_10_digits
      //bbl parsing // only using first 10 digits
      if (bbl.length > 10) {
        bbl = bbl.slice(0, 10)
      }
      return bbl
    })

    //use bluebird and have axios calls
    await makeReq(bblArray)

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
  }
})

//makeReq function utilizes bluebird and makes axios calls with concurrency of 25 promises at a time
async function makeReq(bblArray) {
  await bluebird.map(
    bblArray,
    async footprintBBl => {
      if (!isNaN(Number(footprintBBl))) {
        const {data} = await axios.get(
          `https://data.cityofnewyork.us/resource/2wbz-fb2h.json?$select=the_geom,base_bbl,cnstrct_yr&base_bbl=${footprintBBl}`
        )
        if (data !== undefined) {
          data.map(footprint => {
            Footprint.create(footprint)
          })
        }
      }
    },
    {concurrency: 25}
  )
}

module.exports = router
