const Building = require('./building')
const Footprint = require('./footprint')

/*
Use this query in psql and delete items with duplicated (bbl) in building table
DELETE
FROM
    buildings a
        USING buildings b
WHERE
    a.id < b.id
    AND a.bbl_10_digits = b.bbl_10_digits
*/

//this function will update Footprint model with attribues from Building model
async function merge() {
  const bblEnergy = await Building.findAll()
  const bblArray = bblEnergy.map(el => {
    let bbl = el.dataValues.bbl_10_digits
    let energy_star_score = el.dataValues.energy_star_score
    let borough = el.dataValues.borough
    let dof_gross_floor_area_ft = el.dataValues.dof_gross_floor_area_ft
    let address_1_self_reported = el.dataValues.address_1_self_reported
    let largest_property_use_type = el.dataValues.largest_property_use_type
    if (bbl.length > 10) {
      bbl = bbl.slice(0, 10)
    }

    return {
      bbl,
      energy_star_score,
      borough,
      dof_gross_floor_area_ft,
      address_1_self_reported,
      largest_property_use_type
    }
  })

  // update all information
  await bblArray.forEach(
    async el => await Footprint.update(el, {where: {base_bbl: el.bbl}})
  )
}

// merge()

async function scoreUpdate() {
  //update energy_star_score with Not Available to 0
  await Footprint.update(
    {energy_star_score: '0'},
    {where: {energy_star_score: 'Not Available'}}
  )
}

// scoreUpdate()

/*
Use this query to export geojson data with .csv format
SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(
        json_build_object(
            'type',       'Feature',
            'geometry',   ST_AsGeoJSON(the_geom, 4326)::json,
            'properties', json_build_object(
                -- list of fields
                'base_bbl', base_bbl,
                'energy_star_score', energy_star_score
            )
        )
    )
)
FROM footprints;
*/
