const router = require('express').Router()
const {Building, Footprint} = require('../db/models')
const axios = require('axios')

router.post('/energy', async (req, res, next) => {
  try {
    const energyResponse = await axios.get(
      'https://data.cityofnewyork.us/resource/28fi-3us3.json?$limit=30000&$select=energy_star_score,bbl_10_digits'
    )

    // energyResponse.forEach(building => {
    //   axios.get(`https://data.cityofnewyork.us/resource/s75a-ei9u.json?base_bbl=${building.bbl_10_digits}`)
    // })

    energyResponse.data.map(async building => {
      await Building.create(building)
    })

    // footprintResponse.data.map(footprint => {
    //   Building.update(
    //     {
    //       geometry: footprint.the_geom
    //     },
    //     {
    //       where: {
    //         bbl_10_digits: footprint.base_bbl
    //       }
    //     }
    //   )
    // })

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
  }
})

router.post('/footprints', async (req, res, next) => {
  try {
    const bbl_energy = await Building.findAll({
      attributes: ['bbl_10_digits', 'energy_star_score']
    })

    const bblArray = bbl_energy.map(el => {
      let bbl = el.dataValues.bbl_10_digits
      if (bbl.length > 10) {
        bbl = bbl.slice(0, 10)
      }
      // console.log('we are here', bbl)
      return bbl
    })

    // console.log(bblArray)

    await bblArray.map(async single_bbl => {
      single_bbl = Number(single_bbl)
      // console.log('type of singlebbl', typeof single_bbl)
      if (!isNaN(single_bbl)) {
        // console.log('single_bbl --> ', single_bbl)
        single_bbl = String(single_bbl)
        const {data} = await axios.get(
          `https://data.cityofnewyork.us/resource/s75a-ei9u?base_bbl=${single_bbl}`
        )
        // console.log('footprint data --->', data)
        data.map(footprint => {
          Footprint.create(footprint)
        })
      }
    })

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
