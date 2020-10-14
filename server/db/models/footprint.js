/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

const Footprint = db.define('footprints', {
  the_geom: Sequelize.GEOMETRY('multipolygon', 4326),
  cnstrct_yr: Sequelize.STRING,
  base_bbl: Sequelize.STRING,
  energy_star_score: {type: Sequelize.STRING, defaultValue: '0'},
  borough: Sequelize.STRING,
  dof_gross_floor_area_ft: Sequelize.STRING,
  largest_property_use_type: Sequelize.STRING,
  address_1_self_reported: Sequelize.STRING
})

module.exports = Footprint
