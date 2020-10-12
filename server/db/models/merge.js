const Building = require('./building')
const Footprint = require('./footprint')

async function merge() {
  const bblEnergy = await Building.findAll()
  const bblArray = bblEnergy.map(el => {
    let bbl = el.dataValues.bbl_10_digits
    let score = el.dataValues.energy_star_score
    if (bbl.length > 10) {
      bbl = bbl.slice(0, 10)
    }

    return {bbl, score}
  })

  // console.log(bblArray)

  bblArray.forEach(
    async () =>
      await Footprint.update(
        {energy_star_score: '0'},
        {where: {energy_star_score: 'Not Available'}}
      )
  )
  console.log('done!')
}

async function srid() {
  const footprint = await Footprint.findAll({attribute: 'the_geom'})
  const geomArray = footprint.map(el => el.dataValues.the_geom.coordinates)
  console.log(geomArray)
}

srid()
