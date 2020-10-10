const router = require('express').Router()
const {Building} = require('../db/models')
const axios = require('axios')

router.post('/manhattan', async (req, res, next) => {
  try {
    const energyResponse = await axios.get(
      'https://data.cityofnewyork.us/resource/28fi-3us3.json?bbl_10_digits=1009970023'
    )

    const footprintResponse = await axios.get(
      `https://data.cityofnewyork.us/resource/s75a-ei9u.json`
    )

    // energyResponse.forEach(building => {
    //   axios.get(`https://data.cityofnewyork.us/resource/s75a-ei9u.json?base_bbl=${building.bbl_10_digits}`)
    // })

    energyResponse.data.map(building => {
      Building.create(building)
    })

    footprintResponse.data.map(footprint => {
      Building.update(
        {
          geometry: footprint.the_geom
        },
        {
          where: {
            bbl_10_digits: footprint.base_bbl
          }
        }
      )
    })

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
  }
})

router.post('/footprints', async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://data.cityofnewyork.us/resource/s75a-ei9u?$limit=30000'
    )
    // console.log(typeof(response))
    response.data.map(building => {
      Building.create(building)
    })
    res.send(response.data)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
