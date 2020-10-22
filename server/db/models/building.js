const Sequelize = require('sequelize')
const db = require('../db')

const Building = db.define('buildings', {
  bbl_10_digits: Sequelize.TEXT,
  address_1_self_reported: Sequelize.STRING,
  borough: Sequelize.STRING,
  dof_gross_floor_area_ft: Sequelize.STRING,
  largest_property_use_type: Sequelize.STRING,
  energy_star_score: Sequelize.INTEGER,
  weather_normalized_site_eui: Sequelize.INTEGER,
  grade: Sequelize.ENUM('A', 'B', 'C', 'D', 'F')
})

module.exports = Building
