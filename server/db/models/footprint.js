/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

const Footprint = db.define('footprints', {
  bin: Sequelize.STRING,
  the_geom: Sequelize.GEOMETRY('multipolygon', 4326),
  lstmoddate: Sequelize.STRING,
  cnstrct_yr: Sequelize.STRING,
  lststatype: Sequelize.STRING,
  doitt_id: Sequelize.STRING,
  heightroof: Sequelize.STRING,
  feat_code: Sequelize.STRING,
  groundelev: Sequelize.STRING,
  shape_area: Sequelize.STRING,
  shape_len: Sequelize.STRING,
  base_bbl: Sequelize.STRING,
  mpluto_bbl: Sequelize.STRING,
  geomsource: Sequelize.STRING,
  energy_star_score: {type: Sequelize.STRING, defaultValue: '0'}
})

module.exports = Footprint
